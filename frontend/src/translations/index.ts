// Common translations
export const translations = {
  hi: {
    // Auth
    welcome: 'KSHETRAVEGA में आपका स्वागत है',
    login: 'लॉगिन करें',
    loginDesc: 'अपने खाते में लॉगिन करें',
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
    
    // Password Reset
    forgotPassword: 'पासवर्ड भूल गए?',
    passwordReset: 'पासवर्ड रीसेट',
    forgotPasswordTitle: 'पासवर्ड भूल गए?',
    forgotPasswordDesc: 'अपना मोबाइल नंबर दर्ज करें और OTP प्राप्त करें',
    enterMobileNumber: 'मोबाइल नंबर दर्ज करें',
    sendOTP: 'OTP भेजें',
    otpSent: 'OTP आपके मोबाइल नंबर पर भेजा गया है',
    otpVerification: 'OTP सत्यापन',
    enterOTP: 'OTP दर्ज करें',
    verifyOTP: 'सत्यापित करें',
    otpVerified: 'OTP सत्यापित हो गया है',
    newPassword: 'नया पासवर्ड',
    setNewPassword: 'नया पासवर्ड सेट करें',
    setNewPasswordDesc: 'अपना नया पासवर्ड दर्ज करें',
    confirmNewPassword: 'पासवर्ड की पुष्टि करें',
    passwordResetSuccess: 'पासवर्ड सफलतापूर्वक रीसेट हो गया है',
    passwordResetSuccessDesc: 'अब आप नए पासवर्ड से लॉगिन कर सकते हैं',
    resendOTP: 'OTP फिर से भेजें',
    back: 'वापस',
    success: 'सफलता!',
    passwordUpdated: 'पासवर्ड अपडेट हो गया',
    loginWithNewPassword: 'अब आप नए पासवर्ड से लॉगिन कर सकते हैं',
    enterNewPassword: 'नया पासवर्ड दर्ज करें',
    enterPasswordConfirmation: 'पासवर्ड की पुष्टि करें',
    setPassword: 'पासवर्ड सेट करें',
    verifying: 'सत्यापित कर रहे हैं...',
    sendingOTP: 'OTP भेजा जा रहा है...',
    settingPassword: 'सेट कर रहे हैं...',
    pleaseEnterMobile: 'कृपया अपना मोबाइल नंबर दर्ज करें',
    pleaseEnterValidMobile: 'कृपया एक वैध 10-अंकीय मोबाइल नंबर दर्ज करें',
    pleaseEnterOTP: 'कृपया OTP दर्ज करें',
    pleaseEnterFullOTP: 'कृपया पूरा OTP दर्ज करें',
    pleaseEnterNewPassword: 'कृपया नया पासवर्ड दर्ज करें',
    passwordMinLength: 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए',
    passwordMismatch: 'पासवर्ड मेल नहीं खा रहा',
    resetTokenNotFound: 'Reset token नहीं मिला। कृपया OTP फिर से सत्यापित करें',
    otpSendError: 'OTP भेजने में त्रुटि हुई',
    otpVerifyError: 'OTP सत्यापन में त्रुटि हुई',
    passwordResetError: 'पासवर्ड रीसेट में त्रुटि हुई',
    invalidOTP: 'Invalid OTP. Use 123456 or 000000 for testing.',
    developmentOTP: 'Development mode में OTP:',
    
    // Password Strength
    passwordStrength: 'पासवर्ड की मजबूती',
    veryWeakPassword: 'बहुत कमजोर पासवर्ड',
    weakPassword: 'कमजोर पासवर्ड',
    fairPassword: 'ठीक-ठाक पासवर्ड',
    goodPassword: 'अच्छा पासवर्ड',
    strongPassword: 'मजबूत पासवर्ड',
    veryStrongPassword: 'बहुत मजबूत पासवर्ड',
    passwordRequirements: 'पासवर्ड आवश्यकताएं',
    atLeast8Characters: 'कम से कम 8 अक्षर',
    oneUppercaseLetter: 'एक बड़ा अक्षर',
    oneLowercaseLetter: 'एक छोटा अक्षर',
    oneNumber: 'एक संख्या',
    oneSpecialCharacter: 'एक विशेष अक्षर',
    showPassword: 'पासवर्ड दिखाएं',
    hidePassword: 'पासवर्ड छुपाएं',
    
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
    company: 'कंपनी',
    
    // Transport
    vehicleType: 'वाहन का प्रकार',
    vehicleNumber: 'वाहन नंबर',
    vehicleCapacity: 'वाहन की क्षमता',
    licenseNumber: 'लाइसेंस नंबर',
    preferredRoutes: 'पसंदीदा रूट',
    
    // Business Info
    businessInfoDesc: 'अपने व्यवसाय के बारे में बताएं',
    locationPreferencesDesc: 'आप कहाँ काम करते हैं?',
    vehicleInfoDesc: 'अपने वाहन के बारे में बताएं',
    
    // Payment terms
    payment7Days: '7 दिन',
    payment15Days: '15 दिन',
    payment30Days: '30 दिन',
    
    // Units
    tons: 'टन',
    quintals: 'क्विंटल',
    kg: 'किलोग्राम',
    
    // Placeholders
    enterGSTNumber: 'GST नंबर दर्ज करें',
    enterPreferredCrops: 'पसंदीदा फसलें दर्ज करें',
    enterCity: 'शहर दर्ज करें',
    enterVehicleNumber: 'वाहन नंबर दर्ज करें',
    enterLicenseNumber: 'लाइसेंस नंबर दर्ज करें',
    enterPreferredRoutes: 'पसंदीदा रूट दर्ज करें',
    
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
    backToHome: 'होम पर वापस जाएं',
    backToLogin: 'लॉगिन पर वापस जाएं',
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
    
    // Hero Section
    heroSlide1Title: 'डिजिटल कृषि क्रांति',
    heroSlide1Subtitle: 'किसानों को बेहतर उपज और मुनाफे के लिए तकनीक-संचालित समाधान',
    heroSlide1Description: 'KSHETRAVEGA के नवीन डिजिटल प्लेटफॉर्म के साथ अपनी कृषि पद्धतियों को बदल चुके हजारों किसानों में शामिल हों।',
    heroSlide1Cta: 'अपनी यात्रा शुरू करें',
    
    heroSlide2Title: 'सीधा बाजार पहुंच',
    heroSlide2Subtitle: 'अधिकतम लाभ के लिए सीधे खरीदारों से जुड़ें और बिचौलियों को हटाएं',
    heroSlide2Description: 'पूरे भारत में सत्यापित खरीदारों से सीधे जुड़कर अपनी उपज के लिए उचित मूल्य प्राप्त करें।',
    heroSlide2Cta: 'बाजार देखें',
    
    heroSlide3Title: 'स्मार्ट लॉजिस्टिक्स',
    heroSlide3Subtitle: 'निर्बाध फसल वितरण के लिए कुशल परिवहन समाधान',
    heroSlide3Description: 'हमारे विश्वसनीय ट्रांसपोर्टरों का नेटवर्क सुनिश्चित करता है कि आपकी उपज सुरक्षित रूप से और समय पर बाजार तक पहुंचे।',
    heroSlide3Cta: 'परिवहन खोजें',
    
    heroSlide4Title: 'कृषि का भविष्य',
    heroSlide4Subtitle: 'टिकाऊ कृषि के लिए तकनीक और परंपरा का मिलन',
    heroSlide4Description: 'AI-संचालित अंतर्दृष्टि और आधुनिक कृषि तकनीकों के साथ कृषि के भविष्य को अपनाएं।',
    heroSlide4Cta: 'और जानें',
    
    // Homepage Sections
    whyChooseKshetravega: 'KSHETRAVEGA क्यों चुनें?',
    whyChooseDesc: 'हम किसानों, खरीदारों और ट्रांसपोर्टरों को हमारे नवीन डिजिटल प्लेटफॉर्म के माध्यम से जोड़कर कृषि में क्रांति ला रहे हैं।',
    platformBenefits: 'प्लेटफॉर्म लाभ',
    platformBenefitsDesc: 'हमारे व्यापक डिजिटल कृषि पारिस्थितिकी तंत्र के लाभों का अनुभव करें।',
    
    // Kisan Standing Section
    kisanStandingTitle: 'किसानों की ताकत',
    kisanStandingDescription: 'हमारे प्लेटफॉर्म पर हजारों किसान अपनी फसलों को सीधे बेचकर बेहतर मूल्य प्राप्त कर रहे हैं',
    
    // Technology Leverage Section
    technologyLeverageTitle: 'तकनीक का उपयोग',
    technologyLeverageDescription: 'हमारा प्लेटफॉर्म IoT और AI तकनीक का उपयोग करके किसानों की उत्पादकता और उपज को बढ़ाता है',
    iotOptimization: 'IoT अनुकूलन',
    iotOptimizationDesc: 'स्मार्ट सेंसर और IoT डिवाइस के माध्यम से खेती की निगरानी और अनुकूलन',
    yieldProduction: 'उपज उत्पादन',
    yieldProductionDesc: 'डेटा-संचालित निर्णय लेकर फसल उत्पादन में वृद्धि',
    smartMonitoring: 'स्मार्ट निगरानी',
    smartMonitoringDesc: '24/7 फसल और मिट्टी की स्थिति की निगरानी',
    
    // Direct Benefit Section
    directBenefitTitle: 'किसानों को सीधा लाभ',
    directBenefitDescription: 'हमारा डिजिटल प्लेटफॉर्म बिचौलियों को हटाकर किसानों को सीधा लाभ पहुंचाता है',
    eliminateMiddleman: 'बिचौलियों को हटाना',
    eliminateMiddlemanDesc: 'पारंपरिक बिचौलियों को हटाकर किसानों को बेहतर मूल्य मिलता है',
    directFarmerBenefit: 'किसानों का सीधा लाभ',
    directFarmerBenefitDesc: 'किसान अपनी फसल सीधे खरीदारों को बेचकर अधिक मुनाफा कमाते हैं',
    fairPricing: 'निष्पक्ष मूल्य निर्धारण',
    fairPricingDesc: 'पारदर्शी मूल्य निर्धारण से किसानों को उचित मूल्य मिलता है',
    whatUsersSay: 'हमारे उपयोगकर्ता क्या कहते हैं',
    whatUsersSayDesc: 'KSHETRAVEGA पर भरोसा करने वाले हजारों संतुष्ट किसानों, खरीदारों और ट्रांसपोर्टरों में शामिल हों।',
    readyToTransform: 'अपने कृषि व्यवसाय को बदलने के लिए तैयार हैं?',
    readyToTransformDesc: 'डिजिटल कृषि क्रांति में शामिल हों और अपने कृषि व्यवसाय को अगले स्तर तक ले जाएं।',
    getStartedToday: 'आज ही शुरू करें',
    learnMore: 'और जानें',
    watchDemo: 'डेमो देखें',
    
    // Hero Section
    heroTitle: 'कृषि में क्रांति लाएं',
    heroSubtitle: 'स्मार्ट कृषि समाधान के साथ अपनी उपज को अधिकतम करें',
    heroDescription: 'KSHETRAVEGA के साथ सीधे खरीदारों से जुड़ें, बिचौलियों को हटाएं और अपनी आय बढ़ाएं',
    getStarted: 'शुरू करें',
    learnMore: 'और जानें',
    watchDemo: 'डेमो देखें',
    
    // Hero Slides
    heroSlide1Title: 'स्मार्ट कृषि',
    heroSlide1Subtitle: 'भविष्य की खेती',
    heroSlide1Description: 'AI और IoT तकनीक के साथ अपनी फसलों को बेहतर बनाएं',
    heroSlide1Cta: 'अभी शुरू करें',
    heroSlide2Title: 'सीधा व्यापार',
    heroSlide2Subtitle: 'बिचौलियों को हटाएं',
    heroSlide2Description: 'सीधे खरीदारों से जुड़ें और अधिक मुनाफा कमाएं',
    heroSlide2Cta: 'व्यापार शुरू करें',
    heroSlide3Title: 'लॉजिस्टिक्स',
    heroSlide3Subtitle: 'कुशल परिवहन',
    heroSlide3Description: 'स्मार्ट लॉजिस्टिक्स के साथ अपनी उपज को सुरक्षित पहुंचाएं',
    heroSlide3Cta: 'परिवहन शुरू करें',
    
    // Features
    smartFarming: 'स्मार्ट कृषि',
    smartFarmingDesc: 'बेहतर फसल प्रबंधन के लिए AI-संचालित अंतर्दृष्टि और मौसम अपडेट',
    directTrading: 'सीधा व्यापार',
    directTradingDesc: 'सीधे खरीदारों से जुड़ें और बिचौलियों को हटाएं',
    logistics: 'लॉजिस्टिक्स',
    logisticsDesc: 'कुशल परिवहन और वितरण समाधान',
    marketIntelligence: 'बाजार खुफिया',
    marketIntelligenceDesc: 'वास्तविक समय के मूल्य और बाजार रुझान',
    
    // Benefits
    quickSetup: 'त्वरित सेटअप',
    quickSetupDesc: 'हमारी सरल पंजीकरण प्रक्रिया के साथ मिनटों में शुरू करें',
    securePlatform: 'सुरक्षित प्लेटफॉर्म',
    securePlatformDesc: 'आपके डेटा और लेनदेन की सुरक्षा के लिए बैंक-ग्रेड सुरक्षा',
    wideNetwork: 'व्यापक नेटवर्क',
    wideNetworkDesc: 'पूरे भारत में किसानों, खरीदारों और ट्रांसपोर्टरों से जुड़ें',
    qualityAssured: 'गुणवत्ता की गारंटी',
    qualityAssuredDesc: 'सत्यापित उपयोगकर्ता और गुणवत्ता-जांची गई उपज',
    
    // Footer
    revolutionizingAgriculture: 'डिजिटल नवाचार और सीधे बाजार पहुंच के माध्यम से कृषि में क्रांति ला रहे हैं।',
    forFarmers: 'किसानों के लिए',
    forBuyers: 'खरीदारों के लिए',
    forTransporters: 'ट्रांसपोर्टरों के लिए',
    smartFarmingFooter: 'स्मार्ट कृषि',
    marketAccess: 'बाजार पहुंच',
    cropAdvisory: 'फसल सलाह',
    weatherUpdates: 'मौसम अपडेट',
    qualityProduce: 'गुणवत्तापूर्ण उपज',
    directSourcing: 'सीधा सोर्सिंग',
    marketIntelligenceFooter: 'बाजार खुफिया',
    logisticsSupport: 'लॉजिस्टिक्स सहायता',
    deliveryRequests: 'वितरण अनुरोध',
    routeOptimization: 'रूट अनुकूलन',
    earningsTracking: 'कमाई ट्रैकिंग',
    vehicleManagement: 'वाहन प्रबंधन',
    madeWithLove: 'भारतीय कृषि के लिए प्यार से बनाया गया',
    
    // Navigation
    home: 'होम',
    about: 'के बारे में',
    contact: 'संपर्क',
    features: 'फीचर्स',
    investor: 'निवेशक',
    blog: 'ब्लॉग',
    login: 'लॉगिन करें',
    signup: 'साइन अप करें',
    
    // Navbar
    navbarHome: 'होम',
    navbarAbout: 'के बारे में',
    navbarContact: 'संपर्क',
    navbarFeatures: 'फीचर्स',
    navbarInvestor: 'निवेशक',
    navbarBlog: 'ब्लॉग',
    navbarLogin: 'लॉगिन',
    navbarSignup: 'साइन अप',
    navbarDashboard: 'डैशबोर्ड',
    navbarProfile: 'प्रोफाइल',
    navbarSettings: 'सेटिंग्स',
    navbarLogout: 'लॉगआउट',
    navbarMenu: 'मेनू',
    navbarClose: 'बंद करें',
    
    // Homepage Sections
    statisticsTitle: 'प्लेटफॉर्म प्रभाव के आंकड़े',
    whyChooseTitle: 'KSHETRAVEGA क्यों चुनें?',
    platformBenefitsTitle: 'प्लेटफॉर्म लाभ',
    smartAgricultureTitle: 'स्मार्ट कृषि तकनीक',
    howItWorksTitle: 'KSHETRAVEGA कैसे काम करता है',
    farmersTitle: 'किसान',
    eliminateMiddlemanTitle: 'बिचौलियों को हटाएं',
    directTradeTitle: 'सीधा व्यापार',
    smartTechTitle: 'स्मार्ट टेक',
    workingProcessTitle: 'कार्य प्रक्रिया',
    
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
    loginDesc: 'Sign in to your account',
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
    
    // Password Reset
    forgotPassword: 'Forgot Password?',
    passwordReset: 'Password Reset',
    forgotPasswordTitle: 'Forgot Password?',
    forgotPasswordDesc: 'Enter your mobile number and receive OTP',
    enterMobileNumber: 'Enter Mobile Number',
    sendOTP: 'Send OTP',
    otpSent: 'OTP sent to your mobile number',
    otpVerification: 'OTP Verification',
    enterOTP: 'Enter OTP',
    verifyOTP: 'Verify',
    otpVerified: 'OTP verified successfully',
    newPassword: 'New Password',
    setNewPassword: 'Set New Password',
    setNewPasswordDesc: 'Enter your new password',
    confirmNewPassword: 'Confirm Password',
    passwordResetSuccess: 'Password reset successfully',
    passwordResetSuccessDesc: 'You can now login with your new password',
    resendOTP: 'Resend OTP',
    back: 'Back',
    success: 'Success!',
    passwordUpdated: 'Password Updated',
    loginWithNewPassword: 'You can now login with your new password',
    enterNewPassword: 'Enter new password',
    enterPasswordConfirmation: 'Confirm password',
    setPassword: 'Set Password',
    verifying: 'Verifying...',
    sendingOTP: 'Sending OTP...',
    settingPassword: 'Setting...',
    pleaseEnterMobile: 'Please enter your mobile number',
    pleaseEnterValidMobile: 'Please enter a valid 10-digit mobile number',
    pleaseEnterOTP: 'Please enter OTP',
    pleaseEnterFullOTP: 'Please enter complete OTP',
    pleaseEnterNewPassword: 'Please enter new password',
    passwordMinLength: 'Password must be at least 6 characters long',
    passwordMismatch: 'Passwords do not match',
    resetTokenNotFound: 'Reset token not found. Please verify OTP again',
    otpSendError: 'Error sending OTP',
    otpVerifyError: 'Error verifying OTP',
    passwordResetError: 'Error resetting password',
    invalidOTP: 'Invalid OTP. Use 123456 or 000000 for testing.',
    developmentOTP: 'Development mode OTP:',
    
    // Password Strength
    passwordStrength: 'Password Strength',
    veryWeakPassword: 'Very weak password',
    weakPassword: 'Weak password',
    fairPassword: 'Fair password',
    goodPassword: 'Good password',
    strongPassword: 'Strong password',
    veryStrongPassword: 'Very strong password',
    passwordRequirements: 'Password Requirements',
    atLeast8Characters: 'At least 8 characters',
    oneUppercaseLetter: 'One uppercase letter',
    oneLowercaseLetter: 'One lowercase letter',
    oneNumber: 'One number',
    oneSpecialCharacter: 'One special character',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    
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
    company: 'Company',
    
    // Transport
    vehicleType: 'Vehicle Type',
    vehicleNumber: 'Vehicle Number',
    vehicleCapacity: 'Vehicle Capacity',
    licenseNumber: 'License Number',
    preferredRoutes: 'Preferred Routes',
    
    // Business Info
    businessInfoDesc: 'Tell us about your business',
    locationPreferencesDesc: 'Where do you operate?',
    vehicleInfoDesc: 'Tell us about your vehicle',
    
    // Payment terms
    payment7Days: '7 days',
    payment15Days: '15 days',
    payment30Days: '30 days',
    
    // Units
    tons: 'Tons',
    quintals: 'Quintals',
    kg: 'Kilograms',
    
    // Placeholders
    enterGSTNumber: 'Enter GST Number',
    enterPreferredCrops: 'Enter preferred crops',
    enterCity: 'Enter city',
    enterVehicleNumber: 'Enter vehicle number',
    enterLicenseNumber: 'Enter license number',
    enterPreferredRoutes: 'Enter preferred routes',
    
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
    backToHome: 'Back to Home',
    backToLogin: 'Back to Login',
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
    
    // Hero Section
    heroSlide1Title: 'Digital Farming Revolution',
    heroSlide1Subtitle: 'Empowering farmers with technology-driven solutions for better yields and profits',
    heroSlide1Description: 'Join thousands of farmers who have transformed their agricultural practices with KSHETRAVEGA\'s innovative digital platform.',
    heroSlide1Cta: 'Start Your Journey',
    
    heroSlide2Title: 'Direct Market Access',
    heroSlide2Subtitle: 'Connect directly with buyers and eliminate middlemen for maximum profits',
    heroSlide2Description: 'Get fair prices for your produce by connecting directly with verified buyers across India.',
    heroSlide2Cta: 'Explore Markets',
    
    heroSlide3Title: 'Smart Logistics',
    heroSlide3Subtitle: 'Efficient transportation solutions for seamless crop delivery',
    heroSlide3Description: 'Our network of trusted transporters ensures your produce reaches markets safely and on time.',
    heroSlide3Cta: 'Find Transport',
    
    heroSlide4Title: 'Future of Agriculture',
    heroSlide4Subtitle: 'Technology meets tradition for sustainable farming',
    heroSlide4Description: 'Embrace the future of agriculture with AI-powered insights and modern farming techniques.',
    heroSlide4Cta: 'Learn More',
    
    // Homepage Sections
    whyChooseKshetravega: 'Why Choose KSHETRAVEGA?',
    whyChooseDesc: 'We\'re revolutionizing agriculture by connecting farmers, buyers, and transporters through our innovative digital platform.',
    platformBenefits: 'Platform Benefits',
    platformBenefitsDesc: 'Experience the advantages of our comprehensive digital farming ecosystem.',
    
    // Kisan Standing Section
    kisanStandingTitle: 'Farmer Power',
    kisanStandingDescription: 'Thousands of farmers on our platform are getting better prices by selling their crops directly',
    
    // Technology Leverage Section
    technologyLeverageTitle: 'Technology Leverage',
    technologyLeverageDescription: 'Our platform uses IoT and AI technology to increase farmers\' productivity and yield',
    iotOptimization: 'IoT Optimization',
    iotOptimizationDesc: 'Monitor and optimize farming through smart sensors and IoT devices',
    yieldProduction: 'Yield Production',
    yieldProductionDesc: 'Increase crop production through data-driven decisions',
    smartMonitoring: 'Smart Monitoring',
    smartMonitoringDesc: '24/7 monitoring of crop and soil conditions',
    
    // Direct Benefit Section
    directBenefitTitle: 'Direct Farmer Benefits',
    directBenefitDescription: 'Our digital platform benefits farmers directly by eliminating middlemen',
    eliminateMiddleman: 'Eliminate Middlemen',
    eliminateMiddlemanDesc: 'Remove traditional middlemen to give farmers better prices',
    directFarmerBenefit: 'Direct Farmer Benefit',
    directFarmerBenefitDesc: 'Farmers earn more profit by selling crops directly to buyers',
    fairPricing: 'Fair Pricing',
    fairPricingDesc: 'Transparent pricing ensures farmers get fair value',
    whatUsersSay: 'What Our Users Say',
    whatUsersSayDesc: 'Join thousands of satisfied farmers, buyers, and transporters who trust KSHETRAVEGA.',
    readyToTransform: 'Ready to Transform Your Agriculture Business?',
    readyToTransformDesc: 'Join the digital farming revolution and take your agricultural business to the next level.',
    getStartedToday: 'Get Started Today',
    learnMore: 'Learn More',
    watchDemo: 'Watch Demo',
    
    // Hero Section
    heroTitle: 'Revolutionize Agriculture',
    heroSubtitle: 'Maximize your yield with smart agriculture solutions',
    heroDescription: 'Connect directly with buyers through KSHETRAVEGA, eliminate middlemen and increase your income',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    watchDemo: 'Watch Demo',
    
    // Hero Slides
    heroSlide1Title: 'Smart Farming',
    heroSlide1Subtitle: 'Future of Agriculture',
    heroSlide1Description: 'Enhance your crops with AI and IoT technology',
    heroSlide1Cta: 'Start Now',
    heroSlide2Title: 'Direct Trading',
    heroSlide2Subtitle: 'Eliminate Middlemen',
    heroSlide2Description: 'Connect directly with buyers and earn more profit',
    heroSlide2Cta: 'Start Trading',
    heroSlide3Title: 'Logistics',
    heroSlide3Subtitle: 'Efficient Transport',
    heroSlide3Description: 'Deliver your produce safely with smart logistics',
    heroSlide3Cta: 'Start Transport',
    
    // Features
    smartFarming: 'Smart Farming',
    smartFarmingDesc: 'AI-powered insights and weather updates for better crop management',
    directTrading: 'Direct Trading',
    directTradingDesc: 'Connect directly with buyers and eliminate middlemen',
    logistics: 'Logistics',
    logisticsDesc: 'Efficient transportation and delivery solutions',
    marketIntelligence: 'Market Intelligence',
    marketIntelligenceDesc: 'Real-time prices and market trends',
    
    // Benefits
    quickSetup: 'Quick Setup',
    quickSetupDesc: 'Get started in minutes with our simple registration process',
    securePlatform: 'Secure Platform',
    securePlatformDesc: 'Bank-grade security to protect your data and transactions',
    wideNetwork: 'Wide Network',
    wideNetworkDesc: 'Connect with farmers, buyers, and transporters across India',
    qualityAssured: 'Quality Assured',
    qualityAssuredDesc: 'Verified users and quality-checked produce',
    
    // Footer
    revolutionizingAgriculture: 'Revolutionizing agriculture through digital innovation and direct market access.',
    forFarmers: 'For Farmers',
    forBuyers: 'For Buyers',
    forTransporters: 'For Transporters',
    smartFarmingFooter: 'Smart Farming',
    marketAccess: 'Market Access',
    cropAdvisory: 'Crop Advisory',
    weatherUpdates: 'Weather Updates',
    qualityProduce: 'Quality Produce',
    directSourcing: 'Direct Sourcing',
    marketIntelligenceFooter: 'Market Intelligence',
    logisticsSupport: 'Logistics Support',
    deliveryRequests: 'Delivery Requests',
    routeOptimization: 'Route Optimization',
    earningsTracking: 'Earnings Tracking',
    vehicleManagement: 'Vehicle Management',
    madeWithLove: 'Made with love for Indian Agriculture',
    
    // Navigation
    home: 'Home',
    about: 'About',
    contact: 'Contact',
    features: 'Features',
    investor: 'Investor',
    blog: 'Blog',
    login: 'Login',
    signup: 'Sign Up',
    
    // Navbar
    navbarHome: 'Home',
    navbarAbout: 'About',
    navbarContact: 'Contact',
    navbarFeatures: 'Features',
    navbarInvestor: 'Investor',
    navbarBlog: 'Blog',
    navbarLogin: 'Login',
    navbarSignup: 'Sign Up',
    navbarDashboard: 'Dashboard',
    navbarProfile: 'Profile',
    navbarSettings: 'Settings',
    navbarLogout: 'Logout',
    navbarMenu: 'Menu',
    navbarClose: 'Close',
    
    // Homepage Sections
    statisticsTitle: 'Statistics of Platform Impact',
    whyChooseTitle: 'Why Choose KSHETRAVEGA?',
    platformBenefitsTitle: 'Platform Benefits',
    smartAgricultureTitle: 'Smart Agriculture Technology',
    howItWorksTitle: 'How KSHETRAVEGA Works',
    farmersTitle: 'Farmers',
    eliminateMiddlemanTitle: 'Eliminate the Middleman',
    directTradeTitle: 'Direct Trade',
    smartTechTitle: 'Smart Tech',
    workingProcessTitle: 'Working Process',
    
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
    loginDesc: 'तुमच्या खात्यात लॉगिन करा',
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
    
    // Password Reset
    forgotPassword: 'पासवर्ड विसरलात?',
    passwordReset: 'पासवर्ड रीसेट',
    forgotPasswordTitle: 'पासवर्ड विसरलात?',
    forgotPasswordDesc: 'तुमचा मोबाईल नंबर टाका आणि OTP मिळवा',
    enterMobileNumber: 'मोबाईल नंबर टाका',
    sendOTP: 'OTP पाठवा',
    otpSent: 'तुमच्या मोबाईल नंबरवर OTP पाठवला गेला आहे',
    otpVerification: 'OTP सत्यापन',
    enterOTP: 'OTP टाका',
    verifyOTP: 'सत्यापित करा',
    otpVerified: 'OTP यशस्वीरित्या सत्यापित झाले',
    newPassword: 'नवीन पासवर्ड',
    setNewPassword: 'नवीन पासवर्ड सेट करा',
    setNewPasswordDesc: 'तुमचा नवीन पासवर्ड टाका',
    confirmNewPassword: 'पासवर्डची पुष्टी करा',
    passwordResetSuccess: 'पासवर्ड यशस्वीरित्या रीसेट झाले',
    passwordResetSuccessDesc: 'आता तुम्ही नवीन पासवर्डने लॉगिन करू शकता',
    resendOTP: 'OTP पुन्हा पाठवा',
    back: 'मागे',
    success: 'यश!',
    passwordUpdated: 'पासवर्ड अपडेट झाले',
    loginWithNewPassword: 'आता तुम्ही नवीन पासवर्डने लॉगिन करू शकता',
    enterNewPassword: 'नवीन पासवर्ड टाका',
    enterPasswordConfirmation: 'पासवर्डची पुष्टी करा',
    setPassword: 'पासवर्ड सेट करा',
    verifying: 'सत्यापित करत आहे...',
    sendingOTP: 'OTP पाठवत आहे...',
    settingPassword: 'सेट करत आहे...',
    pleaseEnterMobile: 'कृपया तुमचा मोबाईल नंबर टाका',
    pleaseEnterValidMobile: 'कृपया वैध 10-अंकी मोबाईल नंबर टाका',
    pleaseEnterOTP: 'कृपया OTP टाका',
    pleaseEnterFullOTP: 'कृपया पूर्ण OTP टाका',
    pleaseEnterNewPassword: 'कृपया नवीन पासवर्ड टाका',
    passwordMinLength: 'पासवर्ड किमान 6 अक्षरांचा असावा',
    passwordMismatch: 'पासवर्ड जुळत नाही',
    resetTokenNotFound: 'रीसेट टोकन सापडले नाही. कृपया OTP पुन्हा सत्यापित करा',
    otpSendError: 'OTP पाठवण्यात त्रुटी',
    otpVerifyError: 'OTP सत्यापनात त्रुटी',
    passwordResetError: 'पासवर्ड रीसेटमध्ये त्रुटी',
    invalidOTP: 'अवैध OTP. चाचणीसाठी 123456 किंवा 000000 वापरा.',
    developmentOTP: 'डेव्हलपमेंट मोड OTP:',
    
    // Password Strength
    passwordStrength: 'पासवर्ड मजबूती',
    veryWeakPassword: 'खूप कमकुवत पासवर्ड',
    weakPassword: 'कमकुवत पासवर्ड',
    fairPassword: 'सामान्य पासवर्ड',
    goodPassword: 'चांगला पासवर्ड',
    strongPassword: 'मजबूत पासवर्ड',
    veryStrongPassword: 'खूप मजबूत पासवर्ड',
    passwordRequirements: 'पासवर्ड आवश्यकता',
    atLeast8Characters: 'किमान 8 अक्षरे',
    oneUppercaseLetter: 'एक मोठे अक्षर',
    oneLowercaseLetter: 'एक लहान अक्षर',
    oneNumber: 'एक संख्या',
    oneSpecialCharacter: 'एक विशेष अक्षर',
    showPassword: 'पासवर्ड दाखवा',
    hidePassword: 'पासवर्ड लपवा',
    
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
    company: 'कंपनी',
    
    // Transport
    vehicleType: 'वाहनाचा प्रकार',
    vehicleNumber: 'वाहन क्रमांक',
    vehicleCapacity: 'वाहनाची क्षमता',
    licenseNumber: 'परवाना क्रमांक',
    preferredRoutes: 'पसंतीचे मार्ग',
    
    // Business Info
    businessInfoDesc: 'तुमच्या व्यवसायाबद्दल सांगा',
    locationPreferencesDesc: 'तुम्ही कोठे काम करता?',
    vehicleInfoDesc: 'तुमच्या वाहनाबद्दल सांगा',
    
    // Payment terms
    payment7Days: '7 दिवस',
    payment15Days: '15 दिवस',
    payment30Days: '30 दिवस',
    
    // Units
    tons: 'टन',
    quintals: 'क्विंटल',
    kg: 'किलोग्राम',
    
    // Placeholders
    enterGSTNumber: 'GST क्रमांक प्रविष्ट करा',
    enterPreferredCrops: 'पसंतीची पिके प्रविष्ट करा',
    enterCity: 'शहर प्रविष्ट करा',
    enterVehicleNumber: 'वाहन क्रमांक प्रविष्ट करा',
    enterLicenseNumber: 'परवाना क्रमांक प्रविष्ट करा',
    enterPreferredRoutes: 'पसंतीचे मार्ग प्रविष्ट करा',
    
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
    backToHome: 'मुख्यपृष्ठावर परत जा',
    backToLogin: 'लॉगिनवर परत जा',
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
    
    // Hero Section
    heroSlide1Title: 'डिजिटल शेती क्रांती',
    heroSlide1Subtitle: 'शेतकऱ्यांना चांगल्या उत्पादन आणि नफ्यासाठी तंत्रज्ञान-चालित उपाय',
    heroSlide1Description: 'KSHETRAVEGA च्या नाविन्यपूर्ण डिजिटल प्लॅटफॉर्मसह त्यांच्या शेती पद्धती बदललेल्या हजारो शेतकऱ्यांमध्ये सामील व्हा.',
    heroSlide1Cta: 'तुमचा प्रवास सुरू करा',
    
    heroSlide2Title: 'थेट बाजार प्रवेश',
    heroSlide2Subtitle: 'जास्तीत जास्त नफ्यासाठी थेट खरेदीदारांशी जोडा आणि मध्यस्थांना काढून टाका',
    heroSlide2Description: 'संपूर्ण भारतातील प्रमाणित खरेदीदारांशी थेट जोडून तुमच्या उत्पादनासाठी योग्य किंमत मिळवा.',
    heroSlide2Cta: 'बाजार पहा',
    
    heroSlide3Title: 'स्मार्ट लॉजिस्टिक्स',
    heroSlide3Subtitle: 'निर्बाध पीक वितरणासाठी कार्यक्षम वाहतूक उपाय',
    heroSlide3Description: 'आमच्या विश्वसनीय वाहतूकदारांचे नेटवर्क सुनिश्चित करते की तुमचे उत्पादन सुरक्षितपणे आणि वेळेवर बाजारात पोहोचेल.',
    heroSlide3Cta: 'वाहतूक शोधा',
    
    heroSlide4Title: 'शेतीचे भविष्य',
    heroSlide4Subtitle: 'शाश्वत शेतीसाठी तंत्रज्ञान आणि परंपरा भेटतात',
    heroSlide4Description: 'AI-चालित अंतर्दृष्टी आणि आधुनिक शेती तंत्रज्ञानासह शेतीचे भविष्य स्वीकारा.',
    heroSlide4Cta: 'अधिक जाणून घ्या',
    
    // Homepage Sections
    whyChooseKshetravega: 'KSHETRAVEGA का निवडा?',
    whyChooseDesc: 'आम्ही आमच्या नाविन्यपूर्ण डिजिटल प्लॅटफॉर्मद्वारे शेतकरी, खरेदीदार आणि वाहतूकदारांना जोडून शेतीत क्रांती आणत आहोत.',
    platformBenefits: 'प्लॅटफॉर्म फायदे',
    platformBenefitsDesc: 'आमच्या व्यापक डिजिटल शेती इकोसिस्टमचे फायदे अनुभवा.',
    
    // Kisan Standing Section
    kisanStandingTitle: 'शेतकऱ्यांची ताकद',
    kisanStandingDescription: 'आमच्या प्लॅटफॉर्मवर हजारो शेतकरी थेट पिके विकून चांगले भाव मिळवत आहेत',
    
    // Technology Leverage Section
    technologyLeverageTitle: 'तंत्रज्ञानाचा वापर',
    technologyLeverageDescription: 'आमचे प्लॅटफॉर्म IoT आणि AI तंत्रज्ञान वापरून शेतकऱ्यांची उत्पादकता आणि उत्पादन वाढवते',
    iotOptimization: 'IoT ऑप्टिमायझेशन',
    iotOptimizationDesc: 'स्मार्ट सेंसर आणि IoT डिव्हाइसेसद्वारे शेतीचे निरीक्षण आणि ऑप्टिमायझेशन',
    yieldProduction: 'उत्पादन उत्पादन',
    yieldProductionDesc: 'डेटा-चालित निर्णय घेऊन पिकांच्या उत्पादनात वाढ',
    smartMonitoring: 'स्मार्ट निरीक्षण',
    smartMonitoringDesc: 'पिके आणि मातीच्या स्थितीचे 24/7 निरीक्षण',
    
    // Direct Benefit Section
    directBenefitTitle: 'शेतकऱ्यांना थेट लाभ',
    directBenefitDescription: 'आमचे डिजिटल प्लॅटफॉर्म मध्यस्थांना काढून शेतकऱ्यांना थेट लाभ पोहोचवते',
    eliminateMiddleman: 'मध्यस्थांना काढणे',
    eliminateMiddlemanDesc: 'पारंपरिक मध्यस्थांना काढून शेतकऱ्यांना चांगले भाव मिळतात',
    directFarmerBenefit: 'शेतकऱ्यांचा थेट लाभ',
    directFarmerBenefitDesc: 'शेतकरी थेट खरेदीदारांना पिके विकून अधिक नफा कमावतात',
    fairPricing: 'निष्पक्ष मूल्य निर्धारण',
    fairPricingDesc: 'पारदर्शक मूल्य निर्धारणामुळे शेतकऱ्यांना योग्य मूल्य मिळते',
    whatUsersSay: 'आमचे वापरकर्ते काय म्हणतात',
    whatUsersSayDesc: 'KSHETRAVEGA वर विश्वास ठेवणाऱ्या हजारो समाधानी शेतकरी, खरेदीदार आणि वाहतूकदारांमध्ये सामील व्हा.',
    readyToTransform: 'तुमचा शेती व्यवसाय बदलण्यास तयार आहात?',
    readyToTransformDesc: 'डिजिटल शेती क्रांतीमध्ये सामील व्हा आणि तुमचा शेती व्यवसाय पुढील पातळीवर नेता.',
    getStartedToday: 'आजच सुरू करा',
    learnMore: 'अधिक जाणून घ्या',
    watchDemo: 'डेमो पहा',
    
    // Hero Section
    heroTitle: 'शेतीत क्रांती आणा',
    heroSubtitle: 'स्मार्ट शेती उपायांसह तुमची उत्पादकता वाढवा',
    heroDescription: 'KSHETRAVEGA द्वारे थेट खरेदीदारांशी जोडा, मध्यस्थांना हटवा आणि तुमचे उत्पन्न वाढवा',
    getStarted: 'सुरु करा',
    learnMore: 'अधिक जाणा',
    watchDemo: 'डेमो पहा',
    
    // Hero Slides
    heroSlide1Title: 'स्मार्ट शेती',
    heroSlide1Subtitle: 'शेतीचे भविष्य',
    heroSlide1Description: 'AI आणि IoT तंत्रज्ञानासह तुमच्या पिकांना सुधारा',
    heroSlide1Cta: 'आता सुरु करा',
    heroSlide2Title: 'थेट व्यापार',
    heroSlide2Subtitle: 'मध्यस्थांना हटवा',
    heroSlide2Description: 'थेट खरेदीदारांशी जोडा आणि अधिक नफा कमवा',
    heroSlide2Cta: 'व्यापार सुरु करा',
    heroSlide3Title: 'लॉजिस्टिक्स',
    heroSlide3Subtitle: 'कार्यक्षम वाहतूक',
    heroSlide3Description: 'स्मार्ट लॉजिस्टिक्ससह तुमची उत्पादने सुरक्षित पोहोचवा',
    heroSlide3Cta: 'वाहतूक सुरु करा',
    
    // Features
    smartFarming: 'स्मार्ट शेती',
    smartFarmingDesc: 'चांगल्या पीक व्यवस्थापनासाठी AI-चालित अंतर्दृष्टी आणि हवामान अपडेट्स',
    directTrading: 'थेट व्यापार',
    directTradingDesc: 'थेट खरेदीदारांशी जोडा आणि मध्यस्थांना काढून टाका',
    logistics: 'लॉजिस्टिक्स',
    logisticsDesc: 'कार्यक्षम वाहतूक आणि वितरण उपाय',
    marketIntelligence: 'बाजार बुद्धिमत्ता',
    marketIntelligenceDesc: 'रीअल-टाइम किंमती आणि बाजार रुझाने',
    
    // Benefits
    quickSetup: 'त्वरित सेटअप',
    quickSetupDesc: 'आमच्या सोप्या नोंदणी प्रक्रियेसह मिनिटांमध्ये सुरू करा',
    securePlatform: 'सुरक्षित प्लॅटफॉर्म',
    securePlatformDesc: 'तुमचा डेटा आणि व्यवहार संरक्षित करण्यासाठी बँक-ग्रेड सुरक्षा',
    wideNetwork: 'व्यापक नेटवर्क',
    wideNetworkDesc: 'संपूर्ण भारतातील शेतकरी, खरेदीदार आणि वाहतूकदारांशी जोडा',
    qualityAssured: 'गुणवत्ता हमी',
    qualityAssuredDesc: 'प्रमाणित वापरकर्ते आणि गुणवत्ता-तपासलेले उत्पादन',
    
    // Footer
    revolutionizingAgriculture: 'डिजिटल नाविन्य आणि थेट बाजार प्रवेशाद्वारे शेतीत क्रांती आणत आहोत.',
    forFarmers: 'शेतकऱ्यांसाठी',
    forBuyers: 'खरेदीदारांसाठी',
    forTransporters: 'वाहतूकदारांसाठी',
    smartFarmingFooter: 'स्मार्ट शेती',
    marketAccess: 'बाजार प्रवेश',
    cropAdvisory: 'पीक सल्ला',
    weatherUpdates: 'हवामान अपडेट्स',
    qualityProduce: 'गुणवत्तापूर्ण उत्पादन',
    directSourcing: 'थेट सोर्सिंग',
    marketIntelligenceFooter: 'बाजार बुद्धिमत्ता',
    logisticsSupport: 'लॉजिस्टिक्स समर्थन',
    deliveryRequests: 'वितरण विनंती',
    routeOptimization: 'मार्ग अनुकूलन',
    earningsTracking: 'कमाई ट्रॅकिंग',
    vehicleManagement: 'वाहन व्यवस्थापन',
    madeWithLove: 'भारतीय शेतीसाठी प्रेमाने बनवले',
    
    // Navigation
    home: 'होम',
    about: 'बद्दल',
    contact: 'संपर्क',
    features: 'वैशिष्ट्ये',
    investor: 'गुंतवणूकदार',
    blog: 'ब्लॉग',
    login: 'लॉगिन करा',
    signup: 'साइन अप करा',
    
    // Navbar
    navbarHome: 'होम',
    navbarAbout: 'बद्दल',
    navbarContact: 'संपर्क',
    navbarFeatures: 'वैशिष्ट्ये',
    navbarInvestor: 'गुंतवणूकदार',
    navbarBlog: 'ब्लॉग',
    navbarLogin: 'लॉगिन',
    navbarSignup: 'साइन अप',
    navbarDashboard: 'डॅशबोर्ड',
    navbarProfile: 'प्रोफाइल',
    navbarSettings: 'सेटिंग्ज',
    navbarLogout: 'लॉगआउट',
    navbarMenu: 'मेनू',
    navbarClose: 'बंद करा',
    
    // Homepage Sections
    statisticsTitle: 'प्लॅटफॉर्म प्रभावाची आकडेवारी',
    whyChooseTitle: 'KSHETRAVEGA का निवडा?',
    platformBenefitsTitle: 'प्लॅटफॉर्म फायदे',
    smartAgricultureTitle: 'स्मार्ट शेती तंत्रज्ञान',
    howItWorksTitle: 'KSHETRAVEGA कसे काम करते',
    farmersTitle: 'शेतकरी',
    eliminateMiddlemanTitle: 'मध्यस्थांना काढून टाका',
    directTradeTitle: 'थेट व्यापार',
    smartTechTitle: 'स्मार्ट टेक',
    workingProcessTitle: 'कार्य प्रक्रिया',
    
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

export const getTranslation = (language: 'hi' | 'en' | 'mr', key: string): string => {
  return translations[language][key] || translations['hi'][key] || key;
};

export const getTranslations = (language: 'hi' | 'en' | 'mr') => {
  return translations[language] || translations['hi'];
};
