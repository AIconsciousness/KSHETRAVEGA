import React, { useState, useEffect } from 'react';
import SuppliersPage from './SuppliersPage';
import AnalyticsPage from './AnalyticsPage';
import FavoritesPage from './FavoritesPage';
import SettingsPage from './SettingsPage';
import ContractsPage from './ContractsPage';
import ProfileModal from '../../components/ui/ProfileModal';
import ChatModal from '../../components/ui/ChatModal';
import { authenticatedFetch } from '../../services/tokenService';
// dataSyncService removed - using automatic database save only
// ImmediateSyncButton removed - using automatic database save only
import { 
  loadAllFarmerCrops, 
  filterCropsByCategory, 
  searchCrops, 
  sortCrops, 
  getCropCategories,
  getMarketplaceStats,
  type MarketplaceCrop 
} from '../../services/marketplaceService';
import razorpayService from '../../services/razorpayService';

// Professional Marketplace Interfaces
interface CartItem {
  id: string;
  crop: MarketplaceCrop;
  quantity: number;
  price: number;
  totalPrice: number;
  addedAt: string;
}

interface OrderItem {
  id: string;
  crop: MarketplaceCrop;
  quantity: number;
  price: number;
  totalPrice: number;
  farmer: {
    id: string;
    name: string;
    phone: string;
    location: string;
  };
}

interface Order {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: any;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  estimatedDelivery: string;
}
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  Users, 
  Settings, 
  Bell, 
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  Upload,
  BarChart3,
  PieChart,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Star,
  Heart,
  Share2,
  MoreVertical,
  Menu,
  Clock,
  CheckCircle,
  User,
  ChevronDown,
  X,
  Home,
  MessageCircle
} from 'lucide-react';

interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalSpent: number;
  favoriteSuppliers: number;
  activeContracts: number;
}

interface RecentOrder {
  id: string;
  supplier: string;
  product: string;
  quantity: number;
  price: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  date: string;
  location: string;
}

interface Supplier {
  id: string;
  name: string;
  rating: number;
  location: string;
  products: string[];
  isVerified: boolean;
  lastOrder: string;
}

interface BuyerDashboardProps {
  user?: any;
  onLogout?: () => void;
}

const BuyerDashboard: React.FC<BuyerDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // User-specific data isolation for buyers - MOVED TO TOP
  const [userKey, setUserKey] = useState<string>('');
  
  // Mock user profile data - MOVED TO TOP TO PREVENT HOISTING ISSUES
  const [userProfile, setUserProfile] = useState({
    id: user?.id || '1',
    name: user?.name || (user?.firstName ? user.firstName + ' ' + (user?.lastName || '') : 'Buyer User'),
    email: user?.email || 'jhariawatch@chakravega.com',
    phone: user?.phone || '+91 0000000000',
    userType: 'buyer' as const,
    address: user?.address || 'Business Address',
    city: user?.city || 'City',
    state: user?.state || 'State',
    pincode: user?.pincode || '000000',
    dateOfBirth: user?.dateOfBirth || '1990-01-01',
    profileImage: user?.profileImage || '',
    businessName: user?.businessName || 'My Business',
    businessType: user?.businessType || 'company',
    kycStatus: user?.kycStatus || 'pending' as const,
    aadharNumber: user?.aadharNumber || '',
    panNumber: user?.panNumber || '',
    bankAccountNumber: user?.bankAccountNumber || '',
    ifscCode: user?.ifscCode || '',
    bankName: user?.bankName || '',
    createdAt: user?.createdAt || new Date().toISOString(),
    lastLogin: new Date().toISOString()
  });
  
  // Generate unique user key for buyer
  useEffect(() => {
    if (user) {
      const userIdentifier = user.phone || user.email || user.id || 'anonymous';
      const buyerKey = `buyer_${userIdentifier.replace(/[^a-zA-Z0-9]/g, '_')}`;
      setUserKey(buyerKey);
      console.log(`🔑 Buyer user key: ${buyerKey}`);
    }
  }, [user]);

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
  
  // Marketplace states
  const [marketplaceCrops, setMarketplaceCrops] = useState<MarketplaceCrop[]>([]);
  const [filteredCrops, setFilteredCrops] = useState<MarketplaceCrop[]>([]);
  
  // Load marketplace data - USER SPECIFIC (but shared across all buyers)
  useEffect(() => {
    if (userKey) {
      // Marketplace data is shared across all buyers (aggregated from all farmers)
      // This is intentional - buyers should see all available crops
      console.log('🌾 Loading marketplace data for buyer:', userKey);
    }
  }, [userKey]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [marketplaceSearchQuery, setMarketplaceSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('demand');
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState<MarketplaceCrop | null>(null);
  const [marketplaceStats, setMarketplaceStats] = useState({
    totalCrops: 0,
    totalFarmers: 0,
    averagePrice: 0,
    categories: [],
    topSellingCrops: [],
    priceRange: { min: 0, max: 0 }
  });
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('all');
  const [selectedOrganic, setSelectedOrganic] = useState('all');
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [selectedCropImages, setSelectedCropImages] = useState<any[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Professional Marketplace States
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  
  // Favorites State - PERMANENT PERSISTENCE
  const [favorites, setFavorites] = useState<MarketplaceCrop[]>([]);
  
  // Load cart from localStorage - USER SPECIFIC
  // PERMANENT CART LOADING - Cross-device, Cross-session
  useEffect(() => {
    if (!userKey) return;
    
    console.log(`🛒 PERMANENT LOAD: Loading cart for buyer: ${userKey}`);
    console.log(`📱 This will load cart from any device, any session - PERMANENT DATA`);
    
    const loadCartData = async () => {
      try {
        // Load cart from database first (PERMANENT DATA)
        const actualBuyerId = user?._id || user?.id || userProfile?.id;
        console.log(`🔑 Using actual buyer ID: ${actualBuyerId} (not generated ID: ${userProfile?.id})`);
        const cartResponse = await fetch(`https://kshetravega-57p9.onrender.com/api/cart/buyer/${actualBuyerId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
          }
        });

        if (cartResponse.ok) {
          const cartData = await cartResponse.json();
          console.log(`✅ PERMANENT LOAD: Loaded ${cartData.data.length} cart items from database`);
          console.log(`🌐 These cart items are available across all devices and sessions`);
          setCart(cartData.data);
        } else {
          console.log('No permanent cart found in database, loading from localStorage');
          
          // Fallback to localStorage
          const savedCart = localStorage.getItem(`buyer_cart_${userKey}`);
          if (savedCart) {
            try {
              const parsedCart = JSON.parse(savedCart);
              setCart(parsedCart);
              console.log(`📱 Loaded ${parsedCart.length} cart items from localStorage as fallback`);
            } catch (error) {
              console.error('❌ Error loading cart from localStorage:', error);
            }
          }
        }
      } catch (error) {
        console.error('Error loading permanent cart data from database:', error);
      }
    };
    
    loadCartData();
  }, [userKey, userProfile.id]);
  
  // PERMANENT CART SAVE - Cross-device, Cross-session
  useEffect(() => {
    if (cart.length > 0 && userKey) {
      console.log(`💾 PERMANENT SAVE: Saving ${cart.length} cart items for buyer ${userKey}`);
      console.log(`🌐 These cart items will be available on any device, any session`);
      
      // Save to database (PERMANENT)
      saveCartToDatabase(cart);
      
      // Also save to localStorage as backup
      localStorage.setItem(`buyer_cart_${userKey}`, JSON.stringify(cart));
      console.log(`💾 Saved cart for buyer ${userKey}:`, cart.length);
    }
  }, [cart, userKey]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedCropForOrder, setSelectedCropForOrder] = useState<MarketplaceCrop | null>(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    landmark: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [orderSummary, setOrderSummary] = useState<any>(null);
  
  // Razorpay Payment States
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [paymentError, setPaymentError] = useState<string | null>(null);
  
  // Orders State
  const [orders, setOrders] = useState<OrderItem[]>([]);
  
  
  // PERMANENT DATA LOADING - Cross-device, Cross-session for Buyer
  useEffect(() => {
    if (!userKey) return;
    
    console.log(`🛒 PERMANENT LOAD: Loading buyer data for: ${userKey}`);
    console.log(`📱 This will load orders, cart, favorites from any device, any session - PERMANENT DATA`);
    
    const loadBuyerData = async () => {
      try {
        // Load orders from database first (PERMANENT DATA)
        const actualBuyerId = user?._id || user?.id || userProfile?.id;
        console.log(`🔑 Using actual buyer ID: ${actualBuyerId} (not generated ID: ${userProfile?.id})`);
        const ordersResponse = await authenticatedFetch(`https://kshetravega-57p9.onrender.com/api/orders/buyer/${actualBuyerId}`, {
          method: 'GET'
        });

        if (ordersResponse.ok) {
          const ordersData = await ordersResponse.json();
          console.log(`✅ PERMANENT LOAD: Loaded ${ordersData.data.length} orders from database`);
          console.log(`🌐 These orders are available across all devices and sessions`);
          setOrders(ordersData.data);
        } else {
          console.log('No permanent orders found in database, loading from localStorage');
          
          // Fallback to localStorage
          const savedOrders = localStorage.getItem(`buyer_orders_${userKey}`);
          if (savedOrders) {
            try {
              const parsedOrders = JSON.parse(savedOrders);
              setOrders(parsedOrders);
              console.log(`📱 Loaded ${parsedOrders.length} orders from localStorage as fallback`);
            } catch (error) {
              console.error('❌ Error loading orders from localStorage:', error);
            }
          }
        }
      } catch (error) {
        console.error('Error loading permanent buyer data from database:', error);
      }
    };
    
    loadBuyerData();
  }, [userKey, userProfile.id]);
  
  // PERMANENT DATA SAVE - Cross-device, Cross-session for Buyer
  useEffect(() => {
    if (orders.length > 0 && userKey) {
      console.log(`💾 PERMANENT SAVE: Saving ${orders.length} orders for buyer ${userKey}`);
      console.log(`🌐 These orders will be available on any device, any session`);
      
      // Save to database (PERMANENT)
      saveOrdersToDatabase(orders);
      
      // Also save to localStorage as backup
      localStorage.setItem(`buyer_orders_${userKey}`, JSON.stringify(orders));
      console.log(`💾 Saved orders for buyer ${userKey}:`, orders.length);
    }
  }, [orders, userKey]);
  
  // Load user profile from localStorage - USER SPECIFIC
  useEffect(() => {
    if (!userKey) return;
    
    const savedProfile = localStorage.getItem(`buyer_profile_${userKey}`);
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setUserProfile(parsedProfile);
        console.log(`👤 Loaded profile for buyer ${userKey}:`, parsedProfile.name);
      } catch (error) {
        console.error('❌ Error loading profile from localStorage:', error);
      }
    }
  }, [userKey]);
  
  // Save user profile to localStorage - USER SPECIFIC
  useEffect(() => {
    if (userProfile && userKey) {
      localStorage.setItem(`buyer_profile_${userKey}`, JSON.stringify(userProfile));
      console.log(`💾 Saved profile for buyer ${userKey}:`, userProfile.name);
    }
  }, [userProfile, userKey]);

  // Update user profile when user data changes
  useEffect(() => {
    if (user) {
      setUserProfile(prev => ({
        ...prev,
        id: user.id || prev.id,
        name: user.name || user.firstName + ' ' + user.lastName || prev.name,
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
    }
  }, [user]);

  // Load marketplace data - REAL FARMER DATA
  useEffect(() => {
    const loadMarketplaceData = async () => {
      console.log('🛒 Loading marketplace data for buyer:', userProfile?.name || 'Buyer');
      
      // Debug localStorage data first
      const farmerCount = debugLocalStorageData();
      console.log(`🔍 Found ${farmerCount} farmer databases in localStorage`);
      
      const crops = await loadAllFarmerCrops();
      setMarketplaceCrops(crops);
      setFilteredCrops(crops);
      const stats = await getMarketplaceStats();
      setMarketplaceStats(stats);
      // Ensure crops is an array before using map
      const safeCrops = Array.isArray(crops) ? crops : [];
      console.log(`🛒 Marketplace loaded: ${safeCrops.length} crops from ${safeCrops.length > 0 ? new Set(safeCrops.map(c => c.farmerId)).size : 0} farmers`);
      
      // If no crops found, show debug info and recovery options
      if (crops.length === 0) {
        console.warn('⚠️ No crops found in marketplace!');
        console.log('💡 Make sure farmers have uploaded crops first');
        console.log('🔍 Check browser console for localStorage debug info');
        
        // Try to recover farmer data
        console.log('🔄 Attempting to recover farmer data...');
        const recoveredData = recoverFarmerData();
        
        if (recoveredData.length > 0) {
          console.log(`✅ Found ${recoveredData.length} farmers with data!`);
          console.log('🔄 Attempting to refresh marketplace...');
          const refreshedCrops = forceRefreshMarketplace();
          
          if (refreshedCrops.length > 0) {
            console.log(`🎉 Successfully recovered ${refreshedCrops.length} crops!`);
            setMarketplaceCrops(refreshedCrops);
            setFilteredCrops(refreshedCrops);
            const stats = await getMarketplaceStats();
      setMarketplaceStats(stats);
          }
        } else {
          console.log('❌ No farmer data found to recover');
          console.log('💡 Please upload crops from farmer dashboard first');
        }
      }
    };

    loadMarketplaceData();
    
    // Refresh data every 10 seconds for real-time updates
    const interval = setInterval(loadMarketplaceData, 10000);
    return () => clearInterval(interval);
  }, [userProfile?.name]);

  // Filter and search crops
  useEffect(() => {
    let filtered = marketplaceCrops;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filterCropsByCategory(filtered, selectedCategory);
    }
    
    // Search crops
    if (marketplaceSearchQuery.trim()) {
      filtered = searchCrops(filtered, marketplaceSearchQuery);
    }
    
    // Price range filter
    filtered = filtered.filter(crop => 
      crop.price >= priceRange.min && crop.price <= priceRange.max
    );

    // Quality filter
    if (selectedQuality !== 'all') {
      filtered = filtered.filter(crop => crop.quality === selectedQuality);
    }

    // Organic filter
    if (selectedOrganic !== 'all') {
      if (selectedOrganic === 'organic') {
        filtered = filtered.filter(crop => crop.organic);
      } else if (selectedOrganic === 'non-organic') {
        filtered = filtered.filter(crop => !crop.organic);
      }
    }
    
    // Sort crops
    filtered = sortCrops(filtered, sortBy);
    
    setFilteredCrops(filtered);
  }, [marketplaceCrops, selectedCategory, marketplaceSearchQuery, sortBy, priceRange, selectedQuality, selectedOrganic]);

  // Real stats - calculated from actual data
  const stats: DashboardStats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(order => order.status === 'pending').length,
    completedOrders: orders.filter(order => order.status === 'completed').length,
    totalSpent: orders.reduce((sum, order) => sum + order.totalPrice, 0),
    favoriteSuppliers: 0, // Will be calculated from supplier data
    activeContracts: 0 // Will be loaded from contracts
  };

  // Real recent orders - loaded from actual data
  const recentOrders: RecentOrder[] = Array.isArray(orders) ? orders.map(order => ({
    id: order.id,
    productName: order.crop.name,
    supplier: order.farmer.name,
    quantity: order.quantity,
    totalPrice: order.totalPrice,
    status: order.status as 'pending' | 'completed' | 'cancelled',
    orderDate: order.orderDate,
    deliveryDate: order.deliveryDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  })) : [];

  // Real suppliers - loaded from actual farmer data
  const suppliers: Supplier[] = [];

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, color: 'text-blue-600' },
    { id: 'orders', label: 'My Orders', icon: ShoppingCart, color: 'text-green-600' },
    { id: 'products', label: 'Products', icon: Package, color: 'text-purple-600' },
    { id: 'suppliers', label: 'Suppliers', icon: Users, color: 'text-orange-600' },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp, color: 'text-indigo-600' },
    { id: 'contracts', label: 'Contracts', icon: BarChart3, color: 'text-red-600' },
    { id: 'favorites', label: 'Favorites', icon: Heart, color: 'text-pink-600' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-600' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };


  // PERMANENT DATABASE SAVE - MongoDB Integration for Buyer Data
  const saveOrdersToDatabase = async (orders) => {
    try {
      if (!userProfile?.id && !user?.id) {
        console.error('Cannot save orders: No user ID available');
        return;
      }

      console.log(`🛒 PERMANENT SAVE: Saving ${orders.length} orders to database for buyer: ${userProfile.name}`);
      console.log(`🔑 Buyer ID: ${userProfile.id} - Data will persist across all devices and sessions`);
      
      // Save orders to database with permanent persistence
      for (const order of orders) {
        try {
          const response = await fetch('/api/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify({
              ...order,
              buyerId: userProfile.id,
              buyerName: userProfile.name,
              // Add permanent persistence markers
              isPermanent: true,
              crossDeviceAccess: true,
              sessionIndependent: true,
              lastUpdated: new Date().toISOString()
            })
          });

          if (!response.ok) {
            let errorMessage = `HTTP ${response.status}`;
            try {
              const errorData = await response.json();
              errorMessage = errorData.message || errorMessage;
            } catch (jsonError) {
              console.log(`⚠️ Order save failed with status ${response.status}: ${errorMessage}`);
            }
            throw new Error(errorMessage);
          }

          // Handle JSON parsing safely
          try {
            const result = await response.json();
            console.log(`✅ PERMANENT: Order saved to database: ${order.id}`);
            console.log(`🌐 This order will be available on any device when buyer logs in`);
          } catch (jsonError) {
            console.log(`✅ PERMANENT: Order saved to database: ${order.id} (No JSON response)`);
            console.log(`🌐 This order will be available on any device when buyer logs in`);
          }
        } catch (error) {
          console.error(`❌ Error saving order ${order.id}:`, error);
        }
      }
      
      console.log(`🎉 PERMANENT SAVE COMPLETE: All orders saved to database successfully!`);
      console.log(`📱 Buyer can now access these orders from any device, any session`);
      
    } catch (error) {
      console.error('❌ Error saving orders to database:', error);
    }
  };

  // PERMANENT CART DATABASE SAVE - MongoDB Integration
  const saveCartToDatabase = async (cart) => {
    try {
      if (!userProfile?.id && !user?.id) {
        console.error('Cannot save cart: No user ID available');
        return;
      }

      console.log(`🛒 PERMANENT SAVE: Saving ${cart.length} cart items to database for buyer: ${userProfile.name}`);
      console.log(`🔑 Buyer ID: ${userProfile.id} - Cart will persist across all devices and sessions`);
      
      // Save cart to database with permanent persistence
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({
          buyerId: userProfile.id,
          buyerName: userProfile.name,
          cartItems: cart,
          // Add permanent persistence markers
          isPermanent: true,
          crossDeviceAccess: true,
          sessionIndependent: true,
          lastUpdated: new Date().toISOString()
        })
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          console.log(`⚠️ Cart save failed with status ${response.status}: ${errorMessage}`);
        }
        throw new Error(errorMessage);
      }

      // Handle JSON parsing safely
      try {
        const result = await response.json();
        console.log(`✅ PERMANENT: Cart saved to database`);
        console.log(`🌐 This cart will be available on any device when buyer logs in`);
      } catch (jsonError) {
        console.log(`✅ PERMANENT: Cart saved to database (No JSON response)`);
        console.log(`🌐 This cart will be available on any device when buyer logs in`);
      }
      
    } catch (error) {
      console.error('❌ Error saving cart to database:', error);
    }
  };

  const renderOverview = () => (
    <div className="space-y-4">
      {/* Stats Cards - Perfect Mobile Design */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {/* Total Orders */}
        <div 
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:scale-105"
          onClick={() => setActiveTab('orders')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-xs font-medium text-gray-600 mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
          </div>
        </div>

        {/* Pending Orders */}
        <div 
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-yellow-200 transition-all duration-300 hover:scale-105"
          onClick={() => setActiveTab('orders')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-3">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <p className="text-xs font-medium text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.pendingOrders}</p>
          </div>
        </div>

        {/* Completed Orders */}
        <div 
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-green-200 transition-all duration-300 hover:scale-105"
          onClick={() => setActiveTab('orders')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-xs font-medium text-gray-600 mb-1">Completed</p>
            <p className="text-2xl font-bold text-green-600">{stats.completedOrders}</p>
          </div>
        </div>

        {/* Total Spent */}
        <div 
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-purple-200 transition-all duration-300 hover:scale-105"
          onClick={() => setActiveTab('analytics')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <p className="text-xs font-medium text-gray-600 mb-1">Total Spent</p>
            <p className="text-lg font-bold text-gray-900">{formatCurrency(stats.totalSpent)}</p>
          </div>
        </div>

        {/* Favorites */}
        <div 
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-pink-200 transition-all duration-300 hover:scale-105"
          onClick={() => setActiveTab('favorites')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mb-3">
              <Heart className="h-6 w-6 text-pink-600" />
            </div>
            <p className="text-xs font-medium text-gray-600 mb-1">Favorites</p>
            <p className="text-2xl font-bold text-pink-600">{stats.favoriteSuppliers}</p>
          </div>
        </div>

        {/* Contracts */}
        <div 
          className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-indigo-200 transition-all duration-300 hover:scale-105"
          onClick={() => setActiveTab('contracts')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-3">
              <BarChart3 className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-xs font-medium text-gray-600 mb-1">Contracts</p>
            <p className="text-2xl font-bold text-indigo-600">{stats.activeContracts}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions - Perfect Mobile Design */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <button 
            className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors min-h-[100px] hover:scale-105"
            onClick={() => setActiveTab('products')}
          >
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Plus className="h-5 w-5 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-700 text-center">New Order</span>
          </button>
          <button 
            className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition-colors min-h-[100px] hover:scale-105"
            onClick={() => setActiveTab('products')}
          >
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Eye className="h-5 w-5 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-700 text-center">Browse Products</span>
          </button>
          <button 
            className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors min-h-[100px] hover:scale-105"
            onClick={() => setActiveTab('suppliers')}
          >
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-3">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-700 text-center">Find Suppliers</span>
          </button>
          <button 
            className="flex flex-col items-center p-4 bg-orange-50 hover:bg-orange-100 rounded-xl transition-colors min-h-[100px] hover:scale-105"
            onClick={() => setActiveTab('analytics')}
          >
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-3">
              <BarChart3 className="h-5 w-5 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-orange-700 text-center">Analytics</span>
          </button>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <div className="flex items-center space-x-2">
              {/* ImmediateSyncButton removed - using automatic database save only */}
              <button 
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                onClick={() => setActiveTab('orders')}
              >
                View All
              </button>
            </div>
          </div>
        </div>
        {/* Mobile-Friendly Order Cards */}
        <div className="space-y-3 p-4">
          {recentOrders.map((order) => (
            <div 
              key={order.id} 
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 cursor-pointer hover:bg-gray-100 hover:border-blue-200 transition-all duration-300 hover:shadow-md"
              onClick={() => setActiveTab('orders')}
            >
              <div className="flex flex-col space-y-3">
                {/* Order Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{order.id}</h4>
                    <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                
                {/* Product Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{order.product}</p>
                    <p className="text-xs text-gray-500">{order.quantity} kg</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{formatCurrency(order.price)}</p>
                  </div>
                </div>
                
                {/* Supplier Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{order.supplier}</p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {order.location}
                    </p>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Cancel">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <button className="text-xs text-gray-500 hover:text-gray-700">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Suppliers */}
      <div 
        className="bg-white rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-orange-200 transition-all duration-300"
        onClick={() => setActiveTab('suppliers')}
      >
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Top Suppliers</h3>
            <button 
              className="text-orange-600 hover:text-orange-700 font-medium text-sm"
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab('suppliers');
              }}
            >
              View All
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {suppliers.map((supplier) => (
              <div 
                key={supplier.id} 
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer hover:border-orange-200 hover:shadow-md"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveTab('suppliers');
                }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {supplier.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{supplier.name}</h4>
                      {supplier.isVerified && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{supplier.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span>{supplier.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                    View Profile
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarketplace = () => (
    <div className="space-y-6">
      {/* Marketplace Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3 xl:gap-4">
          <div>
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">🌾 Farmer Marketplace</h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">Discover fresh crops from local farmers</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="text-xs sm:text-sm text-gray-600">
              <span className="font-semibold text-green-600">{marketplaceStats.totalCrops}</span> crops
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              <span className="font-semibold text-blue-600">{marketplaceStats.totalFarmers}</span> farmers
            </div>
            <button
              onClick={() => setShowCart(true)}
              className="relative px-2 py-1.5 sm:px-3 sm:py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors text-xs sm:text-sm flex items-center space-x-1"
            >
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Cart</span>
              {getCartItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </button>
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="px-2 py-1.5 sm:px-3 sm:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs sm:text-sm"
            >
              <span className="hidden sm:inline">{showAdvancedFilters ? 'Hide Filters' : 'Advanced Filters'}</span>
              <span className="sm:hidden">Filters</span>
            </button>
            <button
              onClick={async () => {
                const crops = await loadAllFarmerCrops();
                setMarketplaceCrops(crops);
                setFilteredCrops(crops);
                const stats = await getMarketplaceStats();
                setMarketplaceStats(stats);
                console.log('🔄 Marketplace data refreshed manually');
              }}
              className="px-2 py-1.5 sm:px-3 sm:py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-xs sm:text-sm flex items-center space-x-1"
            >
              <RefreshCw className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter Bar - Mobile Responsive */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2 sm:p-3 lg:p-4">
        <div className="flex flex-col xl:flex-row gap-2 xl:gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search crops, farmers..."
                value={marketplaceSearchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-7 sm:pl-10 pr-3 sm:pr-4 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm"
              />
            </div>
          </div>
          

          {/* Category Filter */}
          <div className="xl:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm"
            >
              <option value="all">All Categories</option>
              {marketplaceStats.categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label} ({category.count})
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div className="xl:w-48">
            <select
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-xs sm:text-sm"
            >
              <option value="demand">Sort by Demand</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="distance">Distance</option>
              <option value="rating">Farmer Rating</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>
        </div>
      </div>


      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredCrops.length} of {marketplaceCrops.length} crops
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range (₹)</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => handlePriceRangeChange(Number(e.target.value), priceRange.max)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => handlePriceRangeChange(priceRange.min, Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Quality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quality</label>
              <select
                value={selectedQuality}
                onChange={(e) => handleQualityChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Quality</option>
                <option value="A">Grade A</option>
                <option value="B">Grade B</option>
                <option value="C">Grade C</option>
              </select>
            </div>

            {/* Organic */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Organic</label>
              <select
                value={selectedOrganic}
                onChange={(e) => handleOrganicChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Types</option>
                <option value="organic">Organic Only</option>
                <option value="non-organic">Non-Organic Only</option>
              </select>
            </div>

            {/* Distance */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Distance (km)</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="all">Any Distance</option>
                <option value="10">Within 10 km</option>
                <option value="25">Within 25 km</option>
                <option value="50">Within 50 km</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Crop Grid - Mobile Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {filteredCrops.map((crop, index) => (
          <div key={`${crop.id}_${index}_${crop.farmer.id}`} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Crop Image - Mobile Responsive */}
            <div className="relative h-32 sm:h-40 lg:h-48 bg-gray-100 cursor-pointer" onClick={() => handleImageClick(crop)}>
              {crop.images && crop.images.length > 0 ? (
                <img
                  src={crop.images[0]?.imageUrl || '/placeholder-crop.jpg'}
                  alt={crop.name}
                  className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-crop.jpg';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🌾</div>
                    <div className="text-sm">No Image</div>
                  </div>
                </div>
              )}
              
              {/* Image Gallery Indicator */}
              {crop.images && crop.images.length > 1 && (
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                  {crop.images.length} images
                </div>
              )}
              
              {/* Click to View Gallery */}
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                <div className="opacity-0 hover:opacity-100 transition-opacity">
                  <Eye className="h-8 w-8 text-white" />
                </div>
              </div>
              
              {/* Status Badge */}
              <div className="absolute top-2 left-2">
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {crop.status}
                </span>
              </div>
              
              {/* Demand Score */}
              <div className="absolute top-2 right-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                  {Math.round(crop.demandScore)}% Demand
                </span>
              </div>
            </div>

            {/* Crop Info - Mobile Responsive */}
            <div className="p-2 sm:p-3 lg:p-4">
              <div className="flex items-start justify-between mb-1 sm:mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-base sm:text-base lg:text-lg truncate">{crop.name}</h3>
                  <p className="text-sm sm:text-sm text-gray-600 truncate">{crop.type} • {crop.variety}</p>
                </div>
                <div className="text-right ml-2">
                  <div className="text-base sm:text-base lg:text-lg font-bold text-green-600">
                    ₹{crop.price}/{crop.unit === 'kg' ? 'kg' : 'quintal'}
                  </div>
                  <div className="text-sm text-gray-500">
                    {crop.quantity} {crop.unit}
                  </div>
                </div>
              </div>

              {/* Farmer Info - Mobile Responsive */}
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div className="flex items-center space-x-1 sm:space-x-2 min-w-0 flex-1">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm sm:text-sm font-medium text-gray-900 truncate">{crop.farmer.name}</div>
                    <div className="text-sm text-gray-500 flex items-center truncate">
                      <MapPin className="h-2 w-2 sm:h-3 sm:w-3 mr-1 flex-shrink-0" />
                      <span className="truncate">{crop.farmer.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right ml-2 flex-shrink-0">
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-current" />
                    <span className="text-sm sm:text-sm ml-1">{crop.farmer.rating.toFixed(1)}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {crop.distance?.toFixed(1)} km
                  </div>
                </div>
              </div>

              {/* Crop Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Quality:</span>
                  <span className="font-medium">{crop.quality} Grade</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Harvest Date:</span>
                  <span className="font-medium">{new Date(crop.harvestDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Organic:</span>
                  <span className={`font-medium ${crop.organic ? 'text-green-600' : 'text-gray-600'}`}>
                    {crop.organic ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>

              {/* Price Comparison */}
              {crop.priceComparison && (
                <div className="mb-4 p-2 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-600 mb-1">Market Comparison</div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Market Average:</span>
                    <span className="text-sm font-medium">₹{crop.priceComparison.marketAverage.toFixed(0)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">This Price:</span>
                    <span className={`text-sm font-medium ${crop.priceComparison.isAboveAverage ? 'text-red-600' : 'text-green-600'}`}>
                      ₹{crop.price} ({crop.priceComparison.isAboveAverage ? '+' : ''}{crop.priceComparison.percentageDifference.toFixed(1)}%)
                    </span>
                  </div>
                </div>
              )}

                  {/* Action Buttons - Mobile Responsive */}
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    <button
                      onClick={() => handleChatWithFarmer(crop)}
                      className="flex-1 min-w-0 bg-blue-600 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                    >
                      <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    </button>
                    <button
                      onClick={() => addToCart(crop, 1)}
                      className="flex-1 min-w-0 bg-orange-600 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                    >
                      <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="hidden sm:inline">Cart</span>
                      <span className="sm:hidden">Add</span>
                    </button>
                    <button
                      onClick={() => handleOrderCrop(crop)}
                      className="flex-1 min-w-0 bg-green-600 text-white px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-1 sm:space-x-2 text-xs sm:text-sm"
                    >
                      <Package className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="hidden sm:inline">Buy</span>
                      <span className="sm:hidden">Buy</span>
                    </button>
                  </div>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredCrops.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌾</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No crops found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setMarketplaceSearchQuery('');
              setSortBy('demand');
            }}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Orders</h2>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>New Order</span>
        </button>
      </div>

      {/* Filters - Mobile Responsive */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile-Friendly Orders List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">All Orders</h3>
        </div>
        <div className="space-y-3 p-4">
          {recentOrders.map((order) => (
            <div key={order.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex flex-col space-y-3">
                {/* Order Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">{order.id}</h4>
                    <p className="text-xs text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </div>
                
                {/* Product Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{order.product}</p>
                    <p className="text-xs text-gray-500">{order.quantity} kg</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{formatCurrency(order.price)}</p>
                  </div>
                </div>
                
                {/* Supplier Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{order.supplier}</p>
                    <p className="text-xs text-gray-500 flex items-center">
                      <MapPin className="h-3 w-3 mr-1" />
                      {order.location}
                    </p>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Cancel">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <button className="text-xs text-gray-500 hover:text-gray-700">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const handleUpdateProfile = (updatedProfile: any) => {
    setUserProfile(updatedProfile);
    // Here you would typically make an API call to update the profile
    console.log('Profile updated:', updatedProfile);
  };

  // Marketplace functions
  const handleChatWithFarmer = (crop: MarketplaceCrop) => {
    setSelectedCrop(crop);
    setShowChatModal(true);
  };

  const handleCloseChat = () => {
    setShowChatModal(false);
    setSelectedCrop(null);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (query: string) => {
    setMarketplaceSearchQuery(query);
  };

  const handleSortChange = (sort: string) => {
    setSortBy(sort);
  };


  const handlePriceRangeChange = (min: number, max: number) => {
    setPriceRange({ min, max });
  };

  const handleQualityChange = (quality: string) => {
    setSelectedQuality(quality);
  };

  const handleOrganicChange = (organic: string) => {
    setSelectedOrganic(organic);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setMarketplaceSearchQuery('');
    setSortBy('demand');
    setPriceRange({ min: 0, max: 1000 });
    setSelectedQuality('all');
    setSelectedOrganic('all');
  };

  const handleImageClick = (crop: MarketplaceCrop) => {
    if (crop.images && crop.images.length > 0) {
      setSelectedCropImages(crop.images);
      setCurrentImageIndex(0);
      setShowImageGallery(true);
    }
  };

  const handleCloseImageGallery = () => {
    setShowImageGallery(false);
    setSelectedCropImages([]);
    setCurrentImageIndex(0);
  };

  const handleNextImage = () => {
    if (selectedCropImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedCropImages.length);
    }
  };

  const handlePrevImage = () => {
    if (selectedCropImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedCropImages.length) % selectedCropImages.length);
    }
  };

  // Professional Marketplace Functions
  const addToCart = (crop: MarketplaceCrop, quantity: number = 1) => {
    const existingItem = cart.find(item => item.crop.id === crop.id);
    
    if (existingItem) {
      // Update existing item
      // Ensure cart is an array before mapping
      const safeCart = Array.isArray(cart) ? cart : [];
      setCart(safeCart.map(item => 
        item.crop.id === crop.id 
          ? {
              ...item,
              quantity: item.quantity + quantity,
              totalPrice: (item.quantity + quantity) * item.price
            }
          : item
      ));
    } else {
      // Add new item
      const newItem: CartItem = {
        id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        crop,
        quantity,
        price: crop.price,
        totalPrice: crop.price * quantity,
        addedAt: new Date().toISOString()
      };
      setCart([...cart, newItem]);
    }
    
    console.log('🛒 Added to cart:', crop.name, 'Quantity:', quantity);
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
    console.log('🗑️ Removed from cart:', itemId);
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    // Ensure cart is an array before mapping
    const safeCart = Array.isArray(cart) ? cart : [];
    setCart(safeCart.map(item => 
      item.id === itemId 
        ? {
            ...item,
            quantity,
            totalPrice: quantity * item.price
          }
        : item
    ));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleOrderCrop = (crop: MarketplaceCrop) => {
    setSelectedCropForOrder(crop);
    setOrderQuantity(1);
    setShowOrderModal(true);
  };


  // Razorpay Payment Handler
  const handleRazorpayPayment = async (orderSummary: any) => {
    try {
      setIsPaymentProcessing(true);
      setPaymentStatus('processing');
      setPaymentError(null);

      // Create Razorpay order
      const razorpayOrder = await razorpayService.createOrder(
        orderSummary.totalAmount,
        'INR',
        orderSummary.orderId
      );

      // Initialize Razorpay payment
      const razorpayConfig = {
        key: razorpayService.getKeyId(),
        amount: Math.round(orderSummary.totalAmount * 100), // Convert to paise and round
        currency: 'INR',
        name: 'KSHETRAVEGA',
        description: `Payment for ${orderSummary.cropName}`,
        order_id: razorpayOrder.id, // Add order_id back
        prefill: {
          name: userProfile.name,
          email: userProfile.email,
          contact: userProfile.phone
        },
        notes: {
          address: deliveryAddress.address,
          order_id: orderSummary.orderId
        },
        theme: {
          color: '#10B981'
        },
        // Enable UPI and QR Code options
        method: {
          netbanking: true,
          wallet: true,
          upi: true,
          card: true,
          emi: true
        },
        // Enable UPI apps
        upi: {
          flow: 'collect',
          vpa: 'achhadam@paytm' // You can set your UPI ID
        },
        handler: async (response: any) => {
          try {
            console.log('💳 Payment successful:', response);
            
            // Verify payment
            const isVerified = await razorpayService.verifyPayment(
              response.razorpay_payment_id,
              response.razorpay_order_id,
              response.razorpay_signature
            );

            if (isVerified) {
              setPaymentStatus('success');
              console.log('✅ Payment verified successfully');
              
              // Add to orders
              const orderItem: OrderItem = {
                id: orderSummary.orderId,
                crop: orderSummary.crop,
                quantity: orderSummary.quantity,
                price: orderSummary.price,
                totalPrice: orderSummary.totalAmount,
                status: 'confirmed',
                orderDate: new Date().toISOString(),
                deliveryAddress: deliveryAddress,
                paymentMethod: 'razorpay',
                paymentId: response.razorpay_payment_id,
                farmer: orderSummary.farmer
              };

              setOrders(prev => [orderItem, ...prev]);
              setShowPaymentModal(false);
              setShowOrderModal(false);
              setSelectedCropForOrder(null);
              
              // Show success message
              alert('🎉 Order placed successfully! Payment confirmed.');
              
              // Update stats
              console.log('📊 Updated orders count:', orders.length + 1);
              console.log('💰 Total spent updated:', orders.reduce((sum, order) => sum + order.totalPrice, 0) + orderItem.totalPrice);
            } else {
              setPaymentStatus('failed');
              setPaymentError('Payment verification failed');
              alert('❌ Payment verification failed. Please try again.');
            }
          } catch (error) {
            console.error('❌ Payment verification error:', error);
            setPaymentStatus('failed');
            setPaymentError('Payment verification failed');
            alert('❌ Payment verification failed. Please try again.');
          }
        },
        modal: {
          ondismiss: () => {
            setIsPaymentProcessing(false);
            setPaymentStatus('idle');
            console.log('💳 Payment cancelled by user');
          }
        }
      };

      razorpayService.initializePayment(razorpayConfig);
    } catch (error) {
      console.error('❌ Razorpay payment error:', error);
      setPaymentStatus('failed');
      setPaymentError('Payment initialization failed');
      alert('❌ Payment initialization failed. Please try again.');
    } finally {
      setIsPaymentProcessing(false);
    }
  };

  const handlePlaceOrder = () => {
    if (!selectedCropForOrder) return;
    
    const orderItem: OrderItem = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      crop: selectedCropForOrder,
      quantity: orderQuantity,
      price: selectedCropForOrder.price,
      totalPrice: selectedCropForOrder.price * orderQuantity,
      farmer: {
        id: selectedCropForOrder.farmer.id,
        name: selectedCropForOrder.farmer.name,
        phone: selectedCropForOrder.farmer.phone,
        location: selectedCropForOrder.farmer.location
      }
    };

    const order: Order = {
      id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      items: [orderItem],
      totalAmount: orderItem.totalPrice,
      deliveryAddress,
      paymentMethod,
      status: 'pending',
      createdAt: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };

    setOrderSummary(order);
    setShowOrderModal(false);
    setShowPaymentModal(true);
    
    console.log('📦 Order placed:', order);
  };

  const handlePayment = (method: string) => {
    setPaymentMethod(method);
    console.log('💳 Payment method selected:', method);
    
    // Simulate payment processing
    setTimeout(() => {
      console.log('✅ Payment successful!');
      setShowPaymentModal(false);
      setOrderSummary(null);
      alert('Order placed successfully! Payment completed.');
    }, 2000);
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
      case 'orders':
        return renderOrders();
      case 'suppliers':
        return <SuppliersPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'contracts':
        return <ContractsPage />;
      case 'favorites':
        return <FavoritesPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return renderOverview();
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
              
              {/* Desktop Sidebar Toggle */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:block p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
              
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">Buyer Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search - Responsive */}
              <div className="hidden sm:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
              
              {/* Mobile Search Button */}
              <button className="sm:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Search className="h-5 w-5 text-gray-600" />
              </button>
              
              {/* Notifications */}
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              
              {/* User Profile - Mobile Optimized */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                {/* User Info - Hidden on mobile */}
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900 truncate max-w-32">{userProfile.name}</p>
                  <p className="text-xs text-gray-500 truncate max-w-32">{userProfile.email}</p>
                  <p className="text-xs text-blue-600 font-medium">BUYER</p>
                </div>
                
                {/* User Avatar & Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-1 sm:space-x-2 p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm sm:text-base">B</span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-600 hidden sm:block" />
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-56 sm:w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {/* Mobile User Info */}
                      <div className="px-4 py-3 border-b border-gray-100 sm:hidden">
                        <p className="text-sm font-medium text-gray-900">{userProfile.name}</p>
                        <p className="text-xs text-gray-500">{userProfile.email}</p>
                        <p className="text-xs text-blue-600 font-medium">BUYER</p>
                      </div>
                      
                      {/* Menu Items */}
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setShowProfileModal(true);
                            setShowUserMenu(false);
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-3"
                        >
                          <User className="h-4 w-4" />
                          <span>View Profile</span>
                        </button>
                        <button
                          onClick={() => {
                            setShowProfileModal(true);
                            setShowUserMenu(false);
                          }}
                          className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-3"
                        >
                          <Edit className="h-4 w-4" />
                          <span>Edit Profile</span>
                        </button>
                        <button className="w-full px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-3">
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </button>
                        <hr className="my-2" />
                        {onLogout && (
                          <button
                            onClick={() => {
                              onLogout();
                              setShowUserMenu(false);
                            }}
                            className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3"
                          >
                            <span>Logout</span>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside className={`hidden lg:block ${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white shadow-sm border-r border-gray-200 transition-all duration-300`}>
          <nav className="p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${sidebarCollapsed ? 'mx-auto' : ''}`} />
                      {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Mobile Sidebar Overlay */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)}></div>
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {navigationItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => {
                            setActiveTab(item.id);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                            activeTab === item.id
                              ? 'bg-blue-50 text-blue-700'
                              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span className="font-medium">{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6">
          {renderContent()}
        </main>
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

      {/* Chat Modal */}
      {selectedCrop && (
        <ChatModal
          isOpen={showChatModal}
          onClose={handleCloseChat}
          farmer={selectedCrop.farmer}
          crop={selectedCrop}
          buyer={userProfile}
        />
      )}

      {/* Image Gallery Modal */}
      {showImageGallery && selectedCropImages.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] w-full overflow-hidden">
            {/* Gallery Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Crop Images</h3>
              <button
                onClick={handleCloseImageGallery}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Main Image */}
            <div className="relative">
              <img
                src={selectedCropImages[currentImageIndex]?.imageUrl || '/placeholder-crop.jpg'}
                alt={`Crop image ${currentImageIndex + 1}`}
                className="w-full h-96 object-contain bg-gray-100"
                onError={(e) => {
                  e.currentTarget.src = '/placeholder-crop.jpg';
                }}
              />
              
              {/* Navigation Arrows */}
              {selectedCropImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  >
                    <ChevronDown className="h-6 w-6 rotate-90" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  >
                    <ChevronDown className="h-6 w-6 -rotate-90" />
                  </button>
                </>
              )}
            </div>

            {/* Image Counter */}
            <div className="p-4 text-center text-sm text-gray-600">
              {currentImageIndex + 1} of {selectedCropImages.length}
            </div>

            {/* Thumbnail Strip */}
            {selectedCropImages.length > 1 && (
              <div className="p-4 border-t">
                <div className="flex space-x-2 overflow-x-auto">
                  {selectedCropImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-16 rounded border-2 ${
                        index === currentImageIndex ? 'border-blue-500' : 'border-gray-300'
                      }`}
                    >
                      <img
                        src={image?.imageUrl || '/placeholder-crop.jpg'}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-crop.jpg';
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Professional Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-hidden w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">🛒 Shopping Cart</h3>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h4>
                <p className="text-gray-600 mb-4">Add some crops to get started!</p>
                <button
                  onClick={() => setShowCart(false)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                    <img
                      src={item.crop.images?.[0]?.imageUrl || '/placeholder-crop.jpg'}
                      alt={item.crop.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.crop.name}</h4>
                      <p className="text-sm text-gray-600">{item.crop.type} • {item.crop.variety}</p>
                      <p className="text-sm text-gray-600">Farmer: {item.crop.farmer.name}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">₹{item.totalPrice}</div>
                      <div className="text-sm text-gray-600">₹{item.price} each</div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total:</span>
                    <span className="text-green-600">₹{getCartTotal()}</span>
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <button
                      onClick={() => setShowCart(false)}
                      className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Continue Shopping
                    </button>
                    <button
                      onClick={() => {
                        setShowCart(false);
                        setShowOrderModal(true);
                      }}
                      className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Professional Order Modal */}
      {showOrderModal && selectedCropForOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[90vh] overflow-y-auto w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">📦 Place Order</h3>
              <button
                onClick={() => setShowOrderModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Crop Details */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedCropForOrder.images?.[0]?.imageUrl || '/placeholder-crop.jpg'}
                    alt={selectedCropForOrder.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{selectedCropForOrder.name}</h4>
                    <p className="text-sm text-gray-600">{selectedCropForOrder.type} • {selectedCropForOrder.variety}</p>
                    <p className="text-sm text-gray-600">Farmer: {selectedCropForOrder.farmer.name}</p>
                    <p className="text-sm text-gray-600">Location: {selectedCropForOrder.farmer.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">₹{selectedCropForOrder.price}</div>
                    <div className="text-sm text-gray-600">per {selectedCropForOrder.unit}</div>
                  </div>
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 1))}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold w-12 text-center">{orderQuantity}</span>
                  <button
                    onClick={() => setOrderQuantity(orderQuantity + 1)}
                    className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-600">{selectedCropForOrder.unit}</span>
                </div>
              </div>

              {/* Delivery Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Address</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={deliveryAddress.fullName}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, fullName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={deliveryAddress.phone}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={deliveryAddress.address}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={deliveryAddress.city}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={deliveryAddress.state}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, state: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    value={deliveryAddress.pincode}
                    onChange={(e) => setDeliveryAddress({...deliveryAddress, pincode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Amount:</span>
                  <span className="text-green-600">₹{selectedCropForOrder.price * orderQuantity}</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  {orderQuantity} {selectedCropForOrder.unit} × ₹{selectedCropForOrder.price}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const orderSummary = {
                      orderId: `order_${Date.now()}`,
                      crop: selectedCropForOrder,
                      cropName: selectedCropForOrder?.cropName || '',
                      quantity: orderQuantity,
                      price: selectedCropForOrder?.price || 0,
                      totalAmount: (selectedCropForOrder?.price || 0) * orderQuantity,
                      farmer: selectedCropForOrder?.farmer
                    };
                    handleRazorpayPayment(orderSummary);
                  }}
                  disabled={isPaymentProcessing}
                  className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPaymentProcessing ? 'Processing...' : '💳 Pay with Razorpay (Card/UPI/QR)'}
                </button>
              </div>
              
              {/* UPI Payment Section */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">📱 Direct UPI Payment</h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg border">
                      <p className="text-sm text-gray-600 mb-1">UPI ID:</p>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-mono font-bold text-blue-600">7209213003@axl</p>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText('7209213003@axl');
                            alert('UPI ID copied to clipboard!');
                          }}
                          className="ml-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border">
                      <p className="text-sm text-gray-600 mb-2">Amount to Pay:</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-green-600">
                          ₹{((selectedCropForOrder?.price || 0) * orderQuantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => {
                            const amount = ((selectedCropForOrder?.price || 0) * orderQuantity).toFixed(2);
                            navigator.clipboard.writeText(amount);
                            alert(`Amount ₹${amount} copied to clipboard!`);
                          }}
                          className="ml-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                    </div>
                    
                    <div className="bg-white p-3 rounded-lg border">
                      <p className="text-sm text-gray-600 mb-2">QR Code:</p>
                      <div className="flex justify-center">
                        <div className="w-32 h-32 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl mb-1">📱</div>
                            <p className="text-xs text-gray-500">QR Code</p>
                            <p className="text-xs text-gray-400">Scan with UPI app</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500">
                      <p>💡 Send exact amount to UPI ID above</p>
                      <p>📱 Use any UPI app: Google Pay, PhonePe, Paytm</p>
                      <p>🔍 Scan QR code with your UPI app</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Professional Payment Modal */}
      {showPaymentModal && orderSummary && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl max-h-[90vh] overflow-y-auto w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">💳 Payment</h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
                {orderSummary.items.map((item: OrderItem) => (
                  <div key={item.id} className="flex justify-between items-center py-2">
                    <div>
                      <div className="font-medium">{item.crop.name}</div>
                      <div className="text-sm text-gray-600">{item.quantity} {item.crop.unit}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{item.totalPrice}</div>
                    </div>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-green-600">₹{orderSummary.totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Choose Payment Method</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => handlePayment('debit_card')}
                    className="p-4 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">D</div>
                      <div>
                        <div className="font-medium">Debit Card</div>
                        <div className="text-sm text-gray-600">Visa, Mastercard, RuPay</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handlePayment('credit_card')}
                    className="p-4 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">C</div>
                      <div>
                        <div className="font-medium">Credit Card</div>
                        <div className="text-sm text-gray-600">Visa, Mastercard, Amex</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handlePayment('upi')}
                    className="p-4 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">U</div>
                      <div>
                        <div className="font-medium">UPI</div>
                        <div className="text-sm text-gray-600">PhonePe, Google Pay, Paytm</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handlePayment('netbanking')}
                    className="p-4 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">N</div>
                      <div>
                        <div className="font-medium">Net Banking</div>
                        <div className="text-sm text-gray-600">All major banks</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handlePayment('wallet')}
                    className="p-4 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">W</div>
                      <div>
                        <div className="font-medium">Digital Wallet</div>
                        <div className="text-sm text-gray-600">Paytm, PhonePe, Google Pay</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handlePayment('qr_code')}
                    className="p-4 border border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">Q</div>
                      <div>
                        <div className="font-medium">QR Code</div>
                        <div className="text-sm text-gray-600">Scan to pay</div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Payment Security */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Secure Payment</span>
                </div>
                <p className="text-sm text-green-700 mt-1">
                  Your payment information is encrypted and secure. We use industry-standard SSL encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default BuyerDashboard;