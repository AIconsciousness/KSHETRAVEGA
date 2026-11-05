// Marketplace Service - Loads real farmer crop data for buyers
import { API_BASE_URL } from './api';

interface CropData {
  id: string;
  name: string;
  type: string;
  variety: string;
  quantity: number;
  unit: string;
  quality: string;
  price: number;
  harvestDate: string;
  organic: boolean;
  location: string;
  description: string;
  status: string;
  uploadedAt: string;
  farmerName: string;
  farmerId: string;
  images: any[];
  analytics: {
    totalImages: number;
    bestImageId: string | null;
    averageImageQuality: string | null;
    cropHealthScore: number | null;
    marketValue: number | null;
    demandScore: number | null;
  };
  database: {
    isSynced: boolean;
    lastSyncDate: string | null;
    version: number;
    checksum: string | null;
  };
}

interface FarmerData {
  id: string;
  name: string;
  phone: string;
  location: string;
  rating: number;
  totalCrops: number;
  joinedDate: string;
  avatar?: string;
}

interface MarketplaceCrop extends CropData {
  farmer: FarmerData;
  distance?: number;
  demandScore: number;
  priceComparison: {
    marketAverage: number;
    isAboveAverage: boolean;
    percentageDifference: number;
  };
}

type CropRecord = Record<string, unknown>;

const asRecord = (value: unknown): CropRecord =>
  typeof value === 'object' && value !== null ? value as CropRecord : {};

const asString = (value: unknown, fallback: string): string =>
  typeof value === 'string' && value.trim() ? value : fallback;

const asNumber = (value: unknown, fallback = 0): number =>
  typeof value === 'number' && Number.isFinite(value) ? value : fallback;

const cropCategoryAliases: Record<string, string> = {
  grain: 'grains',
  grains: 'grains',
  cereal: 'grains',
  cereals: 'grains',
  vegetable: 'vegetables',
  vegetables: 'vegetables',
  fruit: 'fruits',
  fruits: 'fruits',
  pulse: 'pulses',
  pulses: 'pulses',
  legumes: 'pulses',
  spice: 'spices',
  spices: 'spices'
};

const cropNameCategories: Record<string, string> = {
  rice: 'grains',
  wheat: 'grains',
  maize: 'grains',
  barley: 'grains',
  millet: 'grains',
  tomato: 'vegetables',
  onion: 'vegetables',
  potato: 'vegetables',
  carrot: 'vegetables',
  cabbage: 'vegetables',
  cauliflower: 'vegetables',
  apple: 'fruits',
  banana: 'fruits',
  mango: 'fruits',
  orange: 'fruits',
  grapes: 'fruits',
  pomegranate: 'fruits',
  lentil: 'pulses',
  chickpea: 'pulses',
  'black gram': 'pulses',
  'green gram': 'pulses',
  'pigeon pea': 'pulses',
  turmeric: 'spices',
  chili: 'spices',
  coriander: 'spices',
  cumin: 'spices',
  cardamom: 'spices'
};

const getCropCategory = (type: string, name: string): string => {
  const normalizedType = type.trim().toLowerCase();
  const normalizedName = name.trim().toLowerCase();

  return cropCategoryAliases[normalizedType]
    || cropNameCategories[normalizedName]
    || cropNameCategories[normalizedType]
    || 'other';
};

const mapMarketplaceCrop = (record: CropRecord): MarketplaceCrop => {
  const cropDetails = asRecord(record.cropDetails);
  const quantityDetails = asRecord(record.quantity);
  const pricing = asRecord(record.pricing);
  const locationDetails = asRecord(record.location);
  const harvest = asRecord(record.harvest);
  const status = asRecord(record.status);
  const farmerRecord = asRecord(record.farmerId);
  const farmerAssociation = asRecord(record.farmerAssociation);
  const farmerAddress = asRecord(asRecord(farmerRecord.address).current);

  const name = asString(
    record.cropName,
    asString(record.title, asString(cropDetails.name, asString(record.name, 'Unnamed crop')))
  );
  const type = asString(
    record.cropType,
    asString(cropDetails.category, asString(record.type, 'other'))
  );
  const price = asNumber(pricing.pricePerUnit, asNumber(record.price));
  const quantity = asNumber(quantityDetails.available, asNumber(record.quantity));
  const unit = asString(quantityDetails.unit, asString(record.unit, 'kg'));
  const location = typeof record.location === 'string'
    ? record.location
    : [locationDetails.city, locationDetails.state].filter(
      (part): part is string => typeof part === 'string' && part.length > 0
    ).join(', ') || asString(locationDetails.farmAddress, 'Unknown Location');
  const farmerId = asString(
    farmerRecord._id,
    asString(farmerRecord.id, asString(record.farmerId, asString(farmerAssociation.farmerId, 'unknown')))
  );
  const images = Array.isArray(record.images)
    ? record.images.map((image) => {
      const imageRecord = asRecord(image);
      return {
        ...imageRecord,
        imageUrl: asString(imageRecord.imageUrl, asString(imageRecord.url, ''))
      };
    })
    : [];
  const cropData: CropData = {
    id: asString(record._id, asString(record.listingId, asString(record.id, name))),
    name,
    type,
    variety: asString(record.variety, asString(cropDetails.variety, '')),
    quantity,
    unit,
    quality: asString(cropDetails.grade, asString(record.quality, asString(cropDetails.quality, 'Unknown'))),
    price,
    harvestDate: asString(harvest.harvestDate, asString(record.harvestDate, asString(record.uploadedAt, ''))),
    organic: typeof record.organic === 'boolean'
      ? record.organic
      : cropDetails.organic === true,
    location,
    description: asString(record.description, ''),
    status: status.isActive === false ? 'Inactive' : asString(record.status, 'Active'),
    uploadedAt: asString(record.uploadedAt, asString(record.createdAt, '')),
    farmerName: asString(farmerAssociation.farmerName, asString(record.farmerName, 'Unknown Farmer')),
    farmerId,
    images,
    analytics: {
      totalImages: images.length,
      bestImageId: null,
      averageImageQuality: null,
      cropHealthScore: null,
      marketValue: null,
      demandScore: null
    },
    database: {
      isSynced: true,
      lastSyncDate: asString(record.lastUpdated, ''),
      version: 1,
      checksum: null
    }
  };
  const farmerLocation = asString(farmerAddress.city, location);

  return {
    ...cropData,
    farmer: {
      id: farmerId,
      name: asString(asRecord(farmerRecord.profile).fullName, cropData.farmerName),
      phone: asString(farmerRecord.phone, '+91-XXXX-XXXX'),
      location: farmerLocation,
      rating: 4,
      totalCrops: 1,
      joinedDate: asString(record.createdAt, new Date().toISOString())
    },
    distance: 0,
    demandScore: calculateDemandScore(cropData),
    priceComparison: {
      marketAverage: price,
      isAboveAverage: false,
      percentageDifference: 0
    }
  };
};

// Calculate demand score for crops based on real data
const calculateDemandScore = (crop: CropData): number => {
  let score = 50; // Base score
  
  // Quality bonus
  if (crop.quality === 'A') score += 20;
  else if (crop.quality === 'B') score += 10;
  else if (crop.quality === 'C') score += 5;
  
  // Organic bonus
  if (crop.organic) score += 15;
  
  // Fresh harvest bonus
  const harvestDate = new Date(crop.harvestDate);
  const daysSinceHarvest = Math.floor((Date.now() - harvestDate.getTime()) / (1000 * 60 * 60 * 24));
  if (daysSinceHarvest <= 7) score += 15;
  else if (daysSinceHarvest <= 14) score += 10;
  else if (daysSinceHarvest <= 30) score += 5;
  
  // Price competitiveness
  if (crop.price < 50) score += 10;
  else if (crop.price > 100) score -= 5;
  
  // Quantity availability
  if (crop.quantity > 100) score += 5;
  else if (crop.quantity < 20) score -= 5;
  
  return Math.min(100, Math.max(0, score));
};

// The marketplace endpoint is public and the database is the source of truth across devices.
export const loadAllFarmerCrops = async (): Promise<MarketplaceCrop[]> => {
  const response = await fetch(`${API_BASE_URL}/api/crops/marketplace`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store'
  });

  if (!response.ok) {
    throw new Error(`Marketplace request failed: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  if (!Array.isArray(result.data)) {
    throw new Error('Marketplace response did not contain a crop list');
  }

  const crops = result.data.map((crop: CropRecord) => mapMarketplaceCrop(crop));
  console.log(`✅ Loaded ${crops.length} marketplace crops from shared database`);
  return crops;
};

// Filter crops by category
export const filterCropsByCategory = (crops: MarketplaceCrop[], category: string): MarketplaceCrop[] => {
  // Defensive programming: ensure crops is an array
  if (!Array.isArray(crops)) {
    console.error('❌ filterCropsByCategory: crops is not an array:', typeof crops, crops);
    return [];
  }
  
  if (!category || category === 'all') return crops;

  const normalizedCategory = cropCategoryAliases[category.toLowerCase()] || category.toLowerCase();
  return crops.filter(crop => getCropCategory(crop.type, crop.name) === normalizedCategory);
};

// Search crops by name or type
export const searchCrops = (crops: MarketplaceCrop[], query: string): MarketplaceCrop[] => {
  // Defensive programming: ensure crops is an array
  if (!Array.isArray(crops)) {
    console.error('❌ searchCrops: crops is not an array:', typeof crops, crops);
    return [];
  }
  
  if (!query.trim()) return crops;
  
  const searchTerm = query.toLowerCase();
  return crops.filter(crop => 
    crop.name.toLowerCase().includes(searchTerm) ||
    crop.type.toLowerCase().includes(searchTerm) ||
    crop.variety.toLowerCase().includes(searchTerm) ||
    crop.location.toLowerCase().includes(searchTerm) ||
    crop.farmer.name.toLowerCase().includes(searchTerm)
  );
};

// Sort crops by different criteria
export const sortCrops = (crops: MarketplaceCrop[], sortBy: string): MarketplaceCrop[] => {
  // Defensive programming: ensure crops is an array
  if (!Array.isArray(crops)) {
    console.error('❌ sortCrops: crops is not an array:', typeof crops, crops);
    return [];
  }
  
  const sortedCrops = [...crops];
  
  switch (sortBy) {
    case 'price-low':
      return sortedCrops.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sortedCrops.sort((a, b) => b.price - a.price);
    case 'distance':
      return sortedCrops.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    case 'rating':
      return sortedCrops.sort((a, b) => b.farmer.rating - a.farmer.rating);
    case 'demand':
      return sortedCrops.sort((a, b) => b.demandScore - a.demandScore);
    case 'recent':
      return sortedCrops.sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
    default:
      return sortedCrops;
  }
};

// Get crop categories for filtering
export const getCropCategories = async (
  crops?: MarketplaceCrop[]
): Promise<{ value: string; label: string; count: number }[]> => {
  const availableCrops = crops ?? await loadAllFarmerCrops();
  
  // Defensive programming: ensure crops is an array
  if (!Array.isArray(availableCrops)) {
    console.error('❌ getCropCategories: crops is not an array:', typeof availableCrops, availableCrops);
    return [];
  }
  
  const categories = new Map<string, number>();
  
  availableCrops.forEach(crop => {
    const category = getCropCategory(crop.type, crop.name);
    categories.set(category, (categories.get(category) || 0) + 1);
  });
  
  // Ensure categories is a Map before converting to array
  if (categories instanceof Map && categories.size > 0) {
    return Array.from(categories.entries()).map(([value, count]) => ({
      value,
      label: value.charAt(0).toUpperCase() + value.slice(1),
      count
    }));
  } else {
    return [];
  }
};

// Get marketplace statistics
export const getMarketplaceStats = async (crops?: MarketplaceCrop[]) => {
  const availableCrops = crops ?? await loadAllFarmerCrops();
  
  // Defensive programming: ensure crops is an array
  if (!Array.isArray(availableCrops)) {
    console.error('❌ getMarketplaceStats: crops is not an array:', typeof availableCrops, availableCrops);
    return {
      totalCrops: 0,
      totalFarmers: 0,
      averagePrice: 0,
      categories: [],
      topSellingCrops: [],
      priceRange: { min: 0, max: 0 }
    };
  }
  
  // Ensure crops is an array before using map functions
  const safeCrops = availableCrops;
  
  return {
    totalCrops: safeCrops.length,
    totalFarmers: safeCrops.length > 0 ? new Set(safeCrops.map(crop => crop.farmerId)).size : 0,
    averagePrice: safeCrops.length > 0 ? safeCrops.reduce((sum, crop) => sum + crop.price, 0) / safeCrops.length : 0,
    categories: await getCropCategories(safeCrops),
    topSellingCrops: getTopSellingCrops(safeCrops),
    priceRange: {
      min: safeCrops.length > 0 ? Math.min(...safeCrops.map(crop => crop.price)) : 0,
      max: safeCrops.length > 0 ? Math.max(...safeCrops.map(crop => crop.price)) : 0
    }
  };
};

// Debug function to check localStorage data
export const debugLocalStorageData = () => {
  console.log('🔍 Debugging localStorage data...');
  const keys = Object.keys(localStorage);
  console.log('📋 All localStorage keys:', keys);
  
  const farmerKeys = keys.filter(key => key.startsWith('farmer_database_'));
  console.log('🌾 Farmer database keys:', farmerKeys);
  
  farmerKeys.forEach(key => {
    const data = localStorage.getItem(key);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        console.log(`📊 Data for ${key}:`, {
          farmerId: parsed.farmerId,
          farmerName: parsed.farmerName,
          totalCrops: parsed.totalCrops,
          crops: parsed.crops?.length || 0
        });
      } catch (e) {
        console.error(`❌ Error parsing data for ${key}:`, e);
      }
    }
  });
  
  return farmerKeys.length;
};

// Data Recovery Functions
export const recoverFarmerData = () => {
  console.log('🔄 Starting farmer data recovery...');
  const keys = Object.keys(localStorage);
  const farmerKeys = keys.filter(key => key.startsWith('farmer_database_'));
  
  console.log(`🔍 Found ${farmerKeys.length} farmer databases to recover`);
  
  const recoveredData = [];
  
  farmerKeys.forEach(key => {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        const parsed = JSON.parse(data);
        console.log(`✅ Recovered data for farmer: ${parsed.farmerName} (${parsed.farmerId})`);
        console.log(`📊 Crops found: ${parsed.crops?.length || 0}`);
        
        recoveredData.push({
          key,
          farmerId: parsed.farmerId,
          farmerName: parsed.farmerName,
          totalCrops: parsed.totalCrops,
          crops: parsed.crops || [],
          lastUpdated: parsed.lastUpdated
        });
      }
    } catch (error) {
      console.error(`❌ Error recovering data for ${key}:`, error);
    }
  });
  
  console.log(`🎉 Recovery complete! Found ${recoveredData.length} farmers with data`);
  return recoveredData;
};

// Force refresh marketplace data
export const forceRefreshMarketplace = async () => {
  console.log('🔄 Force refreshing marketplace data...');
  
  // Clear any cached data
  const keys = Object.keys(localStorage);
  const cacheKeys = keys.filter(key => key.includes('marketplace_cache') || key.includes('crop_cache'));
  cacheKeys.forEach(key => localStorage.removeItem(key));
  
  // Reload all farmer data
  const crops = await loadAllFarmerCrops();
  
  // Defensive programming: ensure crops is an array
  if (!Array.isArray(crops)) {
    console.error('❌ forceRefreshMarketplace: crops is not an array:', typeof crops, crops);
    return [];
  }
  
  console.log(`🔄 Marketplace refreshed with ${crops.length} crops`);
  
  return crops;
};

// Backup farmer data to JSON
export const backupFarmerData = () => {
  console.log('💾 Creating backup of farmer data...');
  const keys = Object.keys(localStorage);
  const farmerKeys = keys.filter(key => key.startsWith('farmer_database_'));
  
  const backup = {};
  farmerKeys.forEach(key => {
    const data = localStorage.getItem(key);
    if (data) {
      backup[key] = JSON.parse(data);
    }
  });
  
  const backupString = JSON.stringify(backup, null, 2);
  const blob = new Blob([backupString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `farmer_data_backup_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  console.log('💾 Backup created and downloaded!');
  return backup;
};

// Restore farmer data from backup
export const restoreFarmerData = (backupData: any) => {
  console.log('🔄 Restoring farmer data from backup...');
  
  Object.keys(backupData).forEach(key => {
    try {
      localStorage.setItem(key, JSON.stringify(backupData[key]));
      console.log(`✅ Restored data for ${key}`);
    } catch (error) {
      console.error(`❌ Error restoring data for ${key}:`, error);
    }
  });
  
  console.log('🎉 Data restoration complete!');
};

// Get top selling crops
const getTopSellingCrops = (crops: MarketplaceCrop[]) => {
  // Defensive programming: ensure crops is an array
  if (!Array.isArray(crops)) {
    console.error('❌ getTopSellingCrops: crops is not an array:', typeof crops, crops);
    return [];
  }
  
  const cropCounts = new Map<string, number>();
  
  crops.forEach(crop => {
    const name = crop.name.toLowerCase();
    cropCounts.set(name, (cropCounts.get(name) || 0) + 1);
  });
  
  // Ensure cropCounts is a Map before converting to array
  if (cropCounts instanceof Map && cropCounts.size > 0) {
    return Array.from(cropCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));
  } else {
    return [];
  }
};

export type { MarketplaceCrop, FarmerData, CropData };
