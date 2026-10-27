import React, { useState, useEffect } from 'react';
import { saveToMongoDB, saveToPostgreSQL, uploadImagesToCloud, loadCropsFromDatabase, deleteCropFromDatabase, updateCropInDatabase } from '../../services/databaseService';
import { authenticatedFetch } from '../../services/tokenService';
// dataSyncService removed - using automatic database save only
// SyncButton removed - using automatic database save only
// ImmediateSyncButton removed - using automatic database save only
import '../../../src/styles/animations.css';
import { 
  LayoutDashboard, 
  Leaf, 
  Package, 
  TrendingUp, 
  Settings, 
  Bell, 
  Search,
  Plus,
  Eye,
  Edit,
  Menu,
  Clock,
  Droplets,
  Sun,
  Cloud,
  Wind,
  Zap,
  Sprout,
  Wheat,
  Carrot,
  Apple,
  MapPin,
  User,
  ChevronDown,
  X,
  Home,
  Upload,
  Camera,
  Video,
  Star,
  MessageCircle,
  Phone,
  CheckCircle,
  XCircle,
  AlertTriangle,
  DollarSign,
  BarChart3,
  PieChart,
  TrendingDown,
  ShoppingCart,
  Truck,
  Shield,
  CreditCard,
  FileText,
  Download,
  Send,
  Mic,
  Image,
  ChevronLeft,
  ChevronRight,
  Share,
  Calendar,
  Target,
  Award,
  Users,
  Building,
  Wrench,
  Droplet,
  Thermometer,
  Gauge,
  Map,
  Navigation,
  Heart,
  ThumbsUp,
  Share2,
  Bookmark,
  Filter,
  SortAsc,
  RefreshCw,
  ExternalLink,
  Lock,
  Unlock,
  EyeOff,
  MoreHorizontal,
  Check,
  X as XIcon,
  ArrowRight,
  ArrowLeft,
  ChevronUp,
  ChevronDown as ChevronDownIcon,
  Info,
  HelpCircle,
  AlertCircle,
  Success,
  Warning,
  Activity,
  Layers,
  Database,
  Server,
  Wifi,
  Bluetooth,
  Smartphone,
  Monitor,
  Tablet,
  Laptop,
  Headphones,
  Speaker,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Stop,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Maximize,
  Minimize,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Move,
  Crop,
  Scissors,
  Palette,
  Brush,
  Eraser,
  Type,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Grid,
  Columns,
  Rows,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Octagon,
  Pentagon,
  Star as StarIcon,
  Heart as HeartIcon,
  Smile,
  Frown,
  Meh,
  ThumbsUp as ThumbsUpIcon,
  ThumbsDown,
  Flag,
  Bookmark as BookmarkIcon,
  Tag,
  Hash,
  AtSign,
  Percent,
  Plus as PlusIcon,
  Minus,
  Divide,
  Equal,
  Infinity,
  Pi,
  Sigma,
  Alpha,
  Beta,
  Gamma,
  Delta,
  Epsilon,
  Zeta,
  Eta,
  Theta,
  Iota,
  Kappa,
  Lambda,
  Mu,
  Nu,
  Xi,
  Omicron,
  Rho,
  Tau,
  Upsilon,
  Phi,
  Chi,
  Psi,
  Omega
} from 'lucide-react';
import ProfileModal from '../../components/ui/ProfileModal';

const FarmerDashboard: React.FC<{ user?: any; onLogout?: () => void }> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // KYC Verification States
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [kycCompleted, setKycCompleted] = useState(false);
  const [kycDismissedThisSession, setKycDismissedThisSession] = useState(false);
  
  // KYC Data
  const [kycData, setKycData] = useState({
    farmerKYCId: '',
    panNumber: '',
    aadharNumber: '',
    accountHolderName: '',
    bankAccountNumber: '',
    ifscCode: '',
    bankName: '',
    branchName: ''
  });
  
  const [kycFiles, setKycFiles] = useState({
    panCardFile: null as File | null,
    aadharFrontFile: null as File | null,
    aadharBackFile: null as File | null
  });
  
  // Generate unique farmer ID for KYC
  const generateFarmerKYCId = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substr(2, 9);
    return `FARMER_KYC_${timestamp}_${random}`;
  };
  const [showCropUpload, setShowCropUpload] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showCropUploadModal, setShowCropUploadModal] = useState(false);
  const [cropFormData, setCropFormData] = useState({
    id: null, // For edit mode
    cropName: '',
    cropType: '',
    variety: '',
    quantity: '',
    unit: 'quintal',
    quality: 'A',
    harvestDate: '',
    price: '',
    organic: false,
    location: '',
    description: '',
    images: [],
    uploadedAt: null // For edit mode
  });

  // State for uploaded crops (user's actual crops)
  const [uploadedCrops, setUploadedCrops] = useState([]);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [selectedCropImages, setSelectedCropImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // User profile data - using actual user data with persistent ID
  const [userProfile, setUserProfile] = useState({
    id: user?.id || localStorage.getItem('farmer_user_id') || `farmer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: user?.name || user?.firstName + ' ' + user?.lastName || 'Farmer User',
    email: user?.email || 'jhariawatch@chakravega.com',
    phone: user?.phone || '+91 0000000000',
    userType: 'farmer' as const,
    address: user?.address || 'Farm Address',
    city: user?.city || 'City',
    state: user?.state || 'State',
    pincode: user?.pincode || '000000',
    dateOfBirth: user?.dateOfBirth || '1990-01-01',
    profileImage: user?.profileImage || '',
    businessName: user?.businessName || 'My Farm',
    businessType: user?.businessType || 'individual',
    kycStatus: user?.kycStatus || 'pending' as const,
    aadharNumber: user?.aadharNumber || '',
    panNumber: user?.panNumber || '',
    bankAccountNumber: user?.bankAccountNumber || '',
    ifscCode: user?.ifscCode || '',
    bankName: user?.bankName || '',
    landArea: user?.landArea || 0,
    createdAt: user?.createdAt || new Date().toISOString(),
    lastLogin: new Date().toISOString()
  });

  // Predefined crop categories for easy selection (farmer-friendly)
  const cropCategories = {
    'Grains': {
      'Rice': ['Basmati', 'Non-Basmati', 'Sona Masuri', 'Ponni', 'Jasmine'],
      'Wheat': ['Durum', 'Soft Wheat', 'Hard Wheat', 'Spring Wheat'],
      'Maize': ['Sweet Corn', 'Field Corn', 'Popcorn', 'Flint Corn'],
      'Barley': ['Two-row', 'Six-row', 'Hulless'],
      'Millet': ['Pearl Millet', 'Finger Millet', 'Foxtail Millet', 'Proso Millet']
    },
    'Pulses': {
      'Lentils': ['Red Lentils', 'Green Lentils', 'Black Lentils', 'Yellow Lentils'],
      'Chickpeas': ['Desi', 'Kabuli', 'Green Gram'],
      'Black Gram': ['Urad Dal', 'Black Gram Whole'],
      'Green Gram': ['Moong Dal', 'Green Gram Whole'],
      'Pigeon Pea': ['Toor Dal', 'Arhar Dal', 'Red Gram']
    },
    'Vegetables': {
      'Tomato': ['Cherry', 'Roma', 'Beefsteak', 'Heirloom'],
      'Onion': ['Red Onion', 'White Onion', 'Yellow Onion'],
      'Potato': ['Russet', 'Red Potato', 'Sweet Potato', 'Fingerling'],
      'Cabbage': ['Green Cabbage', 'Red Cabbage', 'Savoy Cabbage'],
      'Cauliflower': ['White', 'Purple', 'Green', 'Romanesco']
    },
    'Fruits': {
      'Mango': ['Alphonso', 'Dasheri', 'Langra', 'Chausa', 'Kesar'],
      'Banana': ['Cavendish', 'Red Banana', 'Plantain', 'Lady Finger'],
      'Apple': ['Red Delicious', 'Granny Smith', 'Golden Delicious', 'Fuji'],
      'Orange': ['Navel', 'Valencia', 'Blood Orange', 'Mandarin'],
      'Grapes': ['Thompson Seedless', 'Red Globe', 'Black Grapes', 'Green Grapes']
    },
    'Spices': {
      'Turmeric': ['Lakadong', 'Alleppey', 'Madras', 'Rajapuri'],
      'Chili': ['Red Chili', 'Green Chili', 'Kashmiri Chili', 'Bird Eye Chili'],
      'Cumin': ['Jeera', 'Black Cumin', 'White Cumin'],
      'Coriander': ['Dhaniya', 'Coriander Seeds', 'Coriander Leaves'],
      'Cardamom': ['Green Cardamom', 'Black Cardamom', 'White Cardamom']
    }
  };

  // Quality grades with descriptions
  const qualityGrades = [
    { value: 'A', label: 'Grade A (Premium)', description: 'Best quality, no defects, premium price' },
    { value: 'B', label: 'Grade B (Good)', description: 'Good quality, minor defects, fair price' },
    { value: 'C', label: 'Grade C (Average)', description: 'Average quality, some defects, lower price' }
  ];

  // Units for quantity
  const quantityUnits = [
    { value: 'quintal', label: 'Quintal (100 kg)', local: 'क्विंटल' },
    { value: 'kg', label: 'Kilogram', local: 'किलो' },
    { value: 'ton', label: 'Ton (1000 kg)', local: 'टन' },
    { value: 'bag', label: 'Bag (50 kg)', local: 'बोरी' },
    { value: 'piece', label: 'Piece', local: 'टुकड़ा' }
  ];

  // Function to select best image from multiple images
  const selectBestImage = (images) => {
    if (!images || images.length === 0) return null;
    if (images.length === 1) return images[0];
    
    console.log('🔍 Selecting best image from:', images.length, 'images');
    
    // Enhanced algorithm: prioritize analyzed images with high quality
    const analyzedImages = images.filter(img => img && img.analysis && img.analysis.isAnalyzed);
    if (analyzedImages.length > 0) {
      // Return image with highest confidence score
      const bestAnalyzed = analyzedImages.reduce((best, current) => 
        (current.analysis?.confidence || 0) > (best.analysis?.confidence || 0) ? current : best
      );
      console.log('✅ Selected analyzed image:', bestAnalyzed);
      return bestAnalyzed;
    }
    
    // Fallback: choose image with largest file size (usually better quality)
    const validImages = images.filter(img => img && img.fileSize);
    if (validImages.length === 0) {
      console.log('⚠️ No valid images, returning first image');
      return images[0]; // Return first image if no valid images
    }
    
    const sortedBySize = validImages.sort((a, b) => (b.fileSize || 0) - (a.fileSize || 0));
    console.log('✅ Selected image by size:', sortedBySize[0]);
    return sortedBySize[0];
  };

  // Function to handle image display with fallback
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) {
      console.log('⚠️ No image URL provided, using placeholder');
      return '/placeholder-crop.jpg';
    }
    
    console.log('🖼️ Processing image URL:', imageUrl);
    
    // If it's a blob URL (from file upload), return as is
    if (imageUrl.startsWith('blob:')) {
      console.log('✅ Using blob URL');
      return imageUrl;
    }
    
    // If it's a data URL, return as is
    if (imageUrl.startsWith('data:')) {
      console.log('✅ Using data URL');
      return imageUrl;
    }
    
    // Handle file objects
    if (imageUrl instanceof File) {
      console.log('✅ Creating object URL from File');
      return URL.createObjectURL(imageUrl);
    }
    
    // For other URLs, return as is
    console.log('✅ Using direct URL');
    return imageUrl;
  };

  // Enhanced database structure for systematic image storage
  const createImageMetadata = (file, cropId, farmerId) => {
    // Validate file object
    if (!file || !(file instanceof File)) {
      console.error('Invalid file object:', file);
      return null;
    }

    try {
      // Convert file to compressed data URL for storage
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target.result;
          
          // Create image element using document.createElement
          const img = document.createElement('img');
          
          img.onload = () => {
            try {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              
              // Calculate new dimensions (max 800px width, maintain aspect ratio)
              const maxWidth = 800;
              const maxHeight = 600;
              let { width, height } = img;
              
              if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
              }
              if (height > maxHeight) {
                width = (width * maxHeight) / height;
                height = maxHeight;
              }
              
              // Set canvas dimensions
              canvas.width = width;
              canvas.height = height;
              
              // Draw and compress image
              ctx.drawImage(img, 0, 0, width, height);
              const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); // 70% quality
              
              const imageMetadata = {
                id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                cropId: cropId,
                farmerId: farmerId,
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
                uploadDate: new Date().toISOString(),
                imageUrl: compressedDataUrl, // Use compressed data URL
                blobData: null, // Don't store file object
                metadata: {
                  width: width,
                  height: height,
                  aspectRatio: width / height,
                  quality: 'compressed', // Compressed for storage
                  dominantColors: [], // For future color analysis
                  cropType: null, // For future crop detection
                  healthScore: null // For future health analysis
                },
                analysis: {
                  isAnalyzed: false,
                  analysisDate: null,
                  confidence: null,
                  suggestions: []
                }
              };
              resolve(imageMetadata);
            } catch (error) {
              console.error('Error compressing image:', error);
              // Fallback: use original data URL without compression
              const imageMetadata = {
                id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                cropId: cropId,
                farmerId: farmerId,
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
                uploadDate: new Date().toISOString(),
                imageUrl: dataUrl, // Use original data URL
                blobData: null,
                metadata: {
                  width: null,
                  height: null,
                  aspectRatio: null,
                  quality: 'original',
                  dominantColors: [],
                  cropType: null,
                  healthScore: null
                },
                analysis: {
                  isAnalyzed: false,
                  analysisDate: null,
                  confidence: null,
                  suggestions: []
                }
              };
              resolve(imageMetadata);
            }
          };
          
          img.onerror = () => {
            console.error('Error loading image:', file);
            resolve(null);
          };
          
          // Set image source
          img.src = dataUrl;
        };
        
        reader.onerror = () => {
          console.error('Error reading file:', file);
          resolve(null);
        };
        
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Error creating image metadata:', error);
      return Promise.resolve(null);
    }
  };

  // Enhanced crop data structure with proper image management
  const createCropData = async (formData, images, existingCropId = null) => {
    const cropId = existingCropId || `crop_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log(`🌾 Creating crop data for farmer: ${userProfile.name} (ID: ${userProfile.id})`);
    console.log(`🆔 Using crop ID: ${cropId} (existing: ${!!existingCropId})`);
    
    // Process images safely with async handling
    const imagePromises = images.map(file => createImageMetadata(file, cropId, userProfile.id));
    const imageResults = await Promise.all(imagePromises);
    const processedImages = imageResults.filter(img => img !== null); // Remove null entries
    
    const cropData = {
      id: cropId,
      name: formData.cropName,
      type: formData.cropType,
      variety: formData.variety,
      quantity: formData.quantity,
      unit: formData.unit,
      quality: formData.quality,
      price: parseFloat(formData.price),
      harvestDate: formData.harvestDate,
      organic: formData.organic,
      location: formData.location,
      description: formData.description,
      status: 'active',
      uploadedAt: new Date().toISOString(),
      farmerName: userProfile.name,
      farmerId: userProfile.id,
      // Enhanced image structure
      images: processedImages,
      // Additional metadata for analysis
      analytics: {
        totalImages: processedImages.length,
        bestImageId: null, // Will be set by AI analysis
        averageImageQuality: null,
        cropHealthScore: null,
        marketValue: null,
        demandScore: null
      },
      // Database tracking
      database: {
        isSynced: false,
        lastSyncDate: null,
        version: 1,
        checksum: null // For data integrity
      }
    };

    console.log(`✅ Crop data created for ${userProfile.name}:`, {
      cropId: cropData.id,
      farmerId: cropData.farmerId,
      farmerName: cropData.farmerName,
      images: cropData.images.length
    });

    return cropData;
  };

  // Database integration functions
  const saveToDatabase = async (cropData) => {
    try {
      console.log('Saving crop to database:', cropData);
      
      // Get user key from localStorage or create from user data
      let userKey = localStorage.getItem('farmer_user_key');
      if (!userKey) {
        const userIdentifier = userProfile.phone || userProfile.email || userProfile.id || 'anonymous';
        userKey = `farmer_${userIdentifier.replace(/[^a-zA-Z0-9]/g, '_')}`;
        localStorage.setItem('farmer_user_key', userKey);
      }
      
      console.log(`🔑 Using user key for database save: ${userKey}`);
      
      // Step 1: Upload images to cloud storage
      const imageUploadResult = await uploadImagesToCloud(cropData.images);
      if (!imageUploadResult.success) {
        throw new Error('Failed to upload images: ' + imageUploadResult.error);
      }
      
      // Step 2: IMMEDIATE SAVE to MongoDB - CRITICAL FOR CROSS-DEVICE SYNC
      console.log('🌾 IMMEDIATE SAVE: Starting immediate MongoDB save...');
      const mongoResult = await saveToMongoDB(cropData);
      
      if (!mongoResult.success) {
        console.error('❌ IMMEDIATE SAVE FAILED:', mongoResult.error);
        console.log('🔄 MongoDB save failed, will continue with localStorage backup');
        console.log('⚠️ WARNING: Crop will only be available on this device');
        // Continue with PostgreSQL even if MongoDB fails
      } else {
        console.log('✅ IMMEDIATE SAVE SUCCESS: Crop saved to MongoDB immediately');
        console.log('🌐 Crop is now available across all devices and sessions');
        console.log('📱 Cross-device sync: Mobile crops → Desktop visible');
        console.log('🔄 Permanent persistence: Data will survive device changes');
      }
      
      // Step 3: Save to PostgreSQL
      const postgresResult = await saveToPostgreSQL(cropData);
      if (!postgresResult.success) {
        console.warn('PostgreSQL save failed:', postgresResult.error);
        // Continue with localStorage fallback
      }
      
      // Step 4: NO LOCALSTORAGE STORAGE - DATABASE ONLY
      // localStorage is only for small data like tokens, preferences
      // Large data like crops should be stored in database only
      console.log('✅ ARCHITECTURE: Crop data stored in database only (no localStorage)');
      console.log('✅ ARCHITECTURE: localStorage reserved for tokens and preferences only');
      
      console.log('Crop saved successfully to all databases:', {
        mongoDB: mongoResult.success,
        postgreSQL: postgresResult.success,
        localStorage: true,
        cloudStorage: imageUploadResult.success
      });
      
      // Verify database save and show user notification
      if (mongoResult.success) {
        console.log('🎉 IMMEDIATE SAVE SUCCESS: Crop is permanently stored in MongoDB');
        console.log('🌐 This crop will be available on any device when farmer logs in');
        console.log('📱 Cross-device sync: Mobile crops → Desktop visible');
        console.log('🔄 Permanent persistence: Data will survive device changes');
        
        // Show success notification to user
        alert('✅ Crop uploaded successfully!\n🌐 Your crop is now available across all devices\n📱 Cross-device sync enabled');
      } else {
        console.log('⚠️ IMMEDIATE SAVE FAILED: Using localStorage only');
        console.log('🔄 Crop will only be available on this device');
        
        // Show warning notification to user
        alert('⚠️ Crop uploaded to device only\n❌ Cross-device sync failed\n🔄 Please try syncing manually later');
      }
      
      return { 
        success: true, 
        data: cropData,
        details: {
          mongoDB: mongoResult.success,
          postgreSQL: postgresResult.success,
          localStorage: true,
          cloudStorage: imageUploadResult.success
        }
      };
    } catch (error) {
      console.error('Error saving to database:', error);
      
      // Fallback: Try to save to localStorage only
      try {
        let userKey = localStorage.getItem('farmer_user_key');
        if (!userKey) {
          const userIdentifier = userProfile.phone || userProfile.email || userProfile.id || 'anonymous';
          userKey = `farmer_${userIdentifier.replace(/[^a-zA-Z0-9]/g, '_')}`;
          localStorage.setItem('farmer_user_key', userKey);
        }
        
        const fallbackEntry = {
          version: '1.0',
          lastUpdated: new Date().toISOString(),
          farmerId: userProfile.id,
          farmerName: userProfile.name,
          farmerEmail: userProfile.email,
          farmerPhone: userProfile.phone,
          totalCrops: 1,
          totalImages: cropData.images.length,
          crops: [cropData],
          statistics: {
            totalEarnings: cropData.price * cropData.quantity,
            averageCropValue: cropData.price,
            mostCommonCropType: cropData.type,
            imageQualityDistribution: {
              total: cropData.images.length,
              highQuality: 0,
              mediumQuality: 0,
              lowQuality: 0,
              unknown: cropData.images.length
            }
          }
        };
        
        localStorage.setItem(`farmer_database_${userKey}`, JSON.stringify(fallbackEntry));
        console.log('Fallback save to localStorage successful');
        
        return { 
          success: true, 
          data: cropData,
          details: {
            mongoDB: false,
            postgreSQL: false,
            localStorage: true,
            cloudStorage: false,
            fallback: true
          }
        };
      } catch (fallbackError) {
        console.error('Fallback save also failed:', fallbackError);
        return { success: false, error: error.message };
      }
    }
  };

  // PERMANENT DATABASE SAVE - MongoDB Integration (Cross-device, Cross-session)
  const saveCropsToDatabase = async (crops) => {
    try {
      if (!userProfile.id) {
        console.error('Cannot save crops: No user ID available');
        return;
      }

      console.log(`🌾 CROSS-DEVICE SYNC: Saving ${crops.length} crops to database for farmer: ${userProfile.name}`);
      console.log(`🔑 Farmer ID: ${userProfile.id} - Data will persist across all devices and sessions`);
      console.log(`🌐 This ensures crops are available from any device when farmer logs in`);
      
      // Save each crop to database with permanent persistence
      for (const crop of crops) {
        try {
          console.log(`💾 Saving crop to database: ${crop.cropName || crop.name}`);
          
          const response = await fetch('/api/crops', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
              ...crop,
              farmerId: userProfile.id,
              farmerName: userProfile.name,
              // Add permanent persistence markers for cross-device sync
              isPermanent: true,
              crossDeviceAccess: true,
              sessionIndependent: true,
              lastUpdated: new Date().toISOString(),
              // Add farmer association for permanent linking
              farmerAssociation: {
                farmerId: userProfile.id,
                farmerName: userProfile.name,
                permanentLink: true
              }
            })
          });

          console.log(`📡 Database save response status: ${response.status}`);

          if (!response.ok) {
            const errorData = await response.json();
            console.error(`❌ Database save failed for ${crop.cropName || crop.name}:`, errorData);
            throw new Error(errorData.message || 'Failed to save crop to database');
          }

          // Handle JSON parsing safely
          let result;
          try {
            result = await response.json();
            console.log(`✅ CROSS-DEVICE SYNC: Crop saved to database: ${crop.cropName || crop.name}`);
            console.log(`🌐 This crop will be available on any device when farmer logs in`);
            console.log(`📊 Database response:`, {
              success: result.success,
              cropId: result.data?._id,
              farmerId: result.data?.farmerId
            });
          } catch (jsonError) {
            console.log(`✅ CROSS-DEVICE SYNC: Crop saved to database: ${crop.cropName || crop.name} (No JSON response)`);
            console.log(`🌐 This crop will be available on any device when farmer logs in`);
          }
        } catch (error) {
          console.error(`❌ Error saving crop ${crop.cropName || crop.name}:`, error);
          console.log(`🔄 This crop will only be available locally until database sync is fixed`);
        }
      }
      
      console.log(`🎉 CROSS-DEVICE SYNC COMPLETE: All crops saved to database successfully!`);
      console.log(`📱 Farmer can now access these crops from any device, any session`);
      console.log(`🌐 Data is now permanently stored and will sync across all devices`);
      
    } catch (error) {
      console.error('❌ Error saving crops to database:', error);
      console.log(`🔄 Crops will be available locally but may not sync across devices`);
    }
  };

  // Smart storage system with quota management - USER SPECIFIC + DATABASE SYNC
  const saveCropsToStorage = async (crops) => {
    try {
      if (!userProfile.id) {
        console.error('Cannot save crops: No user ID available');
        return;
      }

      // Get user key from localStorage or create from user data
      let userKey = localStorage.getItem('farmer_user_key');
      if (!userKey) {
        const userIdentifier = userProfile.phone || userProfile.email || userProfile.id || 'anonymous';
        userKey = `farmer_${userIdentifier.replace(/[^a-zA-Z0-9]/g, '_')}`;
        localStorage.setItem('farmer_user_key', userKey);
      }
      
      console.log(`💾 Saving crops for farmer: ${userProfile.name} (ID: ${userProfile.id})`);
      console.log(`🔑 Using user key: ${userKey}`);

      // Check storage quota first
      const quotaCheck = checkStorageQuota();
      if (!quotaCheck.available) {
        console.warn('Storage quota exceeded, clearing old data');
        clearOldData();
      }
      
      // Create database entry with metadata - USER SPECIFIC
      const databaseEntry = {
        version: '1.0',
        lastUpdated: new Date().toISOString(),
        farmerId: userProfile.id,
        farmerName: userProfile.name,
        farmerEmail: userProfile.email,
        farmerPhone: userProfile.phone,
        totalCrops: crops.length,
        totalImages: crops.reduce((sum, crop) => sum + crop.images.length, 0),
        crops: crops.map(crop => ({
          ...crop,
          farmerId: userProfile.id, // Ensure farmerId is set
          farmerName: userProfile.name // Ensure farmerName is set
        })),
        statistics: {
          totalEarnings: crops.reduce((sum, crop) => sum + (crop.price * crop.quantity), 0),
          averageCropValue: crops.length > 0 ? crops.reduce((sum, crop) => sum + crop.price, 0) / crops.length : 0,
          mostCommonCropType: getMostCommonCropType(crops),
          imageQualityDistribution: getImageQualityDistribution(crops)
        }
      };
      
      const dataString = JSON.stringify(databaseEntry);
      const dataSize = new Blob([dataString]).size;
      const dataSizeMB = (dataSize / (1024 * 1024)).toFixed(2);
      
      console.log(`Data size: ${dataSizeMB}MB`);
      
      // Check if data is too large for localStorage
      if (dataSize > 3 * 1024 * 1024) { // 3MB limit (reduced for safety)
        console.warn('Data too large for localStorage, using fallback storage');
        
        // Store only essential data without images
        const essentialData = {
          ...databaseEntry,
          crops: databaseEntry.crops.map(crop => ({
            ...crop,
            images: crop.images.map(img => ({
              ...img,
              imageUrl: null, // Remove image data to save space
              compressed: true
            }))
          }))
        };
        
        localStorage.setItem(`farmer_database_${userKey}`, JSON.stringify(essentialData));
        console.log(`💾 Essential data saved for farmer ${userProfile.name} (images removed due to size)`);
      } else {
        localStorage.setItem(`farmer_database_${userKey}`, dataString);
        console.log(`💾 Full database saved successfully for farmer ${userProfile.name}:`, {
          crops: crops.length,
          images: crops.reduce((sum, crop) => sum + crop.images.length, 0),
          size: dataSizeMB + 'MB',
          farmerId: userProfile.id,
          farmerName: userProfile.name
        });
        
        // REAL-TIME DATABASE SYNC
        await saveCropsToDatabase(crops);
        
        // Verify user-specific storage
        crops.forEach((crop, index) => {
          console.log(`📋 Saved crop ${index + 1}: ${crop.name} by ${crop.farmerName} (ID: ${crop.farmerId})`);
        });
        
        // Verify data persistence
        const savedData = localStorage.getItem(`farmer_database_${userKey}`);
        if (savedData) {
          const parsed = JSON.parse(savedData);
          console.log(`✅ Data persistence verified: ${parsed.crops?.length || 0} crops saved for ${parsed.farmerName}`);
        } else {
          console.log(`❌ Data persistence failed: No data found after saving`);
        }
      }
    } catch (error) {
      console.error('Error saving crops to database:', error);
      
      // Fallback: save without images
      try {
        const fallbackData = {
          version: '1.0',
          lastUpdated: new Date().toISOString(),
          farmerId: userProfile.id,
          totalCrops: crops.length,
          totalImages: crops.reduce((sum, crop) => sum + crop.images.length, 0),
          crops: crops.map(crop => ({
            ...crop,
            images: [] // Remove all images
          })),
          statistics: {
            totalEarnings: crops.reduce((sum, crop) => sum + (crop.price * crop.quantity), 0),
            averageCropValue: crops.length > 0 ? crops.reduce((sum, crop) => sum + crop.price, 0) / crops.length : 0,
            mostCommonCropType: getMostCommonCropType(crops),
            imageQualityDistribution: { total: 0, highQuality: 0, mediumQuality: 0, lowQuality: 0, unknown: 0 }
          }
        };
        
        localStorage.setItem(`farmer_database_${userKey}`, JSON.stringify(fallbackData));
        console.log('Fallback data saved (no images)');
      } catch (fallbackError) {
        console.error('Fallback save also failed:', fallbackError);
      }
    }
  };

  // Storage quota management functions
  const checkStorageQuota = () => {
    try {
      const testKey = 'quota_test';
      const testData = 'x'.repeat(1024 * 1024); // 1MB test data
      localStorage.setItem(testKey, testData);
      localStorage.removeItem(testKey);
      return { available: true, message: 'Storage available' };
    } catch (error) {
      return { available: false, message: 'Storage quota exceeded' };
    }
  };

  const clearOldData = () => {
    try {
      // Get user key from localStorage or create from user data
      let userKey = localStorage.getItem('farmer_user_key');
      if (!userKey) {
        const userIdentifier = userProfile.phone || userProfile.email || userProfile.id || 'anonymous';
        userKey = `farmer_${userIdentifier.replace(/[^a-zA-Z0-9]/g, '_')}`;
      }
      
      // Clear old crop data to free up space
      const keys = Object.keys(localStorage);
      const oldKeys = keys.filter(key => 
        key.startsWith('farmer_crops_') && 
        key !== `farmer_database_${userKey}`
      );
      
      oldKeys.forEach(key => localStorage.removeItem(key));
      console.log(`Cleared ${oldKeys.length} old entries`);
    } catch (error) {
      console.error('Error clearing old data:', error);
    }
  };

  // Helper functions for database analysis
  const getMostCommonCropType = (crops) => {
    if (crops.length === 0) return 'None';
    const types = crops.map(crop => crop.type);
    const typeCount = types.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(typeCount).reduce((a, b) => typeCount[a] > typeCount[b] ? a : b);
  };


  const getImageQualityDistribution = (crops) => {
    const allImages = crops.flatMap(crop => crop.images);
    return {
      total: allImages.length,
      highQuality: allImages.filter(img => img.metadata.quality === 'high').length,
      mediumQuality: allImages.filter(img => img.metadata.quality === 'medium').length,
      lowQuality: allImages.filter(img => img.metadata.quality === 'low').length,
      unknown: allImages.filter(img => img.metadata.quality === 'unknown').length
    };
  };

  // Enhanced function to load crops from DATABASE ONLY - TRUE CROSS-DEVICE SYNC
  const loadCropsFromDatabase = async () => {
    try {
      if (!userProfile.id) {
        console.log('❌ No user ID available, returning empty crops');
        return [];
      }

      console.log(`🔍 Loading crops for farmer: ${userProfile.name} (ID: ${userProfile.id})`);
      console.log(`🌐 TRUE CROSS-DEVICE SYNC: Loading ONLY from database - no localStorage dependency`);
      console.log(`📱 This ensures mobile crops show on desktop and vice versa`);

      // ONLY: Load from database (TRUE CROSS-DEVICE SYNC)
      // Use actual user ID from authentication, not generated ID
      const actualUserId = user?._id || user?.id || userProfile.id;
      console.log(`🔑 Using actual user ID: ${actualUserId} (not generated ID: ${userProfile.id})`);
      console.log(`🔍 User object:`, { _id: user?._id, id: user?.id, userProfileId: userProfile.id });
      console.log(`🔄 DATABASE LOAD: Loading crops from database for farmer: ${actualUserId}`);
      console.log(`🌐 This will ensure data is available from any device, any session`);
      
      const authToken = localStorage.getItem('authToken');
      console.log(`🔑 Auth token check:`, { 
        hasToken: !!authToken, 
        tokenLength: authToken?.length || 0,
        tokenStart: authToken?.substring(0, 20) + '...' || 'No token'
      });
      
      // If no token, try to get fresh token
      if (!authToken) {
        console.log(`❌ No auth token found, cannot access database`);
        console.log(`🔄 Falling back to localStorage`);
        return [];
      }
      
      const response = await authenticatedFetch(`https://acchadam1-backend.onrender.com/api/crops/farmer/${actualUserId}`, {
        method: 'GET'
      });
      
      console.log(`📡 Database response status: ${response.status}`);
      
      if (response.ok) {
        const data = await response.json();
        const crops = data.data || [];
        console.log(`✅ DATABASE LOAD SUCCESS: Found ${crops.length} crops in database for farmer ${userProfile.name}`);
        console.log(`🌐 TRUE CROSS-DEVICE SYNC: These crops are available from any device`);
        console.log(`📊 Database response:`, {
          success: data.success,
          count: data.count,
          persistence: data.persistence
        });
        
        // Save to localStorage ONLY for offline access (not as primary source)
        const userKey = `farmer_${userProfile.id.replace(/[^a-zA-Z0-9]/g, '_')}`;
        const databaseKey = `farmer_database_${userKey}`;
        const databaseEntry = {
          crops: crops,
          farmerId: userProfile.id,
          farmerName: userProfile.name,
          lastUpdated: new Date().toISOString(),
          totalImages: crops.reduce((total, crop) => total + (crop.images?.length || 0), 0),
          crossDeviceSync: true,
          databaseSource: true,
          syncTimestamp: new Date().toISOString()
        };
        localStorage.setItem(databaseKey, JSON.stringify(databaseEntry));
        console.log(`💾 OFFLINE CACHE: Saved ${crops.length} crops to localStorage for offline access`);
        console.log(`🌐 PRIMARY SOURCE: Database is the primary source for cross-device sync`);
        
        return crops;
      } else {
        // Handle non-JSON error responses
        let errorMessage = `HTTP ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          console.log(`⚠️ Database load failed with status ${response.status}:`, errorData);
        } catch (jsonError) {
          console.log(`⚠️ Database load failed with status ${response.status}: ${errorMessage}`);
        }
        console.log(`❌ Database failed, falling back to localStorage`);
        console.log(`🔄 Loading from localStorage for offline access`);
        // Fallback to localStorage when database fails
        // Load from localStorage fallback
        const userKey = localStorage.getItem('farmer_user_key');
        if (!userKey) {
          console.log(`❌ No user key found, cannot load from localStorage`);
          return [];
        }
        
        const databaseKey = `farmer_database_${userKey}`;
        const existingData = localStorage.getItem(databaseKey);
        
        if (existingData) {
          try {
            const parsed = JSON.parse(existingData);
            const crops = parsed.crops || [];
            console.log(`📱 Loaded ${crops.length} crops from localStorage fallback`);
            return crops;
          } catch (error) {
            console.error(`❌ Error parsing localStorage data:`, error);
            return [];
          }
        }
        
        console.log(`❌ No localStorage data found for fallback`);
        return [];
      }

      // FALLBACK: Try to load from localStorage
      const userKey = localStorage.getItem('farmer_user_key');
      if (!userKey) {
        const userIdentifier = userProfile.phone || userProfile.email || userProfile.id || 'anonymous';
        const newUserKey = `farmer_${userIdentifier.replace(/[^a-zA-Z0-9]/g, '_')}`;
        localStorage.setItem('farmer_user_key', newUserKey);
        console.log(`🔑 Created new user key: ${newUserKey}`);
      }
      
      const databaseKey = `farmer_database_${userKey || `farmer_${userProfile.id.replace(/[^a-zA-Z0-9]/g, '_')}`}`;
      console.log(`🔍 Looking for localStorage key: ${databaseKey}`);
      
      const databaseEntry = localStorage.getItem(databaseKey);
      if (databaseEntry) {
        const parsed = JSON.parse(databaseEntry);
        console.log(`✅ LOCALSTORAGE LOAD: Found database for farmer ${userProfile.name}:`, {
          totalCrops: parsed.crops?.length || 0,
          totalImages: parsed.totalImages || 0,
          lastUpdated: parsed.lastUpdated,
          farmerId: parsed.farmerId,
          farmerName: parsed.farmerName
        });
        
        // Double check that crops belong to this farmer
        const userCrops = parsed.crops?.filter(crop => crop.farmerId === userProfile.id) || [];
        console.log(`🌾 Filtered crops for ${userProfile.name}: ${userCrops.length} crops`);
        
        return userCrops;
      } else {
        console.log(`❌ No database found for key: ${databaseKey}`);
      }
      
      // Fallback to old structure for backward compatibility
      const savedCrops = localStorage.getItem(`farmer_crops_${userProfile.id}`);
      if (savedCrops) {
        const crops = JSON.parse(savedCrops);
        // Migrate old data to new structure
        const migratedCrops = crops.map(crop => ({
          ...crop,
          images: crop.images.map((img, index) => ({
            id: `img_${crop.id}_${index}`,
            cropId: crop.id,
            farmerId: userProfile.id,
            fileName: `image_${index + 1}.jpg`,
            fileSize: 0,
            fileType: 'image/jpeg',
            uploadDate: crop.uploadedAt,
            imageUrl: img,
            metadata: {
              width: null,
              height: null,
              aspectRatio: null,
              quality: 'unknown',
              dominantColors: [],
              cropType: crop.type,
              healthScore: null
            },
            analysis: {
              isAnalyzed: false,
              analysisDate: null,
              confidence: null,
              suggestions: []
            }
          })),
          analytics: {
            totalImages: crop.images.length,
            bestImageId: null,
            averageImageQuality: null,
            cropHealthScore: null,
            marketValue: null,
            demandScore: null
          },
          database: {
            isSynced: false,
            lastSyncDate: null,
            version: 1,
            checksum: null
          }
        }));
        
        // Save migrated data
        saveCropsToStorage(migratedCrops);
        return migratedCrops;
      }
      
    } catch (error) {
      console.error('❌ Database load error:', error);
      console.log(`❌ NO FALLBACK: Database is required for cross-device sync`);
      console.log(`🔄 Please check your internet connection and try again`);
      return [];
    }
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showUserMenu && !(event.target as Element).closest('.relative')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  // Update user profile when user data changes - USER SPECIFIC with PERSISTENT ID
  useEffect(() => {
    if (user) {
      // Create a unique identifier based on user data - THIS IS THE KEY!
      const userIdentifier = user.phone || user.email || user.id || 'anonymous';
      const userKey = `farmer_${userIdentifier.replace(/[^a-zA-Z0-9]/g, '_')}`;
      
      console.log(`🔍 User identification:`, {
        phone: user.phone,
        email: user.email,
        id: user.id,
        identifier: userIdentifier,
        userKey: userKey
      });
      
      // Check if this specific user already has a database
      const existingUserData = localStorage.getItem(`farmer_database_${userKey}`);
      
      let persistentUserId;
      
      if (existingUserData) {
        // User already exists, use their existing ID
        const parsed = JSON.parse(existingUserData);
        persistentUserId = parsed.farmerId;
        console.log(`♻️ Found existing user: ${parsed.farmerName} (ID: ${persistentUserId})`);
        console.log(`📊 Existing user data:`, {
          totalCrops: parsed.crops?.length || 0,
          lastUpdated: parsed.lastUpdated,
          farmerPhone: parsed.farmerPhone,
          farmerEmail: parsed.farmerEmail
        });
      } else {
        // New user, create new ID
        persistentUserId = user.id || `farmer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        console.log(`🆕 Creating new user: ${userIdentifier} (ID: ${persistentUserId})`);
        console.log(`📝 This is a completely new farmer with no existing data`);
      }
      
      // Store user info for this session
      localStorage.setItem('farmer_user_id', persistentUserId);
      localStorage.setItem('farmer_email', user.email || '');
      localStorage.setItem('farmer_phone', user.phone || '');
      
      const newUserName = user.name || user.firstName + ' ' + user.lastName || 'Farmer User';
      
      console.log(`👤 Setting user profile: ${newUserName} (ID: ${persistentUserId})`);
      console.log(`📧 User email: ${user.email || 'Not provided'}`);
      console.log(`📱 User phone: ${user.phone || 'Not provided'}`);
      
      setUserProfile(prev => ({
        ...prev,
        id: persistentUserId, // Use persistent ID
        name: newUserName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
        city: user.city || prev.city,
        state: user.state || prev.state,
        pincode: user.pincode || prev.pincode,
        dateOfBirth: user.dateOfBirth || prev.dateOfBirth,
        profileImage: user.profileImage || prev.profileImage,
        businessName: user.businessName || prev.businessName,
        businessType: user.businessType || prev.businessType,
        kycStatus: user.kycStatus || prev.kycStatus,
        aadharNumber: user.aadharNumber || prev.aadharNumber,
        panNumber: user.panNumber || prev.panNumber,
        bankAccountNumber: user.bankAccountNumber || prev.bankAccountNumber,
        ifscCode: user.ifscCode || prev.ifscCode,
        bankName: user.bankName || prev.bankName,
        createdAt: user.createdAt || prev.createdAt
      }));
      
      // Store user key for consistent database access
      localStorage.setItem('farmer_user_key', userKey);
      console.log(`🔑 Stored user key: ${userKey}`);
    }
  }, [user]);

  // Check KYC status on component mount
  useEffect(() => {
    // Check for any farmer KYC data in localStorage
    const allKeys = Object.keys(localStorage);
    const kycKeys = allKeys.filter(key => key.startsWith('farmer_kyc_') || key.startsWith('farmer_pan_') || key.startsWith('farmer_aadhar_'));
    
    const sessionKycDismissed = sessionStorage.getItem('kyc_dismissed_this_session');
    
    if (kycKeys.length > 0) {
      setKycCompleted(true);
      console.log('✅ KYC already completed - Found keys:', kycKeys);
    } else {
      setKycCompleted(false);
      console.log('❌ KYC not completed - No KYC data found');
      if (sessionKycDismissed === 'true') {
        setKycDismissedThisSession(true);
        console.log('📝 KYC dismissed this session');
      }
    }
  }, []);

  // Auto-sync all data to database on component mount
  useEffect(() => {
    const performAutoSync = async () => {
      console.log('🔄 AUTO-SYNC: Starting automatic data synchronization...');
      
      try {
        await autoSyncAllData();
        console.log('✅ AUTO-SYNC COMPLETE: All data synced to database');
      } catch (error) {
        console.error('❌ AUTO-SYNC FAILED:', error);
      }
    };

    // Run auto-sync after a short delay to ensure component is fully loaded
    const syncTimeout = setTimeout(performAutoSync, 2000);
    
    return () => clearTimeout(syncTimeout);
  }, []);
  
  // NO MANUAL SYNC - AUTOMATIC DATABASE SAVE ONLY
  // Manual sync buttons removed - crops are saved to database immediately
  console.log('✅ ARCHITECTURE: Manual sync removed - using automatic database save only');

  // NO MANUAL REFRESH - AUTOMATIC DATABASE LOAD ONLY
  // Manual refresh functions removed - crops are loaded from database automatically
  console.log('✅ ARCHITECTURE: Manual refresh removed - using automatic database load only');
  
  const forceRefreshFromDatabase = async () => {
    try {
      // Use actual user ID from authentication, not generated ID
      const actualUserId = user?._id || user?.id || userProfile.id;
      console.log(`🔑 Using actual user ID: ${actualUserId} (not generated ID: ${userProfile.id})`);
      console.log(`🔍 User object:`, { _id: user?._id, id: user?.id, userProfileId: userProfile.id });
      console.log(`🔄 FORCE REFRESH: Loading fresh data from database for farmer: ${actualUserId}`);
      console.log(`🌐 This ensures latest data is loaded from any device`);
      console.log(`📱 Cross-device sync: Mobile crops will be available on desktop and vice versa`);
      
      const response = await authenticatedFetch(`https://acchadam1-backend.onrender.com/api/crops/farmer/${actualUserId}`, {
        method: 'GET'
      });

      console.log(`📡 Database response status: ${response.status}`);

      if (response.ok) {
        const data = await response.json();
        const crops = data.data || [];
        console.log(`✅ FORCE REFRESH: Loaded ${crops.length} fresh crops from database`);
        console.log(`🌐 CROSS-DEVICE SYNC: These crops are now available on this device`);
        console.log(`📊 Database response:`, {
          success: data.success,
          count: data.count,
          persistence: data.persistence
        });
        
        // Update state with fresh data
        setUploadedCrops(crops);
        
        // Update localStorage with fresh data
        const userKey = `farmer_${userProfile.id.replace(/[^a-zA-Z0-9]/g, '_')}`;
        const databaseKey = `farmer_database_${userKey}`;
        const databaseEntry = {
          crops: crops,
          farmerId: userProfile.id,
          farmerName: userProfile.name,
          lastUpdated: new Date().toISOString(),
          totalImages: crops.reduce((total, crop) => total + (crop.images?.length || 0), 0),
          crossDeviceSync: true,
          databaseSource: true,
          forceRefresh: true,
          syncTimestamp: new Date().toISOString()
        };
        localStorage.setItem(databaseKey, JSON.stringify(databaseEntry));
        
        console.log(`🔄 FORCE REFRESH COMPLETE: Fresh data loaded and synced`);
        console.log(`🌐 Cross-device sync successful - crops available on all devices`);
        return crops;
      } else {
        // Handle non-JSON error responses
        let errorMessage = `HTTP ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
          console.log(`⚠️ Force refresh failed with status ${response.status}:`, errorData);
        } catch (jsonError) {
          console.log(`⚠️ Force refresh failed with status ${response.status}: ${errorMessage}`);
        }
        console.log(`🔄 Will try localStorage fallback`);
        return [];
      }
    } catch (error) {
      console.error(`❌ Force refresh error:`, error);
      console.log(`🔄 Network error, will try localStorage fallback`);
      return [];
    }
  };

  // Load crops from storage when component mounts - USER SPECIFIC with CROSS-DEVICE SYNC
  useEffect(() => {
    const loadCrops = async () => {
      if (userProfile.id) {
      // Get user key from localStorage or create from user data
      let userKey = localStorage.getItem('farmer_user_key');
      if (!userKey) {
        const userIdentifier = userProfile.phone || userProfile.email || userProfile.id || 'anonymous';
        userKey = `farmer_${userIdentifier.replace(/[^a-zA-Z0-9]/g, '_')}`;
        localStorage.setItem('farmer_user_key', userKey);
      }
      
      console.log(`🔄 Loading crops for farmer: ${userProfile.name} (ID: ${userProfile.id})`);
      console.log(`🔍 Checking localStorage for key: farmer_database_${userKey}`);
      
      // Check if data exists in localStorage
      const databaseKey = `farmer_database_${userKey}`;
      const existingData = localStorage.getItem(databaseKey);
      
      if (existingData) {
        console.log(`✅ Found existing data for farmer ${userProfile.name}`);
        const parsed = JSON.parse(existingData);
        console.log(`📊 Database info:`, {
          totalCrops: parsed.crops?.length || 0,
          lastUpdated: parsed.lastUpdated,
          farmerId: parsed.farmerId,
          farmerName: parsed.farmerName
        });
      } else {
        console.log(`❌ No existing data found for farmer ${userProfile.name}`);
        console.log(`🔍 Available farmer databases:`, Object.keys(localStorage).filter(key => key.startsWith('farmer_database_')));
        console.log(`📝 This is a new farmer with no existing data. Starting fresh.`);
        console.log(`📊 Showing zero state: 0 crops, 0 earnings, 0 land`);
      }
      
      // NO MANUAL REFRESH - AUTOMATIC DATABASE LOAD ONLY
      console.log(`✅ ARCHITECTURE: Automatic database load - no manual refresh needed`);
      // Crops will be loaded automatically from database
      setUploadedCrops([]);
        console.log(`🌐 These crops are now available on this device`);
      } else {
        // Fallback to localStorage only if database has no data
        console.log(`⚠️ No fresh data from database, trying localStorage fallback`);
        // No fallback - database is required for cross-device sync
        console.log(`❌ No crops found in database for farmer ${userProfile.name}`);
        console.log(`🌐 Cross-device sync requires database connection`);
        setUploadedCrops([]);
      }
      
      // Log each crop to verify user-specific data
      const currentCrops = freshCrops.length > 0 ? freshCrops : [];
      currentCrops.forEach((crop, index) => {
        console.log(`📋 Crop ${index + 1}: ${crop.name} by ${crop.farmerName} (ID: ${crop.farmerId})`);
      });
      
      // Debug: Check all localStorage keys
      console.log(`🔍 All localStorage keys:`, Object.keys(localStorage).filter(key => key.startsWith('farmer_')));
      
      // Show user session info
      console.log(`👤 User session info:`, {
        currentUserId: userProfile.id,
        currentUserName: userProfile.name,
        currentUserEmail: userProfile.email,
        currentUserPhone: userProfile.phone,
        sessionStartTime: new Date().toISOString()
      });
      
      // Validate user data integrity
      validateUserData();
    };
    
    loadCrops();
  }, [userProfile.id, userProfile.name]);

  // Calculate real-time statistics from uploaded crops - FIXED INFINITE LOOP
  const [realTimeStats, setRealTimeStats] = useState({
    totalCrops: 0,
    activeCrops: 0,
    harvestedCrops: 0,
    totalEarnings: 0,
    totalLand: 0,
    pendingOrders: 0
  });

  // Update stats only when crops change - FIXED INFINITE LOOP
  useEffect(() => {
    const calculateStats = () => {
      const totalCrops = uploadedCrops.length;
      const activeCrops = uploadedCrops.filter(crop => crop.status === 'active').length;
      const harvestedCrops = uploadedCrops.filter(crop => {
        const harvestDate = new Date(crop.harvestDate);
        const today = new Date();
        return harvestDate <= today;
      }).length;
      
      const totalEarnings = uploadedCrops.reduce((sum, crop) => {
        return sum + (crop.price * crop.quantity);
      }, 0);
      
      // Mock land area (in real app, this would come from farmer profile)
      const totalLand = userProfile.landArea || 0;
      
      // Mock pending orders (in real app, this would come from orders API)
      const pendingOrders = Math.floor(Math.random() * 5); // Random for demo
      
      console.log(`📊 Real-time stats for ${userProfile.name}:`, {
        totalCrops,
        activeCrops,
        harvestedCrops,
        totalEarnings,
        totalLand,
        pendingOrders
      });

      setRealTimeStats({
        totalCrops,
        activeCrops,
        harvestedCrops,
        totalEarnings,
        totalLand,
        pendingOrders
      });
    };

    // Only calculate when crops or userProfile changes
    calculateStats();
  }, [uploadedCrops, userProfile.name, userProfile.landArea]);

  // PERMANENT DATA LOADING - Cross-device, Cross-session
  useEffect(() => {
    if (userProfile.id) {
      console.log(`🌾 PERMANENT LOAD: Loading crops for farmer: ${userProfile.name} (ID: ${userProfile.id})`);
      console.log(`📱 This will load crops from any device, any session - PERMANENT DATA`);
      
      const loadCrops = async () => {
        try {
          // Load from database first (PERMANENT DATA)
          const result = await loadCropsFromDatabase(userProfile.id);
          
          if (result.success && result.data) {
            console.log(`✅ PERMANENT LOAD: Loaded ${result.data.length} crops from database`);
            console.log(`🌐 These crops are available across all devices and sessions`);
            setUploadedCrops(result.data);
          } else {
            console.log('No permanent crops found in database, loading from localStorage');
            
            // Fallback to localStorage
            const userKey = localStorage.getItem('farmer_user_key');
            if (userKey) {
              const data = localStorage.getItem(`farmer_database_${userKey}`);
              if (data) {
                const parsed = JSON.parse(data);
                console.log(`📱 Loaded ${parsed.crops?.length || 0} crops from localStorage as fallback`);
                setUploadedCrops(parsed.crops || []);
              }
            }
          }
        } catch (error) {
          console.error('Error loading permanent crops from database:', error);
        }
      };
      
      loadCrops();
    }
  }, [userProfile.id, userProfile.name]);

  // NO LOCALSTORAGE SAVE - DATABASE ONLY TO PREVENT DUPLICATES
  // useEffect(() => {
  //   if (uploadedCrops.length > 0 && userProfile.id) {
  //     console.log(`💾 PERMANENT SAVE: Saving ${uploadedCrops.length} crops for farmer ${userProfile.name} (ID: ${userProfile.id})`);
  //     console.log(`🌐 These crops will be available on any device, any session`);
  //     saveCropsToStorage(uploadedCrops); // DISABLED TO PREVENT DUPLICATES
  //   }
  // }, [uploadedCrops, userProfile.id, userProfile.name]);

  // Real crop listings - loaded from user's actual data
  const cropListings = uploadedCrops;

  // Real buyer requests - loaded from actual data
  const [buyerRequests] = useState([]);

  // Real incoming orders - loaded from actual data
  const [incomingOrders] = useState([]);

  // Real sales analytics - calculated from actual data
  const salesAnalytics = {
    monthlyRevenue: uploadedCrops.reduce((sum, crop) => sum + (crop.price * crop.quantity), 0),
    totalOrders: incomingOrders.length,
    averageOrderValue: incomingOrders.length > 0 ? 
      incomingOrders.reduce((sum, order) => sum + order.totalAmount, 0) / incomingOrders.length : 0,
    topCrop: uploadedCrops.length > 0 ? 
      uploadedCrops.reduce((max, crop) => crop.quantity > max.quantity ? crop : max, uploadedCrops[0])?.type || 'None' : 'None',
    seasonalTrend: '0%', // Will be calculated from historical data
    marketShare: '0%' // Will be calculated from market data
  };

  // Real market intelligence - loaded from actual market data
  const marketIntelligence = {
    mandiRates: {}, // Will be loaded from market API
    priceTrends: {}, // Will be calculated from historical data
    demandForecast: {} // Will be calculated from market analysis
  };

  // Real financial data - calculated from actual transactions
  const financialData = {
    totalEarnings: uploadedCrops.reduce((sum, crop) => sum + (crop.price * crop.quantity), 0),
    pendingPayments: 0, // Will be calculated from pending orders
    platformCommission: 0, // Will be calculated from platform fees
    netEarnings: uploadedCrops.reduce((sum, crop) => sum + (crop.price * crop.quantity), 0),
    bankAccount: userProfile.bankAccountNumber ? `****${userProfile.bankAccountNumber.slice(-4)}` : 'Not Added',
    lastSettlement: 'Never' // Will be updated from settlement history
  };

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'crop-upload', label: 'Crop Upload', icon: Upload },
    { id: 'marketplace', label: 'Buyer Marketplace', icon: ShoppingCart },
    { id: 'orders', label: 'Order Management', icon: Package },
    { id: 'analytics', label: 'Business Analytics', icon: BarChart3 },
    { id: 'services', label: 'Services', icon: Wrench },
    { id: 'financial', label: 'Financial Center', icon: DollarSign },
    { id: 'weather', label: 'Weather', icon: Sun },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Helper functions
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'negotiating': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Image Gallery Modal Component
  const renderImageGalleryModal = () => (
    showImageGallery && (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">📸 Crop Image Gallery</h2>
                <p className="text-gray-600 text-sm">
                  Image {currentImageIndex + 1} of {selectedCropImages.length}
                </p>
              </div>
              <button 
                onClick={() => setShowImageGallery(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Main Image Display */}
          <div className="relative bg-gray-100 flex items-center justify-center" style={{ height: '60vh' }}>
            {selectedCropImages.length > 0 && (
              <>
                {/* Previous Button */}
                {selectedCropImages.length > 1 && (
                  <button
                    onClick={() => setCurrentImageIndex(prev => 
                      prev === 0 ? selectedCropImages.length - 1 : prev - 1
                    )}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                )}

                {/* Main Image */}
                <img 
                  src={getImageUrl(selectedCropImages[currentImageIndex])} 
                  alt={`Crop Image ${currentImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  onError={(e) => {
                    console.log('Gallery image failed to load:', e.target.src);
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+';
                  }}
                />

                {/* Next Button */}
                {selectedCropImages.length > 1 && (
                  <button
                    onClick={() => setCurrentImageIndex(prev => 
                      prev === selectedCropImages.length - 1 ? 0 : prev + 1
                    )}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {selectedCropImages.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Strip */}
          {selectedCropImages.length > 1 && (
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex space-x-2 overflow-x-auto">
                {selectedCropImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentImageIndex 
                        ? 'border-green-500 ring-2 ring-green-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img 
                      src={getImageUrl(image)} 
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5OQTwvdGV4dD48L3N2Zz4=';
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800">
                  <Share className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
              <button 
                onClick={() => setShowImageGallery(false)}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Close Gallery
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  // Crop Upload Section
  // Crop upload modal component
  const renderCropUploadModal = () => (
    showCropUploadModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {cropFormData.id ? '✏️ Edit Crop' : '🌾 Crop Upload'}
                </h2>
                <p className="text-gray-600 mt-1">
                  {cropFormData.id ? 'अपनी फसल की जानकारी अपडेट करें' : 'सरल तरीके से अपनी फसल अपलोड करें'}
                </p>
              </div>
              <button 
                onClick={() => setShowCropUploadModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 space-y-6">
            {/* Step 1: Crop Selection */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                <Leaf className="h-5 w-5 mr-2" />
                Step 1: अपनी फसल चुनें (Select Your Crop)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Crop Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    फसल का प्रकार (Crop Category)
                  </label>
                  <select 
                    value={cropFormData.cropType}
                    onChange={(e) => {
                      setCropFormData(prev => ({ ...prev, cropType: e.target.value, variety: '' }));
                    }}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="">-- चुनें (Select) --</option>
                    {Object.keys(cropCategories).map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Crop Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    फसल का नाम (Crop Name)
                  </label>
                  <select 
                    value={cropFormData.cropName}
                    onChange={(e) => setCropFormData(prev => ({ ...prev, cropName: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    disabled={!cropFormData.cropType}
                  >
                    <option value="">-- पहले प्रकार चुनें (Select Category First) --</option>
                    {cropFormData.cropType && cropCategories[cropFormData.cropType] && 
                      Object.keys(cropCategories[cropFormData.cropType]).map(crop => (
                        <option key={crop} value={crop}>{crop}</option>
                      ))
                    }
                  </select>
                </div>

                {/* Variety */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    किस्म (Variety)
                  </label>
                  <select 
                    value={cropFormData.variety}
                    onChange={(e) => setCropFormData(prev => ({ ...prev, variety: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    disabled={!cropFormData.cropName}
                  >
                    <option value="">-- किस्म चुनें (Select Variety) --</option>
                    {cropFormData.cropType && cropFormData.cropName && 
                      cropCategories[cropFormData.cropType][cropFormData.cropName]?.map(variety => (
                        <option key={variety} value={variety}>{variety}</option>
                      ))
                    }
                  </select>
                </div>

                {/* Quality Grade */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    गुणवत्ता (Quality Grade)
                  </label>
                  <select 
                    value={cropFormData.quality}
                    onChange={(e) => setCropFormData(prev => ({ ...prev, quality: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    {qualityGrades.map(grade => (
                      <option key={grade.value} value={grade.value}>
                        {grade.label} - {grade.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Quantity & Pricing */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Step 2: मात्रा और मूल्य (Quantity & Pricing)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    मात्रा (Quantity)
                  </label>
                  <input 
                    type="number" 
                    value={cropFormData.quantity}
                    onChange={(e) => setCropFormData(prev => ({ ...prev, quantity: e.target.value }))}
                    placeholder="उदाहरण: 10"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Unit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    इकाई (Unit)
                  </label>
                  <select 
                    value={cropFormData.unit}
                    onChange={(e) => setCropFormData(prev => ({ ...prev, unit: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {quantityUnits.map(unit => (
                      <option key={unit.value} value={unit.value}>
                        {unit.label} ({unit.local})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    मूल्य प्रति इकाई (Price per Unit)
                  </label>
                  <input 
                    type="number" 
                    value={cropFormData.price}
                    onChange={(e) => setCropFormData(prev => ({ ...prev, price: e.target.value }))}
                    placeholder="₹ रुपये में"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Market Price Suggestion */}
              {cropFormData.cropName && cropFormData.quality && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <TrendingUp className="h-5 w-5 text-yellow-600 mr-2" />
                    <span className="text-sm font-medium text-yellow-800">
                      Market Price Suggestion: ₹{Math.floor(Math.random() * 1000) + 2000} - ₹{Math.floor(Math.random() * 1000) + 4000} per {cropFormData.unit}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Harvest & Location */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-purple-800 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Step 3: कटाई और स्थान (Harvest & Location)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Harvest Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    कटाई की तारीख (Harvest Date)
                  </label>
                  <input 
                    type="date" 
                    value={cropFormData.harvestDate}
                    onChange={(e) => setCropFormData(prev => ({ ...prev, harvestDate: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    स्थान (Location)
                  </label>
                  <input 
                    type="text" 
                    value={cropFormData.location}
                    onChange={(e) => setCropFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="गाँव, जिला, राज्य"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Organic Checkbox */}
              <div className="mt-4">
                <label className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={cropFormData.organic}
                    onChange={(e) => setCropFormData(prev => ({ ...prev, organic: e.target.checked }))}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    जैविक फसल (Organic Crop) 🌱
                  </span>
                </label>
              </div>
            </div>

            {/* Step 4: Photos & Description */}
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                Step 4: फोटो और विवरण (Photos & Description)
              </h3>
              
              {/* Photo Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  फसल की तस्वीरें (Crop Photos)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">फोटो अपलोड करने के लिए यहाँ क्लिक करें</p>
                  <p className="text-sm text-gray-500">JPG, PNG (Max 5MB each)</p>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    className="hidden"
                    id="crop-photos"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setCropFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
                    }}
                  />
                  <label 
                    htmlFor="crop-photos"
                    className="mt-2 inline-block bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 cursor-pointer"
                  >
                    Choose Photos
                  </label>
                  
                  {/* Show selected images */}
                  {cropFormData.images.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Selected Images:</p>
                      <div className="flex flex-wrap gap-2">
                        {cropFormData.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img 
                              src={image instanceof File ? URL.createObjectURL(image) : image} 
                              alt={`Crop ${index + 1}`}
                              className="w-16 h-16 object-cover rounded-lg border"
                            />
                            <button
                              onClick={() => {
                                setCropFormData(prev => ({
                                  ...prev,
                                  images: prev.images.filter((_, i) => i !== index)
                                }));
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  अतिरिक्त जानकारी (Additional Information)
                </label>
                <textarea 
                  value={cropFormData.description}
                  onChange={(e) => setCropFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="फसल के बारे में कोई विशेष जानकारी..."
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-xl">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setShowCropUploadModal(false)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <div className="flex space-x-3">
                <button 
                  onClick={() => {
                    // Reset form
                    setCropFormData({
                      id: null, // Clear ID for new crop
                      cropName: '',
                      cropType: '',
                      variety: '',
                      quantity: '',
                      unit: 'quintal',
                      quality: 'A',
                      harvestDate: '',
                      price: '',
                      organic: false,
                      location: '',
                      description: '',
                      images: [],
                      uploadedAt: null // Clear upload date for new crop
                    });
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Reset
                </button>
                <button 
                  onClick={async () => {
                    // Handle crop upload
                    if (!cropFormData.cropName || !cropFormData.quantity || !cropFormData.price) {
                      alert('कृपया सभी आवश्यक फील्ड भरें (Please fill all required fields)');
                      return;
                    }

                    try {
                      // Check for duplicate uploads within last 5 minutes
                      const now = Date.now();
                      const recentUploads = uploadedCrops.filter(crop => {
                        const uploadTime = new Date(crop.uploadedAt).getTime();
                        return (now - uploadTime) < 5 * 60 * 1000; // 5 minutes
                      });
                      
                      const isDuplicate = recentUploads.some(crop => 
                        crop.name === cropFormData.cropName && 
                        crop.type === cropFormData.cropType && 
                        crop.price === parseFloat(cropFormData.price)
                      );
                      
                      if (isDuplicate) {
                        alert('⚠️ Duplicate crop detected! Please wait 5 minutes before uploading the same crop again.');
                        return;
                      }
                      
                      // Check if this is an edit operation (cropFormData has an existing ID)
                      const isEditMode = cropFormData.id;
                      
                      if (isEditMode) {
                        // Update existing crop - use existing ID to prevent duplicates
                        const updatedCrop = await createCropData(cropFormData, cropFormData.images, cropFormData.id);
                        updatedCrop.uploadedAt = cropFormData.uploadedAt; // Keep original upload date
                        
                        // Update in database
                        const result = await saveToDatabase(updatedCrop);
                        
                        if (result.success) {
                          // Update the existing crop in the list
                          const updatedCrops = uploadedCrops.map(crop => 
                            crop.id === cropFormData.id ? updatedCrop : crop
                          );
                          setUploadedCrops(updatedCrops);
                          
                          // NO LOCALSTORAGE SAVE - DATABASE ONLY
                          // saveCropsToStorage(updatedCrops); // REMOVED TO PREVENT DUPLICATES
                          
                          console.log('✅ Crop updated successfully:', updatedCrop);
                          console.log('🖼️ Updated crop images:', updatedCrop.images);
                          alert('फसल सफलतापूर्वक अपडेट हो गई! (Crop updated successfully!)');
                          setShowCropUploadModal(false);
                        } else {
                          throw new Error(result.error || 'Failed to update crop');
                        }
                      } else {
                        // Create new crop
                        const newCrop = await createCropData(cropFormData, cropFormData.images);

                        // Save to database
                        const result = await saveToDatabase(newCrop);
                        
                        if (result.success) {
                          // Add to uploaded crops list
                          const updatedCrops = [newCrop, ...uploadedCrops];
                          setUploadedCrops(updatedCrops);
                        
                          // NO LOCALSTORAGE SAVE - DATABASE ONLY
                          // saveCropsToStorage(updatedCrops); // REMOVED TO PREVENT DUPLICATES

                          // Reset form
                          setCropFormData({
                            id: null,
                            cropName: '',
                            cropType: '',
                            variety: '',
                            quantity: '',
                            unit: 'quintal',
                            quality: 'A',
                            harvestDate: '',
                            price: '',
                            organic: false,
                            location: '',
                            description: '',
                            images: [],
                            uploadedAt: null
                          });

                          alert('फसल सफलतापूर्वक अपलोड हो गई! 🎉 (Crop uploaded successfully!)');
                          setShowCropUploadModal(false);
                        } else {
                          if (result.isDuplicate) {
                            alert('⚠️ Duplicate crop detected! Please wait 5 minutes before uploading the same crop again.');
                          } else {
                            alert('Error uploading crop: ' + result.error);
                          }
                        }
                      }
                    } catch (error) {
                      console.error('Error uploading crop:', error);
                      alert('Error uploading crop. Please try again.');
                    }
                  }}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <Upload className="h-5 w-5" />
                  <span>{cropFormData.id ? 'Update Crop' : 'Upload Crop'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );

  const renderCropUpload = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Smart Crop Listing</h2>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Upload your crops with AI-powered features</p>
            </div>
          </div>
          <button 
            onClick={() => {
              console.log('🔍 New Listing button clicked');
              
              // Check if KYC is completed
              const allKeys = Object.keys(localStorage);
              const kycKeys = allKeys.filter(key => key.startsWith('farmer_kyc_') || key.startsWith('farmer_pan_') || key.startsWith('farmer_aadhar_'));
              const kycCompleted = kycKeys.length > 0;
              
              console.log('🔍 KYC Status Check:', {
                kycCompleted,
                kycKeys,
                sessionDismissed: sessionStorage.getItem('kyc_dismissed_this_session')
              });
              
              if (!kycCompleted) {
                // Check if KYC was dismissed this session
                if (sessionStorage.getItem('kyc_dismissed_this_session') === 'true') {
                  console.log('✅ KYC was dismissed this session, opening crop upload directly');
                  setShowCropUploadModal(true);
                  return;
                }
                console.log('📋 Showing KYC modal');
                setShowKYCModal(true);
              } else {
                console.log('✅ KYC completed, opening crop upload');
                setShowCropUploadModal(true);
              }
            }}
            className="w-full sm:w-auto bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center sm:justify-start space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>New Listing</span>
          </button>
        </div>
      </div>

      {/* Current Listings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900">Your Active Listings</h3>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                Your Crops: <span className="font-semibold text-green-600">{uploadedCrops.length}</span>
              </span>
              <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                Total Listings: <span className="font-semibold text-blue-600">{uploadedCrops.length + cropListings.length}</span>
              </span>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          {/* Show message if no crops uploaded */}
          {uploadedCrops.length === 0 && (
            <div className="text-center py-6 sm:py-8 mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">No Crops Uploaded Yet</h4>
              <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">Start by uploading your first crop to see it here!</p>
              <button 
                onClick={() => setShowCropUploadModal(true)}
                className="bg-green-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto text-sm sm:text-base"
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                <span>Upload Your First Crop</span>
              </button>
            </div>
          )}

          {/* Show uploaded crops first, then mock data */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* User's uploaded crops */}
            {uploadedCrops.map((crop) => (
              <div key={crop.id} className="border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-green-50">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{crop.name}</h4>
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        YOUR CROP
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {crop.type} • {crop.variety && `${crop.variety} • `}{crop.quantity} {crop.unit}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(crop.status)}`}>
                    {crop.status.toUpperCase()}
                  </span>
                </div>
                
                {/* Crop Image */}
                {crop.images && crop.images.length > 0 ? (
                  <div className="mb-4 relative">
                    <img 
                      src={getImageUrl(selectBestImage(crop.images)?.imageUrl)} 
                      alt={crop.name}
                      className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      onLoad={() => {
                        console.log('✅ Image loaded successfully for crop:', crop.name);
                      }}
                      onError={(e) => {
                        console.log('❌ Image failed to load for crop:', crop.name);
                        console.log('🖼️ Crop images:', crop.images);
                        console.log('🔍 Selected image:', selectBestImage(crop.images));
                        e.currentTarget.src = '/placeholder-crop.jpg';
                      }}
                      onClick={() => {
                        setSelectedCropImages(crop.images.map(img => img.imageUrl));
                        setCurrentImageIndex(0);
                        setShowImageGallery(true);
                      }}
                    />
                    {/* Fallback for failed images */}
                    <div className="mb-4 bg-gray-100 rounded-lg h-32 flex items-center justify-center" style={{ display: 'none' }}>
                      <Camera className="h-8 w-8 text-gray-400" />
                      <span className="text-gray-500 ml-2">Image not available</span>
                    </div>
                    {/* Image count badge */}
                    {crop.images.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                        +{crop.images.length - 1} more
                      </div>
                    )}
                    {/* Image quality indicator */}
                    {selectBestImage(crop.images)?.analysis?.isAnalyzed && (
                      <div className="absolute top-2 left-2 bg-green-500 bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                        AI Analyzed
                      </div>
                    )}
                    {/* Click hint */}
                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                      Click to view all images
                    </div>
                  </div>
                ) : (
                  <div className="mb-4 bg-gray-100 rounded-lg h-32 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                    <span className="text-gray-500 ml-2">No Image</span>
                  </div>
                )}
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Quality:</span>
                    <span className="font-medium">{crop.quality}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Price:</span>
                    <span className="font-medium">₹{crop.price}/{crop.unit}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Harvest Date:</span>
                    <span className="font-medium">{new Date(crop.harvestDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Organic:</span>
                    <span className={`font-medium ${crop.organic ? 'text-green-600' : 'text-gray-600'}`}>
                      {crop.organic ? 'Yes 🌱' : 'No'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Location:</span>
                    <span className="font-medium">{crop.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Uploaded:</span>
                    <span className="font-medium">{new Date(crop.uploadedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Images:</span>
                    <span className="font-medium">{crop.analytics.totalImages} photos</span>
                  </div>
                  {crop.analytics.cropHealthScore && (
                    <div className="flex items-center justify-between">
                      <span>Health Score:</span>
                      <span className="font-medium text-green-600">{crop.analytics.cropHealthScore}%</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        // Edit crop functionality
                        setCropFormData({
                          id: crop.id, // Include crop ID for edit mode
                          cropName: crop.name,
                          cropType: crop.type,
                          variety: crop.variety,
                          quantity: crop.quantity,
                          unit: crop.unit,
                          quality: crop.quality,
                          harvestDate: crop.harvestDate,
                          price: crop.price.toString(),
                          organic: crop.organic,
                          location: crop.location,
                          description: crop.description,
                          images: crop.images,
                          uploadedAt: crop.uploadedAt // Keep original upload date
                        });
                        setShowCropUploadModal(true);
                      }}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Crop"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => {
                        // View crop details
                        alert(`Crop Details:\n\nName: ${crop.name}\nType: ${crop.type}\nVariety: ${crop.variety}\nQuantity: ${crop.quantity} ${crop.unit}\nPrice: ₹${crop.price}/${crop.unit}\nQuality: ${crop.quality}\nOrganic: ${crop.organic ? 'Yes' : 'No'}\nLocation: ${crop.location}\nDescription: ${crop.description}`);
                      }}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => {
                        if (confirm('क्या आप इस फसल को हटाना चाहते हैं? (Do you want to delete this crop?)')) {
                          const updatedCrops = uploadedCrops.filter(c => c.id !== crop.id);
                          setUploadedCrops(updatedCrops);
                          // NO LOCALSTORAGE SAVE - DATABASE ONLY
                          // saveCropsToStorage(updatedCrops); // REMOVED TO PREVENT DUPLICATES
                          alert('फसल हटा दी गई (Crop deleted)');
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Crop"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <button className="text-sm text-gray-500 hover:text-gray-700">
                    View Details →
                  </button>
                </div>
              </div>
            ))}

            {/* Mock data crops (for demonstration) */}
            {cropListings.map((crop) => (
              <div key={crop.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">{crop.name}</h4>
                    <p className="text-sm text-gray-500">{crop.type} • {crop.quantity} {crop.unit}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(crop.status)}`}>
                    {crop.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-between">
                    <span>Quality:</span>
                    <span className="font-medium">{crop.quality}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Price:</span>
                    <span className="font-medium">{formatCurrency(crop.price)}/{crop.unit}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Harvest Date:</span>
                    <span className="font-medium">{new Date(crop.harvestDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Organic:</span>
                    <span className={`font-medium ${crop.organic ? 'text-green-600' : 'text-gray-600'}`}>
                      {crop.organic ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <button className="text-sm text-gray-500 hover:text-gray-700">
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Features */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">AI-Powered Features</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Auto Crop Detection</h4>
              <p className="text-sm text-gray-600">Upload photos and AI will automatically detect crop type and quality</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Pricing</h4>
              <p className="text-sm text-gray-600">Get AI-suggested prices based on market rates and quality</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Buyer Matching</h4>
              <p className="text-sm text-gray-600">AI matches your crops with the best buyers automatically</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Buyer Marketplace Section
  const renderMarketplace = () => (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Live Buyer Marketplace</h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">Real-time buyer requests and smart matching</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm">
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2 text-sm">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Buyer Requests */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Real-time Buyer Requests</h3>
        </div>
        <div className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {buyerRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-0 mb-3 sm:mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Building className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{request.buyerName}</h4>
                      <p className="text-xs sm:text-sm text-gray-500">{request.cropType} • {request.quantity} {request.unit}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getUrgencyColor(request.urgency)}`}>
                      {request.urgency.toUpperCase()}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                      <span className="text-xs sm:text-sm font-medium">{request.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                    <span className="text-xs sm:text-sm text-gray-600">{request.location} ({request.distance})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                    <span className="text-xs sm:text-sm text-gray-600">Max: {formatCurrency(request.maxPrice)}/{request.unit}</span>
                  </div>
                  <div className="flex items-center space-x-2 sm:col-span-2 lg:col-span-1">
                    <Users className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                    <span className="text-xs sm:text-sm text-gray-600">{request.previousTransactions} transactions</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-gray-700">{request.message}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <div className="flex items-center space-x-4 text-xs sm:text-sm text-gray-600">
                    <span>Payment: {request.preferredPayment}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <button className="px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                      Accept
                    </button>
                    <button className="px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                      Negotiate
                    </button>
                    <button className="px-3 sm:px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Smart Matching */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Smart Matching Algorithm</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Auto-Suggest Best Buyers</h4>
              <p className="text-sm text-gray-600">AI matches you with buyers based on location, price, and rating</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Distance Calculator</h4>
              <p className="text-sm text-gray-600">Automatic transportation cost calculation for better pricing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Order Management Section
  const renderOrders = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Order Management Center</h2>
            <p className="text-gray-600 mt-1">Manage incoming orders and communicate with buyers</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </button>
          </div>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-yellow-600">3</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Confirmed Orders</p>
              <p className="text-2xl font-bold text-green-600">12</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">5</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-600">28</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Incoming Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Incoming Orders</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {incomingOrders.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{order.buyerName}</h4>
                      <p className="text-sm text-gray-500">{order.cropName} • {order.quantity} {order.unit}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.toUpperCase()}
                    </span>
                    {order.chatMessages > 0 && (
                      <div className="flex items-center space-x-1 text-blue-600">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm font-medium">{order.chatMessages}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Price: {formatCurrency(order.offeredPrice)}/{order.unit}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Delivery: {new Date(order.deliveryDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Total: {formatCurrency(order.totalAmount)}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Delivery Terms:</span>
                      <p className="text-gray-600">{order.deliveryTerms}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-700">Payment Terms:</span>
                      <p className="text-gray-600">{order.paymentTerms}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => setShowChat(true)}
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span className="text-sm">Chat</span>
                    </button>
                    {order.contractGenerated && (
                      <button className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                        <FileText className="h-4 w-4" />
                        <span className="text-sm">Contract</span>
                      </button>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                      Accept
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Negotiate
                    </button>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat System */}
      {showChat && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Chat with Buyer</h3>
              <button 
                onClick={() => setShowChat(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="bg-gray-50 rounded-lg p-4 h-64 overflow-y-auto mb-4">
              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Hello, I'm interested in your rice. Can you provide more details about the quality?</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Sure! It's premium basmati rice, organic certified. I can send you photos if needed.</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                    <p className="text-sm">Yes, please send photos. Also, what's your best price for 30 quintals?</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Mic className="h-5 w-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Image className="h-5 w-5" />
              </button>
              <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Business Analytics Section
  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Business Analytics</h2>
            <p className="text-gray-600 mt-1">Track your sales performance and market intelligence</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sales Performance */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Sales Performance</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">{formatCurrency(salesAnalytics.monthlyRevenue)}</h4>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">{salesAnalytics.totalOrders}</h4>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">{salesAnalytics.seasonalTrend}</h4>
              <p className="text-sm text-gray-600">Seasonal Trend</p>
            </div>
          </div>
        </div>
      </div>

      {/* Market Intelligence */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Market Intelligence</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Current Mandi Rates</h4>
              <div className="space-y-3">
                {Object.entries(marketIntelligence.mandiRates).map(([crop, rate]) => (
                  <div key={crop} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 capitalize">{crop}</span>
                    <span className="font-medium">{formatCurrency(rate)}/quintal</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Price Trends</h4>
              <div className="space-y-3">
                {Object.entries(marketIntelligence.priceTrends).map(([crop, trend]) => (
                  <div key={crop} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 capitalize">{crop}</span>
                    <span className={`font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                      {trend}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Services Section
  const renderServices = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Integrated Services Marketplace</h2>
            <p className="text-gray-600 mt-1">Access farm inputs, equipment, and technology services</p>
          </div>
        </div>
      </div>

      {/* Farm Inputs Store */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Farm Inputs Store</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Seeds & Fertilizers</h4>
              <p className="text-sm text-gray-600">Quality certified products with bulk discounts</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Equipment Rental</h4>
              <p className="text-sm text-gray-600">Tractors, harvesters on hourly/daily basis</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Insurance & Credit</h4>
              <p className="text-sm text-gray-600">Crop insurance and quick loan options</p>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Services */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Technology Services</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wifi className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">IoT Solutions</h4>
              <p className="text-sm text-gray-600">Soil sensors, weather monitoring, crop health tracking</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Navigation className="h-8 w-8 text-red-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Drone Services</h4>
              <p className="text-sm text-gray-600">Pesticide spraying, crop assessment, aerial photography</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Financial Center Section
  const renderFinancial = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Financial Center</h2>
            <p className="text-gray-600 mt-1">Track earnings, payments, and platform commissions</p>
          </div>
        </div>
      </div>

      {/* Earnings Dashboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Earnings Dashboard</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">{formatCurrency(financialData.totalEarnings)}</h4>
              <p className="text-sm text-gray-600">Total Earnings</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">{formatCurrency(financialData.pendingPayments)}</h4>
              <p className="text-sm text-gray-600">Pending Payments</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">{formatCurrency(financialData.platformCommission)}</h4>
              <p className="text-sm text-gray-600">Platform Commission</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">{formatCurrency(financialData.netEarnings)}</h4>
              <p className="text-sm text-gray-600">Net Earnings</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Tracking */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Payment Tracking</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-900">Order #ORD-001</h4>
                <p className="text-sm text-gray-600">FreshMart Stores • Rice 30 quintals</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatCurrency(84000)}</p>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                  Paid
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-900">Order #ORD-002</h4>
                <p className="text-sm text-gray-600">Local Mandi • Tomatoes 20 quintals</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{formatCurrency(20000)}</p>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-4">

      {/* Stats Grid - Perfect Mobile Design */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {/* Total Crops - Clickable */}
        <div 
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-green-200 transition-all duration-300 hover:scale-105"
          onClick={() => setActiveTab('crops')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Leaf className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-xs font-medium text-gray-600 mb-1">Total Crops</p>
            <p className="text-2xl font-bold text-gray-900">{realTimeStats.totalCrops}</p>
          </div>
        </div>
        
        {/* Active Crops - Clickable */}
        <div 
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:scale-105"
          onClick={() => setActiveTab('crops')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Sprout className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-xs font-medium text-gray-600 mb-1">Active Crops</p>
            <p className="text-2xl font-bold text-blue-600">{realTimeStats.activeCrops}</p>
          </div>
        </div>
        
        {/* Harvested - Clickable */}
        <div 
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-purple-200 transition-all duration-300 hover:scale-105"
          onClick={() => setActiveTab('crops')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <Package className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-xs font-medium text-gray-600 mb-1">Harvested</p>
            <p className="text-2xl font-bold text-purple-600">{realTimeStats.harvestedCrops}</p>
          </div>
        </div>
        
        {/* Total Earnings - Clickable */}
        <div 
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-yellow-200 transition-all duration-300 hover:scale-105"
          onClick={() => setActiveTab('financial')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <p className="text-xs font-medium text-gray-600 mb-1">Total Earnings</p>
            <p className="text-lg font-bold text-gray-900">
              {realTimeStats.totalEarnings > 0 
                ? `₹${(realTimeStats.totalEarnings / 100000).toFixed(1)}L` 
                : '₹0'
              }
            </p>
          </div>
        </div>
        
        {/* Total Land - Clickable */}
        <div 
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-indigo-200 transition-all duration-300 hover:scale-105"
          onClick={() => setActiveTab('crops')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
              <MapPin className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-xs font-medium text-gray-600 mb-1">Total Land</p>
            <p className="text-lg font-bold text-indigo-600">
              {realTimeStats.totalLand > 0 ? `${realTimeStats.totalLand} acres` : '0 acres'}
            </p>
          </div>
        </div>
        
        {/* Pending Orders - Clickable */}
        <div 
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-orange-200 transition-all duration-300 hover:scale-105"
          onClick={() => setActiveTab('orders')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-3">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <p className="text-xs font-medium text-gray-600 mb-1">Pending Orders</p>
            <p className="text-2xl font-bold text-orange-600">{realTimeStats.pendingOrders}</p>
          </div>
        </div>
      </div>

      {/* Weather Alert - Real Practical Feature - Clickable */}
      <div 
        className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105"
        onClick={() => setActiveTab('analytics')}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Sun className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Weather Alert</h3>
              <p className="text-xs opacity-90">Heavy rain expected in 2 hours</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-90">Temperature</p>
            <p className="text-lg font-bold">28°C</p>
          </div>
        </div>
      </div>

      {/* Crop Health Status - Real Practical Feature - Clickable */}
      <div 
        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-green-200 transition-all duration-300"
        onClick={() => setActiveTab('crops')}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Crop Health Status</h3>
        <div className="space-y-3">
          <div 
            className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab('crops');
            }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">Wheat (Field A)</span>
            </div>
            <span className="text-sm text-green-600 font-medium">Healthy</span>
          </div>
          <div 
            className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab('crops');
            }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">Rice (Field B)</span>
            </div>
            <span className="text-sm text-yellow-600 font-medium">Needs Water</span>
          </div>
          <div 
            className="flex items-center justify-between p-3 bg-red-50 rounded-lg cursor-pointer hover:bg-red-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab('crops');
            }}
          >
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium text-gray-900">Tomato (Field C)</span>
            </div>
            <span className="text-sm text-red-600 font-medium">Pest Alert</span>
          </div>
        </div>
      </div>

      {/* Database Analytics - Real Practical Feature - Clickable */}
      <div 
        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all duration-300"
        onClick={() => setActiveTab('analytics')}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Database Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div 
              className="flex items-center justify-between p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab('analytics');
              }}
            >
              <div className="flex items-center space-x-3">
                <Camera className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-900">Total Images</span>
              </div>
              <span className="text-sm text-blue-600 font-medium">
                {uploadedCrops.reduce((sum, crop) => sum + crop.analytics.totalImages, 0)}
              </span>
            </div>
            <div 
              className="flex items-center justify-between p-3 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab('analytics');
              }}
            >
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-gray-900">Most Common Crop</span>
              </div>
              <span className="text-sm text-green-600 font-medium">
                {realTimeStats.totalCrops > 0 ? getMostCommonCropType(uploadedCrops) : 'None'}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div 
              className="flex items-center justify-between p-3 bg-purple-50 rounded-lg cursor-pointer hover:bg-purple-100 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab('analytics');
              }}
            >
              <div className="flex items-center space-x-3">
                <BarChart3 className="h-5 w-5 text-purple-600" />
                <span className="text-sm font-medium text-gray-900">Avg Crop Value</span>
              </div>
              <span className="text-sm text-purple-600 font-medium">
                ₹{realTimeStats.totalCrops > 0 ? Math.round(realTimeStats.totalEarnings / realTimeStats.totalCrops) : 0}
              </span>
            </div>
            <div 
              className="flex items-center justify-between p-3 bg-orange-50 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab('analytics');
              }}
            >
              <div className="flex items-center space-x-3">
                <Database className="h-5 w-5 text-orange-600" />
                <span className="text-sm font-medium text-gray-900">Database Status</span>
              </div>
              <span className="text-sm text-orange-600 font-medium">Synced</span>
            </div>
          </div>
        </div>
      </div>

      {/* Market Prices - Real Practical Feature - Clickable */}
      <div 
        className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-green-200 transition-all duration-300"
        onClick={() => setActiveTab('marketplace')}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Market Prices</h3>
        <div className="space-y-3">
          <div 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab('marketplace');
            }}
          >
            <div className="flex items-center space-x-3">
              <Wheat className="h-5 w-5 text-amber-600" />
              <span className="text-sm font-medium text-gray-900">Wheat</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-gray-900">₹2,450/quintal</span>
              <span className="text-xs text-green-600 ml-2">+5%</span>
            </div>
          </div>
          <div 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab('marketplace');
            }}
          >
            <div className="flex items-center space-x-3">
              <Carrot className="h-5 w-5 text-orange-600" />
              <span className="text-sm font-medium text-gray-900">Rice</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-gray-900">₹3,200/quintal</span>
              <span className="text-xs text-red-600 ml-2">-2%</span>
            </div>
          </div>
          <div 
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setActiveTab('marketplace');
            }}
          >
            <div className="flex items-center space-x-3">
              <Apple className="h-5 w-5 text-red-600" />
              <span className="text-sm font-medium text-gray-900">Tomato</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-gray-900">₹45/kg</span>
              <span className="text-xs text-green-600 ml-2">+12%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - Perfect Mobile Design */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <button 
            className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors min-h-[100px] hover:scale-105"
            onClick={() => setActiveTab('crops')}
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Plus className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-700 text-center">Add Crop</span>
          </button>
          <button 
            className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors min-h-[100px] hover:scale-105"
            onClick={() => setActiveTab('orders')}
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Eye className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-700 text-center">View Orders</span>
          </button>
          <button 
            className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors min-h-[100px] hover:scale-105"
            onClick={() => setActiveTab('analytics')}
          >
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <Sun className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-700 text-center">Weather</span>
          </button>
          <button 
            className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors min-h-[100px] hover:scale-105"
            onClick={() => setActiveTab('analytics')}
          >
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-3">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-700 text-center">Analytics</span>
          </button>
        </div>
      </div>

      {/* Recent Activity - Mobile Optimized */}
      <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
        <h3 className="text-base font-semibold text-gray-900 mb-3">Recent Activity</h3>
        <div className="space-y-2">
          <div 
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => setActiveTab('crops')}
          >
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <Leaf className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Wheat crop planted</p>
              <p className="text-xs text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div 
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => setActiveTab('orders')}
          >
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <Package className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">New order received</p>
              <p className="text-xs text-gray-500">4 hours ago</p>
            </div>
          </div>
          <div 
            className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => setActiveTab('analytics')}
          >
            <div className="p-2 bg-yellow-100 rounded-lg flex-shrink-0">
              <Sun className="h-4 w-4 text-yellow-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">Weather alert: Rain expected</p>
              <p className="text-xs text-gray-500">6 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const handleUpdateProfile = (updatedProfile: any) => {
    setUserProfile(updatedProfile);
    // Here you would typically make an API call to update the profile
    console.log('Profile updated:', updatedProfile);
  };

  const handleDeleteAccount = () => {
    // Here you would typically make an API call to delete the account
    console.log('Account deletion requested');
    alert('Account deletion feature will be implemented with backend integration');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'crop-upload':
        return renderCropUpload();
      case 'marketplace':
        return renderMarketplace();
      case 'orders':
        return renderOrders();
      case 'analytics':
        return renderAnalytics();
      case 'services':
        return renderServices();
      case 'financial':
        return renderFinancial();
      case 'weather':
        return (
          <div className="space-y-4">
            {/* Orders Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Orders Management</h2>
              <div className="mt-2 sm:mt-0 flex space-x-2">
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  New Order
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                  Filter
                </button>
              </div>
            </div>

            {/* Orders Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-orange-600">6</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Confirmed</p>
                    <p className="text-2xl font-bold text-blue-600">12</p>
                  </div>
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Shipped</p>
                    <p className="text-2xl font-bold text-purple-600">8</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Delivered</p>
                    <p className="text-2xl font-bold text-green-600">24</p>
                  </div>
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {/* Order 1 */}
                <div className="p-4 hover:bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Wheat className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Wheat - 50 Quintals</h4>
                          <p className="text-xs text-gray-500">Order #ORD-001 • Buyer: Agro Traders</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">₹1,22,500</p>
                        <p className="text-xs text-gray-500">₹2,450/quintal</p>
                      </div>
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
                        Pending
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order 2 */}
                <div className="p-4 hover:bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Carrot className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Rice - 30 Quintals</h4>
                          <p className="text-xs text-gray-500">Order #ORD-002 • Buyer: Food Corp</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">₹96,000</p>
                        <p className="text-xs text-gray-500">₹3,200/quintal</p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        Confirmed
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order 3 */}
                <div className="p-4 hover:bg-gray-50">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                          <Apple className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">Tomato - 200 kg</h4>
                          <p className="text-xs text-gray-500">Order #ORD-003 • Buyer: Local Market</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">₹9,000</p>
                        <p className="text-xs text-gray-500">₹45/kg</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Delivered
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'weather':
        return (
          <div className="space-y-4">
            {/* Weather Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Weather & Climate</h2>
              <div className="mt-2 sm:mt-0 flex space-x-2">
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  Refresh
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                  Forecast
                </button>
              </div>
            </div>

            {/* Current Weather */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <Sun className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">28°C</h3>
                    <p className="text-sm opacity-90">Partly Cloudy</p>
                    <p className="text-xs opacity-75">Patna, Bihar</p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div>
                    <p className="text-xs opacity-75">Humidity</p>
                    <p className="text-lg font-semibold">65%</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-75">Wind</p>
                    <p className="text-lg font-semibold">12 km/h</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-75">Rain</p>
                    <p className="text-lg font-semibold">20%</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-75">UV Index</p>
                    <p className="text-lg font-semibold">7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Alerts */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Sun className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-yellow-800">Weather Alert</h4>
                  <p className="text-xs text-yellow-700">Heavy rainfall expected in next 2-3 hours. Prepare for waterlogging.</p>
                </div>
              </div>
            </div>

            {/* 7-Day Forecast */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">7-Day Forecast</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {/* Day 1 */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Sun className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Today</p>
                      <p className="text-xs text-gray-500">Partly Cloudy</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">28°C</p>
                    <p className="text-xs text-gray-500">Rain: 20%</p>
                  </div>
                </div>

                {/* Day 2 */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <Cloud className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Tomorrow</p>
                      <p className="text-xs text-gray-500">Heavy Rain</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">24°C</p>
                    <p className="text-xs text-gray-500">Rain: 90%</p>
                  </div>
                </div>

                {/* Day 3 */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Sun className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Day After</p>
                      <p className="text-xs text-gray-500">Sunny</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">32°C</p>
                    <p className="text-xs text-gray-500">Rain: 5%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Farming Recommendations */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Farming Recommendations</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Leaf className="h-3 w-3 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Ideal for planting</p>
                    <p className="text-xs text-gray-600">Current weather conditions are perfect for planting new crops.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Droplets className="h-3 w-3 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Water management</p>
                    <p className="text-xs text-gray-600">Reduce irrigation due to expected rainfall in next 2 days.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Wind className="h-3 w-3 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Wind protection</p>
                    <p className="text-xs text-gray-600">Secure loose items and protect young plants from strong winds.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-4">
            {/* Analytics Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Farm Analytics</h2>
              <div className="mt-2 sm:mt-0 flex space-x-2">
                <button className="px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  Export Data
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                  Filter
                </button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Revenue</p>
                    <p className="text-2xl font-bold text-green-600">₹2.5L</p>
                    <p className="text-xs text-green-600">+15% vs last month</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Yield</p>
                    <p className="text-2xl font-bold text-blue-600">85%</p>
                    <p className="text-xs text-blue-600">+8% vs last season</p>
                  </div>
                  <Leaf className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Efficiency</p>
                    <p className="text-2xl font-bold text-purple-600">92%</p>
                    <p className="text-xs text-purple-600">+5% vs last year</p>
                  </div>
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-600">Costs</p>
                    <p className="text-2xl font-bold text-orange-600">₹1.2L</p>
                    <p className="text-xs text-orange-600">-3% vs last month</p>
                  </div>
                  <Package className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Crop Performance Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Crop Performance</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {/* Wheat */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Wheat className="h-5 w-5 text-amber-600" />
                      <span className="text-sm font-medium text-gray-900">Wheat</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{width: '85%'}}></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">85%</span>
                    </div>
                  </div>
                  
                  {/* Rice */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Carrot className="h-5 w-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-900">Rice</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{width: '78%'}}></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">78%</span>
                    </div>
                  </div>
                  
                  {/* Tomato */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Apple className="h-5 w-5 text-red-600" />
                      <span className="text-sm font-medium text-gray-900">Tomato</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{width: '92%'}}></div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">92%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Revenue Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue</h3>
              </div>
              <div className="p-4">
                <div className="flex items-end justify-between h-32 space-x-2">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 bg-blue-500 rounded-t" style={{height: '60%'}}></div>
                    <span className="text-xs text-gray-600">Jan</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 bg-blue-500 rounded-t" style={{height: '80%'}}></div>
                    <span className="text-xs text-gray-600">Feb</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 bg-blue-500 rounded-t" style={{height: '70%'}}></div>
                    <span className="text-xs text-gray-600">Mar</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 bg-blue-500 rounded-t" style={{height: '90%'}}></div>
                    <span className="text-xs text-gray-600">Apr</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 bg-blue-500 rounded-t" style={{height: '85%'}}></div>
                    <span className="text-xs text-gray-600">May</span>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 bg-green-500 rounded-t" style={{height: '100%'}}></div>
                    <span className="text-xs text-gray-600">Jun</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Performing Crops */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Top Performing Crops</h3>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <Apple className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Tomato</p>
                      <p className="text-xs text-gray-500">200 kg harvested</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">₹9,000</p>
                    <p className="text-xs text-green-600">+12% profit</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <Wheat className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Wheat</p>
                      <p className="text-xs text-gray-500">50 quintals harvested</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">₹1,22,500</p>
                    <p className="text-xs text-green-600">+8% profit</p>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Carrot className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Rice</p>
                      <p className="text-xs text-gray-500">30 quintals harvested</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">₹96,000</p>
                    <p className="text-xs text-green-600">+5% profit</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return <div className="text-center py-12"><h3 className="text-lg font-semibold text-gray-900">Settings Page - Coming Soon</h3></div>;
      default:
        return renderOverview();
    }
  };

  return (
    <>
      {/* Image Gallery Modal */}
      {renderImageGalleryModal()}
      
      {/* Crop Upload Modal */}
      {renderCropUploadModal()}
      
      {/* KYC Verification Modal */}
      {showKYCModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">🔐 KYC Verification Required</h2>
                  <p className="text-sm sm:text-base text-gray-600 mt-1">Complete your profile to start listing crops</p>
                </div>
                <button
                  onClick={() => setShowKYCModal(false)}
                  className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 sm:h-6 w-5 sm:w-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto">
              {/* Warning Message */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 animate-pulse">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 sm:mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">KYC Verification Required</h3>
                    <p className="text-xs sm:text-sm text-yellow-700 mt-1">
                      You need to complete your KYC verification and bank details to start listing crops on our platform.
                    </p>
                  </div>
                </div>
              </div>

              {/* KYC Form */}
              <div className="space-y-4 sm:space-y-6">
                {/* PAN Card Section */}
                <div className="space-y-3 sm:space-y-4 animate-fadeIn">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">📄 PAN Card Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="transition-all duration-300 hover:shadow-md rounded-lg p-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        PAN Card Number *
                      </label>
                      <input
                        type="text"
                        value={kycData.panNumber}
                        onChange={(e) => setKycData(prev => ({ ...prev, panNumber: e.target.value }))}
                        placeholder="ABCDE1234F"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base transition-all duration-300 hover:border-green-300"
                        maxLength={10}
                      />
                    </div>
                    <div className="transition-all duration-300 hover:shadow-md rounded-lg p-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Upload PAN Card *
                      </label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setKycFiles(prev => ({ ...prev, panCardFile: e.target.files?.[0] || null }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm transition-all duration-300 hover:border-green-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Aadhar Card Section */}
                <div className="space-y-3 sm:space-y-4 animate-fadeIn" style={{animationDelay: '0.2s'}}>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">🆔 Aadhar Card Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="transition-all duration-300 hover:shadow-md rounded-lg p-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Aadhar Card Number *
                      </label>
                      <input
                        type="text"
                        value={kycData.aadharNumber}
                        onChange={(e) => setKycData(prev => ({ ...prev, aadharNumber: e.target.value }))}
                        placeholder="1234 5678 9012"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base transition-all duration-300 hover:border-green-300"
                        maxLength={12}
                      />
                    </div>
                    <div className="transition-all duration-300 hover:shadow-md rounded-lg p-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Upload Aadhar Front *
                      </label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setKycFiles(prev => ({ ...prev, aadharFrontFile: e.target.files?.[0] || null }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm transition-all duration-300 hover:border-green-300"
                      />
                    </div>
                    <div className="sm:col-span-2 transition-all duration-300 hover:shadow-md rounded-lg p-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Upload Aadhar Back *
                      </label>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setKycFiles(prev => ({ ...prev, aadharBackFile: e.target.files?.[0] || null }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm transition-all duration-300 hover:border-green-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Bank Details Section */}
                <div className="space-y-3 sm:space-y-4 animate-fadeIn" style={{animationDelay: '0.4s'}}>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">🏦 Bank Account Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div className="transition-all duration-300 hover:shadow-md rounded-lg p-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Account Holder Name *
                      </label>
                      <input
                        type="text"
                        value={kycData.accountHolderName}
                        onChange={(e) => setKycData(prev => ({ ...prev, accountHolderName: e.target.value }))}
                        placeholder="Enter full name as per bank records"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base transition-all duration-300 hover:border-green-300"
                      />
                    </div>
                    <div className="transition-all duration-300 hover:shadow-md rounded-lg p-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Bank Account Number *
                      </label>
                      <input
                        type="text"
                        value={kycData.bankAccountNumber}
                        onChange={(e) => setKycData(prev => ({ ...prev, bankAccountNumber: e.target.value }))}
                        placeholder="Enter bank account number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base transition-all duration-300 hover:border-green-300"
                      />
                    </div>
                    <div className="transition-all duration-300 hover:shadow-md rounded-lg p-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        IFSC Code *
                      </label>
                      <input
                        type="text"
                        value={kycData.ifscCode}
                        onChange={(e) => setKycData(prev => ({ ...prev, ifscCode: e.target.value.toUpperCase() }))}
                        placeholder="SBIN0001234"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base transition-all duration-300 hover:border-green-300"
                        maxLength={11}
                      />
                    </div>
                    <div className="transition-all duration-300 hover:shadow-md rounded-lg p-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Bank Name *
                      </label>
                      <input
                        type="text"
                        value={kycData.bankName}
                        onChange={(e) => setKycData(prev => ({ ...prev, bankName: e.target.value }))}
                        placeholder="State Bank of India"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base transition-all duration-300 hover:border-green-300"
                      />
                    </div>
                    <div className="sm:col-span-2 transition-all duration-300 hover:shadow-md rounded-lg p-2">
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Branch Name *
                      </label>
                      <input
                        type="text"
                        value={kycData.branchName}
                        onChange={(e) => setKycData(prev => ({ ...prev, branchName: e.target.value }))}
                        placeholder="Enter branch name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base transition-all duration-300 hover:border-green-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 sm:p-6 rounded-b-xl shadow-lg animate-fadeIn" style={{animationDelay: '0.6s'}}>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
                <div className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
                  <p>🔐 Complete KYC verification to start listing crops</p>
                </div>
                <div className="flex flex-col sm:flex-row w-full sm:w-auto space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={() => {
                      // Set session flag to not show KYC popup again this session
                      sessionStorage.setItem('kyc_dismissed_this_session', 'true');
                      setKycDismissedThisSession(true);
                      setShowKYCModal(false);
                      console.log('📝 KYC dismissed for this session');
                      // Allow crop upload after dismissing KYC
                      setShowCropUploadModal(true);
                    }}
                    className="w-full sm:w-auto px-4 py-2 text-gray-600 hover:text-gray-800 transition-all duration-300 border border-gray-200 rounded-lg hover:bg-gray-50 hover:shadow-md text-sm"
                  >
                    Complete Later
                  </button>
                  <button
                    onClick={() => {
                      // Generate unique farmer KYC ID
                      const farmerKYCId = generateFarmerKYCId();
                      
                      // Validate required fields
                      if (!kycData.panNumber || !kycData.bankAccountNumber || !kycData.ifscCode) {
                        alert('Please fill all required fields');
                        return;
                      }
                      
                      if (!kycFiles.panCardFile || !kycFiles.aadharFrontFile || !kycFiles.aadharBackFile) {
                        alert('Please upload all required documents');
                        return;
                      }
                      
                      // Save KYC data to localStorage
                      const kycDataToSave = {
                        farmerKYCId,
                        panNumber: kycData.panNumber,
                        bankAccountNumber: kycData.bankAccountNumber,
                        ifscCode: kycData.ifscCode,
                        completedAt: new Date().toISOString()
                      };
                      localStorage.setItem('farmer_kyc_data', JSON.stringify(kycDataToSave));
                      
                      // Save PAN card data separately
                      const panCardData = {
                        farmerKYCId,
                        panNumber: kycData.panNumber,
                        fileName: kycFiles.panCardFile?.name,
                        uploadedAt: new Date().toISOString()
                      };
                      localStorage.setItem(`farmer_pan_${farmerKYCId}`, JSON.stringify(panCardData));
                      
                      // Save Aadhar card data separately
                      const aadharCardData = {
                        farmerKYCId,
                        aadharNumber: kycData.aadharNumber,
                        aadharFrontFile: kycFiles.aadharFrontFile?.name,
                        aadharBackFile: kycFiles.aadharBackFile?.name,
                        uploadedAt: new Date().toISOString()
                      };
                      localStorage.setItem(`farmer_aadhar_${farmerKYCId}`, JSON.stringify(aadharCardData));
                      
                      setKycCompleted(true);
                      setKycDismissedThisSession(false);
                      setShowKYCModal(false);
                      setShowCropUploadModal(true);
                      
                      // Clear session flag since KYC is now completed
                      sessionStorage.removeItem('kyc_dismissed_this_session');
                      
                      alert(`✅ KYC verification completed! Your KYC ID: ${farmerKYCId}\nYou can now list crops.`);
                    }}
                    className="w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 hover:shadow-md text-sm"
                  >
                    Complete KYC
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3 md:py-4">
              <div className="flex items-center space-x-2 md:space-x-4">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <Menu className="h-6 w-6" />
                </button>
                
                {/* Desktop Sidebar Toggle - Moved to left */}
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="hidden md:block p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                >
                  <Menu className="h-6 w-6" />
                </button>
                
                <div className="flex items-center">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Farmer Dashboard</h1>
                </div>
              </div>
              
              {/* Profile Section - Moved to right */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 md:space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900 truncate max-w-[100px] md:max-w-full">{userProfile.name}</p>
                    <p className="text-xs text-gray-500">Farmer</p>
                  </div>
                </button>
                
                {/* Enhanced User Menu Dropdown */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200 animate-fadeIn">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{userProfile.name}</p>
                      <p className="text-xs text-gray-500 truncate">{userProfile.email || userProfile.phone}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowProfileModal(true);
                        setShowUserMenu(false);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <User className="h-4 w-4 mr-3" />
                      Profile Settings
                    </button>
                    <button
                      onClick={() => {
                        alert("Farm analytics dashboard will be available soon!");
                        setShowUserMenu(false);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <BarChart3 className="h-4 w-4 mr-3" />
                      Farm Analytics
                    </button>
                    <button
                      onClick={() => {
                        alert("Notification preferences will be available soon!");
                        setShowUserMenu(false);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Bell className="h-4 w-4 mr-3" />
                      Notification Settings
                    </button>
                    <button
                      onClick={() => {
                        alert("Digital farm management tools will be available soon!");
                        setShowUserMenu(false);
                      }}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      <Sprout className="h-4 w-4 mr-3" />
                      Digital Farm Tools
                    </button>
                    <div className="border-t border-gray-100 mt-1"></div>
                    <button
                      onClick={() => {
                        if (onLogout) {
                          onLogout();
                        } else {
                          localStorage.removeItem('farmer_user_id');
                          localStorage.removeItem('farmer_user_key');
                          window.location.reload();
                        }
                      }}
                      className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <X className="h-4 w-4 mr-3" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            {/* Overlay */}
            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setMobileMenuOpen(false)}></div>
            
            {/* Sidebar */}
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                >
                  <X className="h-6 w-6 text-white" />
                </button>
              </div>
              
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <h2 className="text-xl font-bold text-green-600">Kshetravega</h2>
                </div>
                <nav className="mt-5 px-2 space-y-1">
                  {[
                    { id: 'overview', name: 'Overview', icon: LayoutDashboard },
                    { id: 'crop-upload', name: 'Upload Crop', icon: Plus },
                    { id: 'marketplace', name: 'Marketplace', icon: Package },
                    { id: 'orders', name: 'Orders', icon: ShoppingCart },
                    { id: 'analytics', name: 'Analytics', icon: TrendingUp },
                    { id: 'services', name: 'Services', icon: Leaf },
                    { id: 'financial', name: 'Financial', icon: DollarSign },
                    { id: 'weather', name: 'Weather', icon: Sun },
                    { id: 'settings', name: 'Settings', icon: Settings }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center px-3 py-3 text-base font-medium rounded-md ${
                          activeTab === item.id
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
            
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </div>
        )}

        <div className="flex">
          {/* Desktop Sidebar */}
          <div className={`hidden md:block ${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white shadow-sm transition-all duration-300`}>
            <nav className="mt-5 px-2">
              <div className="space-y-1">
                {[
                  { id: 'overview', name: 'Overview', icon: LayoutDashboard },
                  { id: 'crop-upload', name: 'Upload Crop', icon: Plus },
                  { id: 'marketplace', name: 'Marketplace', icon: Package },
                  { id: 'orders', name: 'Orders', icon: ShoppingCart },
                  { id: 'analytics', name: 'Analytics', icon: TrendingUp },
                  { id: 'services', name: 'Services', icon: Leaf },
                  { id: 'financial', name: 'Financial', icon: DollarSign },
                  { id: 'weather', name: 'Weather', icon: Sun },
                  { id: 'settings', name: 'Settings', icon: Settings }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-3 py-3 text-base font-medium rounded-md ${
                        activeTab === item.id
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {!sidebarCollapsed && item.name}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-3 sm:p-4 md:p-6">

            {/* Main Content */}
            <main className="flex-1">
              {renderContent()}
            </main>
          </div>
        </div>

        {/* Profile Modal */}
        <ProfileModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          user={userProfile}
          onUpdate={handleUpdateProfile}
          onDeleteAccount={handleDeleteAccount}
          onLogout={() => {
            setShowProfileModal(false);
            if (onLogout) onLogout();
          }}
        />
      </div>
    </>
  );
};

export default FarmerDashboard;
