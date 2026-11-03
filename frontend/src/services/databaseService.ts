// Database Service for MongoDB and PostgreSQL Integration
// This service handles all database operations for crops and images
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
  images: ImageData[];
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

interface ImageData {
  id: string;
  cropId: string;
  farmerId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadDate: string;
  imageUrl: string;
  blobData: File;
  metadata: {
    width: number | null;
    height: number | null;
    aspectRatio: number | null;
    quality: string;
    dominantColors: string[];
    cropType: string | null;
    healthScore: number | null;
  };
  analysis: {
    isAnalyzed: boolean;
    analysisDate: string | null;
    confidence: number | null;
    suggestions: string[];
  };
}

// MongoDB Integration Functions - IMMEDIATE DATABASE SAVE
export const saveToMongoDB = async (cropData: CropData): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    console.log('🌾 IMMEDIATE SAVE: Saving crop to MongoDB immediately...');
    console.log('🌾 Crop data:', cropData);
    
    // Validate required fields
    if (!cropData.name || !cropData.type || !cropData.price) {
      throw new Error('Missing required crop data: name, type, or price');
    }
    
    // Get farmer ID from localStorage or user profile
    const farmerId = localStorage.getItem('farmer_user_id') || localStorage.getItem('farmer_user_key') || 'unknown';
    const farmerName = localStorage.getItem('farmer_name') || 'Unknown Farmer';
    const farmerPhone = localStorage.getItem('farmer_phone') || 'unknown';
    
    console.log('🌾 Farmer details:', { farmerId, farmerName, farmerPhone });
    
    // Enrich crop data with farmer information
    const enrichedCropData = {
      ...cropData,
      farmerId: farmerId,
      farmerName: farmerName,
      farmerPhone: farmerPhone,
      uploadedAt: new Date().toISOString(),
      status: 'available',
      isPermanent: true,
      crossDeviceAccess: true,
      sessionIndependent: true,
      // Add crop-specific fields for backend compatibility
      cropName: cropData.name,
      cropType: cropData.type,
      variety: cropData.variety || 'Unknown',
      quantity: cropData.quantity || 1,
      unit: cropData.unit || 'kg',
      quality: cropData.quality || 'good',
      harvestDate: cropData.harvestDate || new Date().toISOString(),
      price: cropData.price,
      organic: cropData.organic || false,
      location: cropData.location || 'Unknown',
      description: cropData.description || '',
      images: cropData.images || []
    };
    
    console.log('🌾 Enriched crop data:', enrichedCropData);
    
    // Get authentication token
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      throw new Error('No authentication token found');
    }
    
    // Validate token format
    const tokenParts = authToken.split('.');
    if (tokenParts.length !== 3) {
      throw new Error('Invalid token format');
    }
    
    let tokenPayload: { exp?: number } | null = null;
    try {
      tokenPayload = JSON.parse(atob(tokenParts[1]));
    } catch {
      console.log('🔑 Could not validate token expiry');
    }

    if (tokenPayload?.exp && tokenPayload.exp < Math.floor(Date.now() / 1000)) {
      throw new Error('Token expired');
    }
    
    // Make API call to save crop - using local backend
    let response = await fetch(`${API_BASE_URL}/api/crops`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(enrichedCropData)
    });
    
    // Handle duplicate detection response
    if (response.status === 409) {
      const duplicateResponse = await response.json();
      console.log('❌ Duplicate crop detected by server:', duplicateResponse);
      return {
        success: false,
        error: 'Duplicate crop entry detected. Please wait before uploading again.',
        isDuplicate: true
      };
    }
    
    // If 401, try to refresh token and retry
    if (response.status === 401) {
      console.log('🔄 401 received, attempting token refresh...');
      
      try {
        // Try to refresh token
        const refreshResponse = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ token: authToken })
        });
        
        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          const newToken = refreshData.token;
          
          console.log('🔄 Token refreshed successfully, retrying request...');
          
          // Update localStorage with new token
          localStorage.setItem('authToken', newToken);
          
          // Retry the original request with new token
          response = await fetch(`${API_BASE_URL}/api/crops`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${newToken}`
            },
            body: JSON.stringify(enrichedCropData)
          });
        } else {
          console.log('❌ Token refresh failed, redirecting to login...');
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          throw new Error('Token refresh failed');
        }
      } catch (refreshError) {
        console.log('❌ Token refresh error:', refreshError);
        localStorage.removeItem('authToken');
        window.location.href = '/login';
        throw new Error('Token refresh failed');
      }
    }
    
    console.log('🌾 API Response status:', response.status);
    console.log('🌾 API Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
        console.error('🌾 API Error response:', errorData);
      } catch (jsonError) {
        const errorText = await response.text();
        console.error('🌾 API Error text:', errorText);
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }
    
    // Handle successful response
    let result;
    try {
      result = await response.json();
      console.log('✅ IMMEDIATE SAVE SUCCESS: Crop saved to MongoDB:', result);
    } catch (jsonError) {
      console.log('✅ IMMEDIATE SAVE SUCCESS: Crop saved to MongoDB (no JSON response)');
      result = { message: 'Crop saved successfully' };
    }
    
    return { success: true, data: result };
  } catch (error) {
    console.error('❌ IMMEDIATE SAVE FAILED:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// PostgreSQL Integration Functions
export const saveToPostgreSQL = async (cropData: CropData): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    // TODO: Implement PostgreSQL connection and save
    console.log('Saving to PostgreSQL:', cropData);
    
    // Example PostgreSQL save operation
    // const response = await fetch('/api/postgresql/crops', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(cropData)
    // });
    
    // if (!response.ok) {
    //   throw new Error('Failed to save to PostgreSQL');
    // }
    
    // const result = await response.json();
    // return { success: true, data: result };
    
    // For now, return success (will be implemented later)
    return { success: true, data: cropData };
  } catch (error) {
    console.error('PostgreSQL save error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Cloud Storage Integration for Images
export const uploadImagesToCloud = async (images: ImageData[]): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    console.log('Uploading images to cloud:', images);
    
    // TODO: Implement cloud storage (AWS S3, Cloudinary, etc.)
    // Example cloud upload operation
    // const uploadPromises = images.map(async (image) => {
    //   const formData = new FormData();
    //   formData.append('image', image.blobData);
    //   formData.append('metadata', JSON.stringify(image.metadata));
    //   
    //   const response = await fetch('/api/cloud/upload', {
    //     method: 'POST',
    //     body: formData
    //   });
    //   
    //   if (!response.ok) {
    //     throw new Error('Failed to upload image');
    //   }
    //   
    //   return await response.json();
    // });
    
    // const results = await Promise.all(uploadPromises);
    // return { success: true, data: results };
    
    // For now, return success (will be implemented later)
    return { success: true, data: images };
  } catch (error) {
    console.error('Cloud upload error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Load crops from database - REAL DATABASE LOAD
export const loadCropsFromDatabase = async (farmerId: string): Promise<{ success: boolean; data?: CropData[]; error?: string }> => {
  try {
    console.log('🌾 Loading crops from database for farmer:', farmerId);
    
    const response = await fetch(`${API_BASE_URL}/api/crops/farmer/${farmerId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to load crops from database');
    }
    
    const result = await response.json();
    console.log('✅ Crops loaded from database successfully:', result.crops?.length || 0);
    return { success: true, data: result.crops || [] };
  } catch (error) {
    console.error('❌ Database load error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Delete crop from database
export const deleteCropFromDatabase = async (cropId: string): Promise<{ success: boolean; error?: string }> => {
  try {
    // TODO: Implement database delete operation
    console.log('Deleting crop from database:', cropId);
    
    // Example database delete operation
    // const response = await fetch(`/api/crops/${cropId}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   }
    // });
    
    // if (!response.ok) {
    //   throw new Error('Failed to delete crop from database');
    // }
    
    // return { success: true };
    
    // For now, return success (will be implemented later)
    return { success: true };
  } catch (error) {
    console.error('Database delete error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Update crop in database
export const updateCropInDatabase = async (cropId: string, cropData: Partial<CropData>): Promise<{ success: boolean; data?: any; error?: string }> => {
  try {
    // TODO: Implement database update operation
    console.log('Updating crop in database:', cropId, cropData);
    
    // Example database update operation
    // const response = await fetch(`/api/crops/${cropId}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(cropData)
    // });
    
    // if (!response.ok) {
    //   throw new Error('Failed to update crop in database');
    // }
    
    // const result = await response.json();
    // return { success: true, data: result };
    
    // For now, return success (will be implemented later)
    return { success: true, data: cropData };
  } catch (error) {
    console.error('Database update error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
};

// Database configuration
export const DATABASE_CONFIG = {
  MONGODB: {
    URI: import.meta.env.VITE_MONGODB_URI || 'mongodb://localhost:27017/achhadam',
    DATABASE: 'achhadam',
    COLLECTIONS: {
      CROPS: 'crops',
      IMAGES: 'images',
      FARMERS: 'farmers'
    }
  },
  POSTGRESQL: {
    URI: import.meta.env.VITE_POSTGRESQL_URI || 'postgresql://localhost:5432/achhadam',
    DATABASE: 'achhadam',
    TABLES: {
      CROPS: 'crops',
      IMAGES: 'images',
      FARMERS: 'farmers'
    }
  },
  CLOUD_STORAGE: {
    PROVIDER: 'aws_s3', // or 'cloudinary', 'google_cloud', etc.
    BUCKET: import.meta.env.VITE_S3_BUCKET || 'achhadam-images',
    REGION: import.meta.env.VITE_S3_REGION || 'us-east-1'
  }
};

export type { CropData, ImageData };
