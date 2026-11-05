import { useCallback, useEffect, useState } from 'react';
import { AlertTriangle, Cloud, CloudRain, MapPin, RefreshCw, Sun, Wind } from 'lucide-react';

interface Coordinates {
  latitude: number;
  longitude: number;
  name: string;
}

interface WeatherForecast {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_probability_max: number[];
  };
}

interface SatelliteObservation {
  date: string;
  temperature: number | null;
  humidity: number | null;
  windSpeed: number | null;
  precipitation: number | null;
  solarRadiation: number | null;
}

interface NasaPowerResponse {
  properties?: {
    parameter?: Record<string, Record<string, number>>;
  };
}

const isUsableLocation = (value?: string) =>
  Boolean(value?.trim() && !['city', 'state', 'farm address', 'unknown'].includes(value.trim().toLowerCase()));

const getJson = async <T,>(url: string): Promise<T> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`Weather service returned ${response.status}`);
    }
    return await response.json() as T;
  } finally {
    clearTimeout(timeout);
  }
};

const describeWeather = (code: number) => {
  if (code === 0) return 'Clear sky';
  if ([1, 2, 3].includes(code)) return 'Partly cloudy';
  if ([45, 48].includes(code)) return 'Fog';
  if ([51, 53, 55, 56, 57].includes(code)) return 'Drizzle';
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return 'Rain';
  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'Snow';
  if ([95, 96, 99].includes(code)) return 'Thunderstorm';
  return 'Weather conditions';
};

const formatDay = (date: string, index: number) => {
  if (index === 0) return 'Today';
  if (index === 1) return 'Tomorrow';
  return new Intl.DateTimeFormat('en-IN', { weekday: 'long' }).format(new Date(`${date}T12:00:00`));
};

const latestSatelliteObservation = (response: NasaPowerResponse): SatelliteObservation | null => {
  const parameters = response.properties?.parameter;
  const temperatures = parameters?.T2M;
  if (!temperatures) return null;

  const date = Object.keys(temperatures)
    .reverse()
    .find((day) => Number.isFinite(temperatures[day]) && temperatures[day] !== -999);
  if (!date) return null;

  const valueFor = (parameter: string) => {
    const value = parameters[parameter]?.[date];
    return typeof value === 'number' && Number.isFinite(value) && value !== -999 ? value : null;
  };

  return {
    date,
    temperature: valueFor('T2M'),
    humidity: valueFor('RH2M'),
    windSpeed: valueFor('WS2M'),
    precipitation: valueFor('PRECTOTCORR'),
    solarRadiation: valueFor('ALLSKY_SFC_SW_DWN')
  };
};

const FarmerWeather: React.FC<{ city?: string; state?: string }> = ({ city, state }) => {
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const [satellite, setSatellite] = useState<SatelliteObservation | null>(null);
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(true);
  const [satelliteLoading, setSatelliteLoading] = useState(true);
  const [weatherError, setWeatherError] = useState('');
  const [satelliteError, setSatelliteError] = useState('');

  const loadWeather = useCallback(async (coordinates?: Coordinates) => {
    setLoading(true);
    setSatelliteLoading(true);
    setWeatherError('');
    setSatelliteError('');
    setForecast(null);
    setSatellite(null);

    try {
      let location = coordinates;
      if (!location) {
        const parts = [city, state, 'India'].filter(isUsableLocation);
        if (parts.length === 1) {
          throw new Error('Add your farm city and state to your profile, or use your current location.');
        }

        const search = new URLSearchParams({
          name: parts.join(', '),
          count: '1',
          language: 'en',
          format: 'json'
        });
        const geocoding = await getJson<{ results?: Array<{ name: string; admin1?: string; country?: string; latitude: number; longitude: number }> }>(
          `https://geocoding-api.open-meteo.com/v1/search?${search}`
        );
        const result = geocoding.results?.[0];
        if (!result) {
          throw new Error('Could not find your farm location. Check your profile or use your current location.');
        }
        location = {
          latitude: result.latitude,
          longitude: result.longitude,
          name: [result.name, result.admin1, result.country].filter(Boolean).join(', ')
        };
      }

      setLocationName(location.name);
      const forecastParams = new URLSearchParams({
        latitude: String(location.latitude),
        longitude: String(location.longitude),
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
        timezone: 'auto',
        forecast_days: '7'
      });

      const end = new Date();
      const start = new Date(end);
      start.setUTCDate(start.getUTCDate() - 14);
      const toDateKey = (date: Date) => date.toISOString().slice(0, 10).replace(/-/g, '');
      const satelliteParams = new URLSearchParams({
        parameters: 'T2M,RH2M,WS2M,PRECTOTCORR,ALLSKY_SFC_SW_DWN',
        community: 'AG',
        longitude: String(location.longitude),
        latitude: String(location.latitude),
        start: toDateKey(start),
        end: toDateKey(end),
        format: 'JSON'
      });

      const [forecastResult, satelliteResult] = await Promise.allSettled([
        getJson<WeatherForecast>(`https://api.open-meteo.com/v1/forecast?${forecastParams}`),
        getJson<NasaPowerResponse>(`https://power.larc.nasa.gov/api/temporal/daily/point?${satelliteParams}`)
      ]);

      if (forecastResult.status === 'fulfilled') {
        setForecast(forecastResult.value);
      } else {
        throw forecastResult.reason;
      }

      if (satelliteResult.status === 'fulfilled') {
        const observation = latestSatelliteObservation(satelliteResult.value);
        if (observation) {
          setSatellite(observation);
        } else {
          setSatelliteError('Satellite observations are not available for this location yet.');
        }
      } else {
        console.error('Could not load NASA POWER satellite weather data:', satelliteResult.reason);
        setSatelliteError('Satellite observations could not be loaded. The weather forecast is still available.');
      }
    } catch (error) {
      console.error('Could not load farmer weather:', error);
      setWeatherError(error instanceof Error ? error.message : 'Weather data could not be loaded. Please try again.');
    } finally {
      setLoading(false);
      setSatelliteLoading(false);
    }
  }, [city, state]);

  useEffect(() => {
    void loadWeather();
  }, [loadWeather]);

  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      setWeatherError('Location access is not available in this browser.');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        void loadWeather({
          latitude: coords.latitude,
          longitude: coords.longitude,
          name: 'Your current location'
        });
      },
      (error) => {
        setLoading(false);
        setWeatherError(error.code === error.PERMISSION_DENIED
          ? 'Location permission was denied. Allow location access or add your farm city and state to your profile.'
          : 'Could not get your location. Please try again or add your farm location to your profile.');
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
    );
  };

  const todayRainChance = forecast?.daily.precipitation_probability_max[0] ?? 0;
  const windSpeed = forecast?.current.wind_speed_10m ?? 0;
  const temperature = forecast?.current.temperature_2m ?? 0;
  const recommendations = [
    todayRainChance >= 50
      ? 'Rain is likely today; delay irrigation and check field drainage.'
      : 'Check soil moisture before irrigating; no heavy rain is forecast today.',
    temperature >= 38
      ? 'High temperatures are expected; irrigate during cooler morning or evening hours.'
      : 'Avoid field work during the hottest hours and keep newly planted crops hydrated.',
    windSpeed >= 30
      ? 'Strong winds are possible; secure supports and protect young plants.'
      : 'Wind conditions are suitable for routine field work.'
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Weather &amp; Climate</h2>
          <p className="mt-1 flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            {locationName || [city, state].filter(isUsableLocation).join(', ') || 'Farm location not set'}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => void loadWeather()}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={useCurrentLocation}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60"
          >
            Use my location
          </button>
        </div>
      </div>

      {weatherError && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          {weatherError}
        </div>
      )}

      {loading && !forecast && (
        <div role="status" className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-600">
          Loading weather for your farm...
        </div>
      )}

      {forecast && (
        <>
          <div className="rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 p-6 text-white">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                  {forecast.current.weather_code >= 51
                    ? <CloudRain className="h-8 w-8" />
                    : forecast.current.weather_code === 0
                      ? <Sun className="h-8 w-8" />
                      : <Cloud className="h-8 w-8" />}
                </div>
                <div>
                  <h3 className="text-3xl font-bold">{Math.round(forecast.current.temperature_2m)}°C</h3>
                  <p>{describeWeather(forecast.current.weather_code)}</p>
                  <p className="text-sm opacity-80">Feels like {Math.round(forecast.current.apparent_temperature)}°C</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
                <div><p className="text-xs opacity-75">Humidity</p><p className="text-lg font-semibold">{forecast.current.relative_humidity_2m}%</p></div>
                <div><p className="text-xs opacity-75">Wind</p><p className="text-lg font-semibold">{Math.round(windSpeed)} km/h</p></div>
                <div><p className="text-xs opacity-75">Rain now</p><p className="text-lg font-semibold">{forecast.current.precipitation} mm</p></div>
                <div><p className="text-xs opacity-75">Rain chance today</p><p className="text-lg font-semibold">{todayRainChance}%</p></div>
              </div>
            </div>
            <p className="mt-4 text-xs opacity-75">Live forecast from Open-Meteo</p>
          </div>

          {(todayRainChance >= 70 || windSpeed >= 40 || temperature >= 40) && (
            <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <h3 className="font-semibold">Weather alert</h3>
                <p className="text-sm">
                  {todayRainChance >= 70
                    ? `High chance of rain today (${todayRainChance}%). Check field drainage.`
                    : windSpeed >= 40
                      ? `Strong wind is forecast at ${Math.round(windSpeed)} km/h. Secure crop supports.`
                      : `Very high temperature (${Math.round(temperature)}°C). Protect crops from heat stress.`}
                </p>
              </div>
            </div>
          )}

          <section className="rounded-lg border border-gray-100 bg-white shadow-sm">
            <div className="border-b border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900">7-Day Forecast</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {forecast.daily.time.map((date, index) => (
                <div key={date} className="flex items-center justify-between gap-3 p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    {forecast.daily.weather_code[index] >= 51
                      ? <CloudRain className="h-5 w-5 shrink-0 text-blue-600" />
                      : forecast.daily.weather_code[index] === 0
                        ? <Sun className="h-5 w-5 shrink-0 text-amber-500" />
                        : <Cloud className="h-5 w-5 shrink-0 text-gray-500" />}
                    <div>
                      <p className="font-medium text-gray-900">{formatDay(date, index)}</p>
                      <p className="text-sm text-gray-500">{describeWeather(forecast.daily.weather_code[index])}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-right text-sm">
                    <span className="text-blue-700">{forecast.daily.precipitation_probability_max[index]}% rain</span>
                    <span className="font-medium text-gray-900">
                      {Math.round(forecast.daily.temperature_2m_min[index])}° / {Math.round(forecast.daily.temperature_2m_max[index])}°
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-lg border border-green-100 bg-white p-4 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Farming Recommendations</h3>
            <ul className="space-y-2">
              {recommendations.map((recommendation) => (
                <li key={recommendation} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="mt-1 text-green-600">•</span>
                  {recommendation}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-lg border border-indigo-100 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Satellite Weather Observation</h3>
              {satellite && <span className="text-xs text-gray-500">Observation date: {satellite.date.slice(0, 4)}-{satellite.date.slice(4, 6)}-{satellite.date.slice(6, 8)}</span>}
            </div>
            <p className="mb-4 text-xs text-gray-500">NASA POWER satellite-based daily data; observations may be delayed by a few days.</p>
            {satelliteLoading && <p role="status" className="text-sm text-gray-600">Loading satellite observations...</p>}
            {satelliteError && <p role="status" className="text-sm text-amber-700">{satelliteError}</p>}
            {satellite && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                <div><p className="text-xs text-gray-500">Temperature</p><p className="font-semibold">{satellite.temperature === null ? '—' : `${satellite.temperature.toFixed(1)}°C`}</p></div>
                <div><p className="text-xs text-gray-500">Humidity</p><p className="font-semibold">{satellite.humidity === null ? '—' : `${satellite.humidity.toFixed(0)}%`}</p></div>
                <div><p className="text-xs text-gray-500">Wind</p><p className="font-semibold">{satellite.windSpeed === null ? '—' : `${(satellite.windSpeed * 3.6).toFixed(1)} km/h`}</p></div>
                <div><p className="text-xs text-gray-500">Rainfall</p><p className="font-semibold">{satellite.precipitation === null ? '—' : `${satellite.precipitation.toFixed(1)} mm`}</p></div>
                <div><p className="text-xs text-gray-500">Solar radiation</p><p className="font-semibold">{satellite.solarRadiation === null ? '—' : `${satellite.solarRadiation.toFixed(1)} MJ/m²`}</p></div>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default FarmerWeather;
