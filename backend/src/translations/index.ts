import { Language } from '../config/languages';

// Common translations
export const translations = {
  hi: {
    // Auth
    welcome: 'KSHETRAVEGA में आपका स्वागत है',
    login: 'लॉगिन करें',
    signup: 'नया खाता बनाएं',
    logout: 'लॉगआउट करें',
    email: 'ईमेल',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड दोबारा लिखें',
    phone: 'मोबाइल नंबर',
    firstName: 'पहला नाम',
    lastName: 'अंतिम नाम',
    terms: 'नियम और शर्तों',
    agreeTerms: 'मैं नियम और शर्तों से सहमत हूं',
    
    // User Types
    farmer: 'किसान',
    buyer: 'खरीदार',
    transporter: 'ट्रांसपोर्टर',
    iAm: 'मैं हूं:',
    
    // Form Labels
    required: 'आवश्यक',
    optional: 'वैकल्पिक',
    farmName: 'खेत का नाम',
    farmSize: 'खेत का आकार',
    village: 'गाँव/शहर',
    district: 'जिला',
    state: 'राज्य',
    city: 'शहर',
    experience: 'अनुभव',
    mainCrops: 'मुख्य फसलें',
    
    // Business
    businessName: 'व्यवसाय का नाम',
    businessType: 'व्यवसाय का प्रकार',
    gstNumber: 'GST नंबर',
    preferredCrops: 'पसंदीदा फसलें',
    paymentTerms: 'भुगतान की शर्तें',
    
    // Transport
    companyName: 'कंपनी का नाम',
    vehicleTypes: 'वाहन के प्रकार',
    serviceAreas: 'सेवा क्षेत्र',
    licenses: 'लाइसेंस नंबर',
    insurance: 'बीमा की जानकारी',
    hasInsurance: 'वाहन का बीमा है',
    policyNumber: 'पॉलिसी नंबर',
    insuranceCompany: 'बीमा कंपनी का नाम',
    
    // Actions
    next: 'आगे जाएं',
    back: 'पीछे जाएं',
    submit: 'जमा करें',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    edit: 'संपादित करें',
    delete: 'हटाएं',
    
    // Messages
    loading: 'लोड हो रहा है...',
    success: 'सफल!',
    error: 'त्रुटि!',
    warning: 'चेतावनी!',
    info: 'जानकारी',
    
    // Dashboard
    dashboard: 'डैशबोर्ड',
    profile: 'प्रोफाइल',
    settings: 'सेटिंग्स',
    notifications: 'सूचनाएं',
    help: 'सहायता',
    
    // Skip options
    skipForNow: 'बाद में जानकारी भरें, अभी सिर्फ खाता बनाएं',
    canFillLater: 'बाकी जानकारी बाद में भर सकते हैं',
    basicAccountFirst: 'अभी सिर्फ बुनियादी खाता बनाएं',
    
    // Units
    acres: 'एकड़',
    hectares: 'हेक्टेयर',
    bighas: 'बीघा',
    kanals: 'कनाल',
    
    // Experience levels
    exp0to2: '0-2 साल',
    exp3to5: '3-5 साल',
    exp6to10: '6-10 साल',
    exp10plus: '10+ साल',
    
    // Payment terms
    immediate: 'तुरंत भुगतान',
    days7: '7 दिन',
    days15: '15 दिन',
    days30: '30 दिन',
    days45: '45 दिन',
    
    // Business types
    individual: 'व्यक्तिगत',
    partnership: 'साझेदारी',
    privateLimited: 'प्राइवेट लिमिटेड',
    publicLimited: 'पब्लिक लिमिटेड',
    cooperative: 'सहकारी समिति',
    government: 'सरकारी',
    
    // Vehicle types
    truck: 'ट्रक',
    trailer: 'ट्रेलर',
    pickup: 'पिकअप',
    tempo: 'टेम्पो',
    miniTruck: 'मिनी ट्रक',
    refrigerated: 'रेफ्रिजरेटेड',
    
    // Placeholders
    enterFirstName: 'पहला नाम',
    enterLastName: 'अंतिम नाम',
    enterPhone: '10 अंकों का मोबाइल नंबर',
    enterEmail: 'your@email.com',
    enterPassword: 'कम से कम 6 अक्षर',
    enterConfirmPassword: 'पासवर्ड दोबारा लिखें',
    enterFarmName: 'खेत का नाम (वैकल्पिक)',
    enterVillage: 'गाँव या शहर का नाम',
    enterDistrict: 'जिला',
    enterState: 'राज्य',
    enterCrops: 'जैसे: गेहूं, धान, मक्का (कॉमा से अलग करें)',
    enterBusinessName: 'कंपनी या दुकान का नाम',
    enterGST: 'GST नंबर',
    enterPreferredCrops: 'जैसे: गेहूं, धान, मक्का (कॉमा से अलग करें)',
    enterServiceAreas: 'जैसे: दिल्ली, मुंबई, बैंगलोर (कॉमा से अलग करें)',
    enterLicenses: 'ड्राइविंग लाइसेंस नंबर',
    enterPolicyNumber: 'पॉलिसी नंबर',
    enterInsuranceCompany: 'बीमा कंपनी का नाम',
    
    // Help text
    phoneHelp: 'OTP के लिए इस नंबर का उपयोग किया जाएगा',
    emailHelp: 'बिल और रसीदें ईमेल पर भेजी जाएंगी',
    gstHelp: 'GST नंबर से बेहतर डील्स मिलेंगी',
    cropsHelp: 'कौन सी फसलें उगाते हैं?',
    businessHelp: 'अगर कंपनी में काम करते हैं तो भरें',
    serviceAreasHelp: 'कहाँ-कहाँ जाते हैं?',
    licensesHelp: 'एक या ज्यादा लाइसेंस नंबर (कॉमा से अलग करें)',
    paymentTermsHelp: 'किसानों से कितने दिन में भुगतान करेंगे',
    
    // Steps
    step1: 'बुनियादी जानकारी',
    step2: 'व्यवसाय की जानकारी (वैकल्पिक)',
    step3: 'अतिरिक्त जानकारी (वैकल्पिक)',
    step1Desc: 'सिर्फ कुछ बुनियादी जानकारी दें',
    step2Desc: 'अभी छोड़ सकते हैं, बाद में भर सकते हैं',
    step3Desc: 'बेहतर सेवा के लिए जानकारी दें',
    
    // Already have account
    alreadyHaveAccount: 'पहले से खाता है?',
    dontHaveAccount: 'अभी तक खाता नहीं है?',
    
    // Forgot password
    forgotPassword: 'पासवर्ड भूल गए?',
    
    // Or divider
    or: 'या',
    
    // Features
    cropSale: 'फसल बिक्री',
    weatherUpdates: 'मौसम अपडेट',
    aiAdvisory: 'AI क्रॉप एडवाइजरी',
    marketInfo: 'बाजार की जानकारी',
    cropPurchase: 'फसल खरीदी',
    directContact: 'किसान से सीधा संपर्क',
    qualityCheck: 'गुणवत्ता जांच',
    paymentManagement: 'भुगतान प्रबंधन',
    cargoTransport: 'माल ढुलाई',
    routeOptimization: 'रूट ऑप्टिमाइजेशन',
    trackingSystem: 'ट्रैकिंग सिस्टम',
    commissionEarning: 'कमीशन कमाई',
    
    // Welcome messages
    farmerWelcome: 'किसान डैशबोर्ड में आपका स्वागत है!',
    buyerWelcome: 'खरीदार डैशबोर्ड में आपका स्वागत है!',
    transporterWelcome: 'ट्रांसपोर्टर डैशबोर्ड में आपका स्वागत है!',
    
    // Language selector
    selectLanguage: 'भाषा चुनें',
    currentLanguage: 'वर्तमान भाषा'
  },
  
  en: {
    // Auth
    welcome: 'Welcome to KSHETRAVEGA',
    login: 'Login',
    signup: 'Create Account',
    logout: 'Logout',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    phone: 'Phone Number',
    firstName: 'First Name',
    lastName: 'Last Name',
    terms: 'Terms & Conditions',
    agreeTerms: 'I agree to the Terms & Conditions',
    
    // User Types
    farmer: 'Farmer',
    buyer: 'Buyer',
    transporter: 'Transporter',
    iAm: 'I am a:',
    
    // Form Labels
    required: 'Required',
    optional: 'Optional',
    farmName: 'Farm Name',
    farmSize: 'Farm Size',
    village: 'Village/City',
    district: 'District',
    state: 'State',
    city: 'City',
    experience: 'Experience',
    mainCrops: 'Main Crops',
    
    // Business
    businessName: 'Business Name',
    businessType: 'Business Type',
    gstNumber: 'GST Number',
    preferredCrops: 'Preferred Crops',
    paymentTerms: 'Payment Terms',
    
    // Transport
    companyName: 'Company Name',
    vehicleTypes: 'Vehicle Types',
    serviceAreas: 'Service Areas',
    licenses: 'License Numbers',
    insurance: 'Insurance Details',
    hasInsurance: 'Vehicle has insurance',
    policyNumber: 'Policy Number',
    insuranceCompany: 'Insurance Company',
    
    // Actions
    next: 'Next',
    back: 'Back',
    submit: 'Submit',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    
    // Messages
    loading: 'Loading...',
    success: 'Success!',
    error: 'Error!',
    warning: 'Warning!',
    info: 'Information',
    
    // Dashboard
    dashboard: 'Dashboard',
    profile: 'Profile',
    settings: 'Settings',
    notifications: 'Notifications',
    help: 'Help',
    
    // Skip options
    skipForNow: 'Fill details later, create basic account now',
    canFillLater: 'You can fill other details later',
    basicAccountFirst: 'Create basic account first',
    
    // Units
    acres: 'Acres',
    hectares: 'Hectares',
    bighas: 'Bighas',
    kanals: 'Kanals',
    
    // Experience levels
    exp0to2: '0-2 years',
    exp3to5: '3-5 years',
    exp6to10: '6-10 years',
    exp10plus: '10+ years',
    
    // Payment terms
    immediate: 'Immediate Payment',
    days7: '7 days',
    days15: '15 days',
    days30: '30 days',
    days45: '45 days',
    
    // Business types
    individual: 'Individual',
    partnership: 'Partnership',
    privateLimited: 'Private Limited',
    publicLimited: 'Public Limited',
    cooperative: 'Cooperative',
    government: 'Government',
    
    // Vehicle types
    truck: 'Truck',
    trailer: 'Trailer',
    pickup: 'Pickup',
    tempo: 'Tempo',
    miniTruck: 'Mini Truck',
    refrigerated: 'Refrigerated',
    
    // Placeholders
    enterFirstName: 'First Name',
    enterLastName: 'Last Name',
    enterPhone: '10-digit mobile number',
    enterEmail: 'your@email.com',
    enterPassword: 'Minimum 6 characters',
    enterConfirmPassword: 'Confirm Password',
    enterFarmName: 'Farm Name (Optional)',
    enterVillage: 'Village or City Name',
    enterDistrict: 'District',
    enterState: 'State',
    enterCrops: 'e.g., Wheat, Rice, Maize (separate with commas)',
    enterBusinessName: 'Company or Shop Name',
    enterGST: 'GST Number',
    enterPreferredCrops: 'e.g., Wheat, Rice, Maize (separate with commas)',
    enterServiceAreas: 'e.g., Delhi, Mumbai, Bangalore (separate with commas)',
    enterLicenses: 'Driving License Number',
    enterPolicyNumber: 'Policy Number',
    enterInsuranceCompany: 'Insurance Company Name',
    
    // Help text
    phoneHelp: 'This number will be used for OTP verification',
    emailHelp: 'Bills and receipts will be sent to this email',
    gstHelp: 'GST number will help get better deals',
    cropsHelp: 'Which crops do you grow?',
    businessHelp: 'Fill if you work for a company',
    serviceAreasHelp: 'Where do you provide services?',
    licensesHelp: 'One or more license numbers (separate with commas)',
    paymentTermsHelp: 'How many days to pay farmers?',
    
    // Steps
    step1: 'Basic Information',
    step2: 'Business Information (Optional)',
    step3: 'Additional Details (Optional)',
    step1Desc: 'Just provide basic information',
    step2Desc: 'You can skip for now, fill later',
    step3Desc: 'Provide information for better service',
    
    // Already have account
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account yet?",
    
    // Forgot password
    forgotPassword: 'Forgot Password?',
    
    // Or divider
    or: 'or',
    
    // Features
    cropSale: 'Crop Sale',
    weatherUpdates: 'Weather Updates',
    aiAdvisory: 'AI Crop Advisory',
    marketInfo: 'Market Information',
    cropPurchase: 'Crop Purchase',
    directContact: 'Direct Contact with Farmers',
    qualityCheck: 'Quality Check',
    paymentManagement: 'Payment Management',
    cargoTransport: 'Cargo Transport',
    routeOptimization: 'Route Optimization',
    trackingSystem: 'Tracking System',
    commissionEarning: 'Commission Earning',
    
    // Welcome messages
    farmerWelcome: 'Welcome to Farmer Dashboard!',
    buyerWelcome: 'Welcome to Buyer Dashboard!',
    transporterWelcome: 'Welcome to Transporter Dashboard!',
    
    // Language selector
    selectLanguage: 'Select Language',
    currentLanguage: 'Current Language'
  },
  
  mr: {
    // Auth
    welcome: 'KSHETRAVEGA मध्ये आपले स्वागत आहे',
    login: 'लॉगिन करा',
    signup: 'खाते तयार करा',
    logout: 'लॉगआउट करा',
    email: 'ईमेल',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड पुन्हा लिहा',
    phone: 'मोबाईल नंबर',
    firstName: 'पहिले नाव',
    lastName: 'आडनाव',
    terms: 'नियम आणि अटी',
    agreeTerms: 'मी नियम आणि अटींशी सहमत आहे',
    
    // User Types
    farmer: 'शेतकरी',
    buyer: 'खरेदीदार',
    transporter: 'वाहतूकदार',
    iAm: 'मी आहे:',
    
    // Form Labels
    required: 'आवश्यक',
    optional: 'पर्यायी',
    farmName: 'शेतीचे नाव',
    farmSize: 'शेतीचा आकार',
    village: 'गाव/शहर',
    district: 'जिल्हा',
    state: 'राज्य',
    city: 'शहर',
    experience: 'अनुभव',
    mainCrops: 'मुख्य पिके',
    
    // Business
    businessName: 'व्यवसायाचे नाव',
    businessType: 'व्यवसायाचा प्रकार',
    gstNumber: 'GST क्रमांक',
    preferredCrops: 'पसंतीची पिके',
    paymentTerms: 'पेमेंट अटी',
    
    // Transport
    companyName: 'कंपनीचे नाव',
    vehicleTypes: 'वाहनांचे प्रकार',
    serviceAreas: 'सेवा क्षेत्रे',
    licenses: 'परवाना क्रमांक',
    insurance: 'विमा तपशील',
    hasInsurance: 'वाहनाला विमा आहे',
    policyNumber: 'पॉलिसी क्रमांक',
    insuranceCompany: 'विमा कंपनीचे नाव',
    
    // Actions
    next: 'पुढे जा',
    back: 'मागे जा',
    submit: 'सबमिट करा',
    save: 'जतन करा',
    cancel: 'रद्द करा',
    edit: 'संपादित करा',
    delete: 'हटवा',
    
    // Messages
    loading: 'लोड होत आहे...',
    success: 'यशस्वी!',
    error: 'त्रुटी!',
    warning: 'चेतावणी!',
    info: 'माहिती',
    
    // Dashboard
    dashboard: 'डॅशबोर्ड',
    profile: 'प्रोफाइल',
    settings: 'सेटिंग्ज',
    notifications: 'सूचना',
    help: 'मदत',
    
    // Skip options
    skipForNow: 'तपशील नंतर भरा, आता मूलभूत खाते तयार करा',
    canFillLater: 'तुम्ही इतर तपशील नंतर भरू शकता',
    basicAccountFirst: 'प्रथम मूलभूत खाते तयार करा',
    
    // Units
    acres: 'एकर',
    hectares: 'हेक्टर',
    bighas: 'बिघा',
    kanals: 'कणाल',
    
    // Experience levels
    exp0to2: '0-2 वर्षे',
    exp3to5: '3-5 वर्षे',
    exp6to10: '6-10 वर्षे',
    exp10plus: '10+ वर्षे',
    
    // Payment terms
    immediate: 'त्वरित पेमेंट',
    days7: '7 दिवस',
    days15: '15 दिवस',
    days30: '30 दिवस',
    days45: '45 दिवस',
    
    // Business types
    individual: 'वैयक्तिक',
    partnership: 'भागीदारी',
    privateLimited: 'खाजगी मर्यादित',
    publicLimited: 'सार्वजनिक मर्यादित',
    cooperative: 'सहकारी',
    government: 'सरकारी',
    
    // Vehicle types
    truck: 'ट्रक',
    trailer: 'ट्रेलर',
    pickup: 'पिकअप',
    tempo: 'टेम्पो',
    miniTruck: 'मिनी ट्रक',
    refrigerated: 'रेफ्रिजरेटेड',
    
    // Placeholders
    enterFirstName: 'पहिले नाव',
    enterLastName: 'आडनाव',
    enterPhone: '10-अंकी मोबाईल नंबर',
    enterEmail: 'your@email.com',
    enterPassword: 'किमान 6 अक्षरे',
    enterConfirmPassword: 'पासवर्ड पुन्हा लिहा',
    enterFarmName: 'शेतीचे नाव (पर्यायी)',
    enterVillage: 'गाव किंवा शहराचे नाव',
    enterDistrict: 'जिल्हा',
    enterState: 'राज्य',
    enterCrops: 'उदा., गहू, भात, मका (स्वल्पविरामाने वेगळे करा)',
    enterBusinessName: 'कंपनी किंवा दुकानाचे नाव',
    enterGST: 'GST क्रमांक',
    enterPreferredCrops: 'उदा., गहू, भात, मका (स्वल्पविरामाने वेगळे करा)',
    enterServiceAreas: 'उदा., दिल्ली, मुंबई, बंगळूर (स्वल्पविरामाने वेगळे करा)',
    enterLicenses: 'चालक परवाना क्रमांक',
    enterPolicyNumber: 'पॉलिसी क्रमांक',
    enterInsuranceCompany: 'विमा कंपनीचे नाव',
    
    // Help text
    phoneHelp: 'OTP साठी हा नंबर वापरला जाईल',
    emailHelp: 'बिले आणि पावत्या या ईमेलवर पाठवल्या जातील',
    gstHelp: 'GST क्रमांकामुळे चांगले सौदे मिळतील',
    cropsHelp: 'तुम्ही कोणती पिके घेता?',
    businessHelp: 'जर तुम्ही कंपनीत काम करत असाल तर भरा',
    serviceAreasHelp: 'तुम्ही कोठे सेवा देत आहात?',
    licensesHelp: 'एक किंवा अधिक परवाना क्रमांक (स्वल्पविरामाने वेगळे करा)',
    paymentTermsHelp: 'शेतकऱ्यांना किती दिवसांत पैसे द्यायचे?',
    
    // Steps
    step1: 'मूलभूत माहिती',
    step2: 'व्यवसायाची माहिती (पर्यायी)',
    step3: 'अतिरिक्त तपशील (पर्यायी)',
    step1Desc: 'फक्त मूलभूत माहिती द्या',
    step2Desc: 'आता वगळू शकता, नंतर भरा',
    step3Desc: 'चांगल्या सेवेसाठी माहिती द्या',
    
    // Already have account
    alreadyHaveAccount: 'आधीपासून खाते आहे?',
    dontHaveAccount: 'अद्याप खाते नाही?',
    
    // Forgot password
    forgotPassword: 'पासवर्ड विसरलात?',
    
    // Or divider
    or: 'किंवा',
    
    // Features
    cropSale: 'पीक विक्री',
    weatherUpdates: 'हवामान अपडेट्स',
    aiAdvisory: 'AI पीक सल्ला',
    marketInfo: 'बाजार माहिती',
    cropPurchase: 'पीक खरेदी',
    directContact: 'शेतकऱ्यांशी थेट संपर्क',
    qualityCheck: 'गुणवत्ता तपासणी',
    paymentManagement: 'पेमेंट व्यवस्थापन',
    cargoTransport: 'माल वाहतूक',
    routeOptimization: 'मार्ग अनुकूलन',
    trackingSystem: 'ट्रॅकिंग सिस्टम',
    commissionEarning: 'कमिशन कमाई',
    
    // Welcome messages
    farmerWelcome: 'शेतकरी डॅशबोर्डमध्ये आपले स्वागत आहे!',
    buyerWelcome: 'खरेदीदार डॅशबोर्डमध्ये आपले स्वागत आहे!',
    transporterWelcome: 'वाहतूकदार डॅशबोर्डमध्ये आपले स्वागत आहे!',
    
    // Language selector
    selectLanguage: 'भाषा निवडा',
    currentLanguage: 'सध्याची भाषा'
  }
};

export const getTranslation = (language: Language, key: string): string => {
  return translations[language][key] || translations[DEFAULT_LANGUAGE][key] || key;
};

export const getTranslations = (language: Language) => {
  return translations[language] || translations[DEFAULT_LANGUAGE];
};























