// Marketplace Service - Loads real farmer crop data for buyers
import { authenticatedFetch } from './tokenService';

// Enhanced token validation function
function validateAuthToken(): { isValid: boolean; token: string | null; error?: string } {
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    console.error('❌ No auth token found in localStorage');
    return { isValid: false, token: null, error: 'No token found' };
  }
  
  // Check token format (JWT should have 3 parts separated by dots)
  const tokenParts = token.split('.');
  if (tokenParts.length !== 3) {
    console.error('❌ Invalid token format:', token.substring(0, 20) + '...');
    return { isValid: false, token: null, error: 'Invalid token format' };
  }
  
  // Check if token is expired (basic check)
  try {
    const payload = JSON.parse(atob(tokenParts[1]));
    const now = Math.floor(Date.now() / 1000);
    
    if (payload.exp && payload.exp < now) {
      console.error('❌ Token expired:', new Date(payload.exp * 1000));
      return { isValid: false, token: null, error: 'Token expired' };
    }
    
    console.log('✅ Token validation passed:', {
      userId: payload.userId,
      exp: new Date(payload.exp * 1000),
      iat: new Date(payload.iat * 1000)
    });
    
    return { isValid: true, token };
  } catch (error) {
    console.error('❌ Token parsing error:', error);
    return { isValid: false, token: null, error: 'Token parsing failed' };
  }
}

// Helper function to load from localStorage
async function loadFromLocalStorage(): Promise<MarketplaceCrop[]> {
  console.log('🔄 Loading crops from localStorage fallback...');
  
  const allCrops: MarketplaceCrop[] = [];
  
  // Get all localStorage keys
  const keys = Object.keys(localStorage);
  
  // Find all farmer database keys
  const farmerKeys = keys.filter(key => key.startsWith('farmer_database_'));
  
  console.log(`🔍 Found ${farmerKeys.length} farmer databases in localStorage`);
  
  // Validate farmerKeys is an array
  if (!Array.isArray(farmerKeys)) {
    console.error('❌ farmerKeys is not an array:', typeof farmerKeys, farmerKeys);
    return [];
  }
  
  // If no farmer data found, show debug info
  if (farmerKeys.length === 0) {
    console.warn('⚠️ No farmer data found in localStorage!');
    console.log('🔍 All localStorage keys:', keys);
    console.log('💡 Make sure farmers have uploaded crops first');
    return [];
  }
  
  farmerKeys.forEach(key => {
    try {
      const data = localStorage.getItem(key);
      if (data) {
        const farmerData = JSON.parse(data);
        
        if (farmerData.crops && Array.isArray(farmerData.crops)) {
          console.log(`📊 Loading ${farmerData.crops.length} crops from farmer ${farmerData.farmerId} (${farmerData.farmerName})`);
          
          // Ensure crops is an array and has valid data
          const validCrops = farmerData.crops.filter(crop => 
            crop && typeof crop === 'object' && crop.id && crop.name
          );
          
          console.log(`✅ Found ${validCrops.length} valid crops from ${farmerData.farmerName}`);
          
          validCrops.forEach(crop => {
            const marketplaceCrop: MarketplaceCrop = {
              ...crop,
              farmer: {
                id: farmerData.farmerId || 'unknown',
                name: farmerData.farmerName || 'Unknown Farmer',
                phone: farmerData.farmerPhone || '+91-XXXX-XXXX',
                location: 'Unknown Location',
                rating: Math.random() * 2 + 3,
                totalCrops: validCrops.length,
                joinedDate: new Date().toISOString(),
                avatar: undefined
              },
              distance: Math.random() * 50 + 1,
              demandScore: Math.random() * 100,
              priceComparison: {
                marketAverage: crop.price * (0.8 + Math.random() * 0.4),
                isAboveAverage: Math.random() > 0.5,
                percentageDifference: (Math.random() - 0.5) * 40
              }
            };
            
            allCrops.push(marketplaceCrop);
          });
        }
      }
    } catch (error) {
      console.error(`❌ Error loading farmer data from ${key}:`, error);
    }
  });
  
  console.log(`✅ LOCALSTORAGE FALLBACK: Loaded ${allCrops.length} crops from localStorage`);
  return allCrops;
}

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

// Load all farmer crop data from database - REAL-TIME DATABASE INTEGRATION
export const loadAllFarmerCrops = async (): Promise<MarketplaceCrop[]> => {
  try {
    console.log('🌾 Loading crops from database...');
    
    // Initialize empty array to ensure we always return an array
    let allCrops: MarketplaceCrop[] = [];
    
    // Add try-catch wrapper for the entire function to prevent crashes
    try {
    
    // Try to load from database first
    try {
      // Validate auth token before making request
      const tokenValidation = validateAuthToken();
      
      if (!tokenValidation.isValid) {
        console.error('❌ Invalid auth token:', tokenValidation.error);
        console.log('🔄 Falling back to localStorage due to invalid token');
        return await loadFromLocalStorage();
      }
      
      console.log('✅ Token validation passed, making API request');
      
      // Use authenticated fetch with automatic token management
      const response = await authenticatedFetch('https://kshetravega-57p9.onrender.com/api/crops/marketplace', {
        method: 'GET'
      });
      
      console.log(`📡 API Response Status: ${response.status} ${response.statusText}`);
      
      if (response.status === 401) {
        console.error('❌ 401 Unauthorized - Token rejected by server');
        console.log('🔄 Falling back to localStorage due to 401 error');
        return await loadFromLocalStorage();
      }

      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Loaded ${result.data?.length || 0} crops from database`);
        
        // Ensure data is an array before mapping
        const cropsData = Array.isArray(result.data) ? result.data : [];
        
        // Validate cropsData before mapping
        if (cropsData.length === 0) {
          console.log('📭 No crops found in database, falling back to localStorage');
          // Fallback to localStorage when database is empty
          return await loadFromLocalStorage();
        } else {
          console.log(`🌾 Processing ${cropsData.length} crops from database`);
        }
        
        // Ensure cropsData is valid before mapping
        if (Array.isArray(cropsData) && cropsData.length > 0) {
          const mappedCrops = cropsData.map((crop: any) => ({
            ...crop,
            farmer: {
              id: crop.farmerId?._id || 'unknown',
              name: crop.farmerId?.profile?.fullName || 'Unknown Farmer',
              phone: crop.farmerId?.phone || '+91-XXXX-XXXX',
              location: crop.farmerId?.address?.current?.city || 'Unknown Location',
              rating: Math.random() * 2 + 3,
              totalCrops: 1,
              joinedDate: new Date().toISOString(),
              avatar: undefined
            },
            distance: Math.random() * 50 + 1,
            demandScore: Math.random() * 100,
            priceComparison: {
              marketAverage: crop.price * (0.8 + Math.random() * 0.4),
              isAboveAverage: Math.random() > 0.5,
              percentageDifference: (Math.random() - 0.5) * 40
            }
          }));
          
          console.log(`✅ Successfully mapped ${mappedCrops.length} crops from database`);
          return mappedCrops;
        } else {
          console.log('📭 No valid crops found in database response');
          return [];
        }
      }
    } catch (error) {
      console.error('❌ Database load failed, falling back to localStorage:', error);
      // Fallback to localStorage when database fails
      return await loadFromLocalStorage();
    }

    // Fallback to localStorage
    allCrops = [];
    
    // Get all localStorage keys
    const keys = Object.keys(localStorage);
    
    // Find all farmer database keys
    const farmerKeys = keys.filter(key => key.startsWith('farmer_database_'));
    
    console.log(`🔍 Found ${farmerKeys.length} farmer databases in localStorage`);
    console.log('📋 Farmer database keys:', farmerKeys);
    
    // Validate farmerKeys is an array
    if (!Array.isArray(farmerKeys)) {
      console.error('❌ farmerKeys is not an array:', typeof farmerKeys, farmerKeys);
      return [];
    }
    
    // If no farmer data found, show debug info
    if (farmerKeys.length === 0) {
      console.warn('⚠️ No farmer data found in localStorage!');
      console.log('🔍 All localStorage keys:', keys);
      console.log('💡 Make sure farmers have uploaded crops first');
      return [];
    }
    
    farmerKeys.forEach(key => {
      try {
        const data = localStorage.getItem(key);
        if (data) {
          const farmerData = JSON.parse(data);
          
          if (farmerData.crops && Array.isArray(farmerData.crops)) {
            console.log(`📊 Loading ${farmerData.crops.length} crops from farmer ${farmerData.farmerId} (${farmerData.farmerName})`);
            
            // Ensure crops is an array and has valid data
            const validCrops = farmerData.crops.filter(crop => 
              crop && typeof crop === 'object' && crop.id && crop.name
            );
            
            console.log(`🌾 Valid crops: ${validCrops.length}/${farmerData.crops.length}`);
            
            // Ensure validCrops is an array before mapping
            if (Array.isArray(validCrops) && validCrops.length > 0) {
              console.log(`🌾 Farmer crops:`, validCrops.map(crop => ({
                id: crop.id,
                name: crop.name,
                type: crop.type,
                price: crop.price,
                farmerName: crop.farmerName
              })));
            } else {
              console.log(`🌾 Farmer crops: No valid crops to display`);
            }
            
            // Process only valid crops
            validCrops.forEach((crop: CropData, index: number) => {
              // Validate crop data before processing
              if (!crop || typeof crop !== 'object' || !crop.id || !crop.name) {
                console.warn(`⚠️ Skipping invalid crop at index ${index}:`, crop);
                return;
              }
              
              // Create unique ID for each crop to avoid duplicates
              const uniqueCropId = `${farmerData.farmerId}_${crop.id}_${index}_${Date.now()}`;
              
              // Create farmer info from actual data
              const farmer: FarmerData = {
                id: farmerData.farmerId,
                name: crop.farmerName || farmerData.farmerName || 'Unknown Farmer',
                phone: farmerData.farmerPhone || '+91-XXXX-XXXX',
                location: crop.location || farmerData.farmerLocation || 'Unknown Location',
                rating: Math.random() * 2 + 3, // Random rating between 3-5
                totalCrops: farmerData.totalCrops || 1,
                joinedDate: farmerData.lastUpdated || new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
                avatar: undefined
              };
              
              // Calculate additional marketplace data
              const marketplaceCrop: MarketplaceCrop = {
                ...crop,
                id: uniqueCropId, // Use unique ID
                farmer,
                distance: Math.random() * 50 + 1, // Random distance 1-50 km
                demandScore: calculateDemandScore(crop), // Real demand score based on crop data
                priceComparison: {
                  marketAverage: crop.price * (0.8 + Math.random() * 0.4), // ±20% variation
                  isAboveAverage: Math.random() > 0.5,
                  percentageDifference: (Math.random() - 0.5) * 40 // ±20% difference
                }
              };
              
              allCrops.push(marketplaceCrop);
            });
          }
        }
      } catch (error) {
        console.error('Error parsing farmer data:', error);
      }
    });
    
    console.log(`🌾 Total crops loaded for marketplace: ${allCrops.length}`);
    
    // Ensure allCrops is an array before logging
    if (Array.isArray(allCrops)) {
      console.log('🌾 All marketplace crops:', allCrops.map(crop => ({
        id: crop.id,
        name: crop.name,
        farmerName: crop.farmer?.name || 'Unknown',
        price: crop.price,
        type: crop.type
      })));
    } else {
      console.warn('⚠️ allCrops is not an array:', typeof allCrops, allCrops);
    }
    
    // Final validation before returning
    if (!Array.isArray(allCrops)) {
      console.error('❌ allCrops is not an array in final return, returning empty array');
      return [];
    }
    
    // Sort by demand score and recency
    const sortedCrops = allCrops.sort((a, b) => {
      // First by demand score (higher is better)
      if (b.demandScore !== a.demandScore) {
        return b.demandScore - a.demandScore;
      }
      // Then by recency (newer is better)
      return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
    });
    
    console.log(`🎉 Final result: ${sortedCrops.length} marketplace crops ready`);
    return sortedCrops;
    
    } catch (innerError) {
      console.error('❌ Inner function error, returning empty array:', innerError);
      return [];
    }
    
  } catch (error) {
    console.error('❌ Outer function error, returning empty array:', error);
    return [];
  }
};

// Filter crops by category
export const filterCropsByCategory = (crops: MarketplaceCrop[], category: string): MarketplaceCrop[] => {
  // Defensive programming: ensure crops is an array
  if (!Array.isArray(crops)) {
    console.error('❌ filterCropsByCategory: crops is not an array:', typeof crops, crops);
    return [];
  }
  
  if (!category || category === 'all') return crops;
  
  return crops.filter(crop => {
    const cropType = crop.type.toLowerCase();
    const categoryLower = category.toLowerCase();
    
    switch (categoryLower) {
      case 'grains':
        return ['rice', 'wheat', 'maize', 'barley', 'millet'].includes(cropType);
      case 'vegetables':
        return ['tomato', 'onion', 'potato', 'carrot', 'cabbage', 'cauliflower'].includes(cropType);
      case 'fruits':
        return ['apple', 'banana', 'mango', 'orange', 'grapes', 'pomegranate'].includes(cropType);
      case 'pulses':
        return ['lentil', 'chickpea', 'black gram', 'green gram', 'pigeon pea'].includes(cropType);
      case 'spices':
        return ['turmeric', 'chili', 'coriander', 'cumin', 'cardamom'].includes(cropType);
      default:
        return cropType.includes(categoryLower);
    }
  });
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
export const getCropCategories = async (): Promise<{ value: string; label: string; count: number }[]> => {
  const crops = await loadAllFarmerCrops();
  
  // Defensive programming: ensure crops is an array
  if (!Array.isArray(crops)) {
    console.error('❌ getCropCategories: crops is not an array:', typeof crops, crops);
    return [];
  }
  
  const categories = new Map<string, number>();
  
  crops.forEach(crop => {
    const type = crop.type.toLowerCase();
    let category = 'other';
    
    if (['rice', 'wheat', 'maize', 'barley', 'millet'].includes(type)) {
      category = 'grains';
    } else if (['tomato', 'onion', 'potato', 'carrot', 'cabbage', 'cauliflower'].includes(type)) {
      category = 'vegetables';
    } else if (['apple', 'banana', 'mango', 'orange', 'grapes', 'pomegranate'].includes(type)) {
      category = 'fruits';
    } else if (['lentil', 'chickpea', 'black gram', 'green gram', 'pigeon pea'].includes(type)) {
      category = 'pulses';
    } else if (['turmeric', 'chili', 'coriander', 'cumin', 'cardamom'].includes(type)) {
      category = 'spices';
    }
    
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
export const getMarketplaceStats = async () => {
  const crops = await loadAllFarmerCrops();
  
  // Defensive programming: ensure crops is an array
  if (!Array.isArray(crops)) {
    console.error('❌ getMarketplaceStats: crops is not an array:', typeof crops, crops);
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
  const safeCrops = Array.isArray(crops) ? crops : [];
  
  return {
    totalCrops: safeCrops.length,
    totalFarmers: safeCrops.length > 0 ? new Set(safeCrops.map(crop => crop.farmerId)).size : 0,
    averagePrice: safeCrops.length > 0 ? safeCrops.reduce((sum, crop) => sum + crop.price, 0) / safeCrops.length : 0,
    categories: await getCropCategories(),
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
