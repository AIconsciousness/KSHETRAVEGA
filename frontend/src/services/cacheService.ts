// Advanced Caching Service for Fast Data Fetching
// This service implements intelligent caching to make data fetch lightning fast

interface CacheConfig {
  maxAge: number; // Cache expiry time in milliseconds
  maxSize: number; // Maximum cache size
  strategy: 'memory' | 'localStorage' | 'indexedDB';
}

interface CacheEntry {
  data: any;
  timestamp: number;
  expiry: number;
  hits: number;
  key: string;
}

class AdvancedCacheService {
  private cache: Map<string, CacheEntry> = new Map();
  private config: CacheConfig;

  constructor(config: CacheConfig) {
    this.config = config;
    this.loadFromStorage();
  }

  // Set cache entry with smart expiry
  set(key: string, data: any, customExpiry?: number): void {
    const now = Date.now();
    const expiry = customExpiry || (now + this.config.maxAge);
    
    const entry: CacheEntry = {
      data,
      timestamp: now,
      expiry,
      hits: 0,
      key
    };

    this.cache.set(key, entry);
    this.saveToStorage();
    
    console.log(`💾 CACHE SET: ${key} (expires in ${Math.round((expiry - now) / 1000)}s)`);
  }

  // Get cache entry with hit tracking
  get(key: string): any | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      console.log(`❌ CACHE MISS: ${key}`);
      return null;
    }

    const now = Date.now();
    if (now > entry.expiry) {
      console.log(`⏰ CACHE EXPIRED: ${key}`);
      this.cache.delete(key);
      return null;
    }

    entry.hits++;
    console.log(`✅ CACHE HIT: ${key} (${entry.hits} hits)`);
    return entry.data;
  }

  // Smart cache invalidation
  invalidate(pattern: string): void {
    const regex = new RegExp(pattern);
    let invalidated = 0;
    
    for (const [key, entry] of this.cache.entries()) {
      if (regex.test(key)) {
        this.cache.delete(key);
        invalidated++;
      }
    }
    
    console.log(`🗑️ CACHE INVALIDATED: ${invalidated} entries matching ${pattern}`);
    this.saveToStorage();
  }

  // Get cache statistics
  getStats(): any {
    const entries = Array.from(this.cache.values());
    const now = Date.now();
    
    return {
      totalEntries: entries.length,
      totalHits: entries.reduce((sum, entry) => sum + entry.hits, 0),
      expiredEntries: entries.filter(entry => now > entry.expiry).length,
      memoryUsage: JSON.stringify(entries).length,
      topKeys: entries
        .sort((a, b) => b.hits - a.hits)
        .slice(0, 5)
        .map(entry => ({ key: entry.key, hits: entry.hits }))
    };
  }

  // Save cache to localStorage
  private saveToStorage(): void {
    if (this.config.strategy === 'localStorage') {
      const cacheData = Array.from(this.cache.entries());
      localStorage.setItem('advanced_cache', JSON.stringify(cacheData));
    }
  }

  // Load cache from localStorage
  private loadFromStorage(): void {
    if (this.config.strategy === 'localStorage') {
      try {
        const stored = localStorage.getItem('advanced_cache');
        if (stored) {
          const cacheData = JSON.parse(stored);
          this.cache = new Map(cacheData);
          console.log(`📂 CACHE LOADED: ${this.cache.size} entries from storage`);
        }
      } catch (error) {
        console.error('❌ Cache load error:', error);
      }
    }
  }

  // Clear all cache
  clear(): void {
    this.cache.clear();
    localStorage.removeItem('advanced_cache');
    console.log('🧹 CACHE CLEARED: All entries removed');
  }
}

// Create global cache instance
export const cacheService = new AdvancedCacheService({
  maxAge: 5 * 60 * 1000, // 5 minutes
  maxSize: 100, // 100 entries
  strategy: 'localStorage'
});

// Smart data fetching with cache
export const smartFetch = async (url: string, options: RequestInit = {}): Promise<any> => {
  const cacheKey = `fetch_${url}_${JSON.stringify(options)}`;
  
  // Try cache first
  const cached = cacheService.get(cacheKey);
  if (cached) {
    console.log(`⚡ LIGHTNING FAST: Data from cache`);
    return cached;
  }

  // Fetch from network
  console.log(`🌐 NETWORK FETCH: ${url}`);
  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  const data = await response.json();
  
  // Cache the result
  cacheService.set(cacheKey, data);
  
  return data;
};

// Cache-aware marketplace data fetching
export const getMarketplaceData = async (): Promise<any> => {
  const cacheKey = 'marketplace_data';
  
  // Try cache first
  const cached = cacheService.get(cacheKey);
  if (cached) {
    console.log(`⚡ MARKETPLACE: Lightning fast from cache`);
    return cached;
  }

  // Fetch from API
  console.log(`🌐 MARKETPLACE: Fetching from API`);
  const data = await smartFetch('https://kshetravega-57p9.onrender.com/api/crops/marketplace', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }
  });

  // Cache for 2 minutes
  cacheService.set(cacheKey, data, Date.now() + 2 * 60 * 1000);
  
  return data;
};

// Cache-aware farmer data fetching
export const getFarmerData = async (farmerId: string): Promise<any> => {
  const cacheKey = `farmer_${farmerId}`;
  
  // Try cache first
  const cached = cacheService.get(cacheKey);
  if (cached) {
    console.log(`⚡ FARMER DATA: Lightning fast from cache`);
    return cached;
  }

  // Fetch from API
  console.log(`🌐 FARMER DATA: Fetching from API`);
  const data = await smartFetch(`https://kshetravega-57p9.onrender.com/api/crops/farmer/${farmerId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    }
  });

  // Cache for 3 minutes
  cacheService.set(cacheKey, data, Date.now() + 3 * 60 * 1000);
  
  return data;
};

export default cacheService;
