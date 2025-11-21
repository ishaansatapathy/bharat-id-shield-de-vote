import { useState, useEffect } from "react"

// Internationalization system for Bharat-ID Shield
export type Language = 'en' | 'hi'

export interface Translations {
  // Header
  appTitle: string
  appSubtitle: string
  verifiedIdentity: string
  online: string
  preferences: string
  language: string
  theme: string
  light: string
  dark: string
  system: string
  myAccount: string
  profile: string
  settings: string
  security: string
  helpSupport: string
  signOut: string

  // Dashboard
  myCredentials: string
  manageCredentials: string
  export: string
  addCredential: string
  
  // Stats
  totalCredentials: string
  verifiedCredentials: string
  pendingVerifications: string
  securityScore: string
  
  // Security Panel
  securityCenter: string
  biometricAuth: string
  enabled: string
  disabled: string
  encryptionStatus: string
  active: string
  lastBackup: string
  never: string
  enableBiometric: string
  createBackup: string
  
  // Offline Panel
  offlineMode: string
  credentialsCached: string
  lastSync: string
  syncNow: string
  
  // Credential Types
  governmentId: string
  education: string
  financial: string
  professional: string
  medical: string
  
  // Credential Status
  verified: string
  pending: string
  expired: string
  
  // Add Credential Modal
  selectDocumentType: string
  chooseCredentialType: string
  documentTitle: string
  issuingAuthority: string
  documentNumber: string
  issueDate: string
  expiryDate: string
  additionalDetails: string
  documentInfoGuide: string
  requiredFields: string
  commonExamples: string
  about: string
  securityNote: string
  securityNoteText: string
  back: string
  
  // Toast Messages
  languageChanged: string
  switchedToEnglish: string
  switchedToHindi: string
  themeChanged: string
  lightMode: string
  darkMode: string
  systemDefault: string
  profileOpening: string
  settingsOpening: string
  securityOpening: string
  helpOpening: string
  signedOut: string
  signedOutDesc: string
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    appTitle: "Bharat-ID Shield",
    appSubtitle: "Decentralized Identity",
    verifiedIdentity: "Verified Identity",
    online: "Online",
    preferences: "Preferences",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    myAccount: "My Account",
    profile: "Profile",
    settings: "Settings",
    security: "Security",
    helpSupport: "Help & Support",
    signOut: "Sign out",

    // Dashboard
    myCredentials: "My Credentials",
    manageCredentials: "Manage your verified digital identity credentials",
    export: "Export",
    addCredential: "Add Credential",
    
    // Stats
    totalCredentials: "Total Credentials",
    verifiedCredentials: "Verified",
    pendingVerifications: "Pending",
    securityScore: "Security Score",
    
    // Security Panel
    securityCenter: "Security Center",
    biometricAuth: "Biometric Authentication",
    enabled: "Enabled",
    disabled: "Disabled",
    encryptionStatus: "Encryption Status",
    active: "Active",
    lastBackup: "Last Backup",
    never: "Never",
    enableBiometric: "Enable Biometric",
    createBackup: "Create Backup",
    
    // Offline Panel
    offlineMode: "Offline Mode",
    credentialsCached: "Credentials Cached",
    lastSync: "Last Sync",
    syncNow: "Sync Now",
    
    // Credential Types
    governmentId: "Government ID",
    education: "Education",
    financial: "Financial",
    professional: "Professional",
    medical: "Medical",
    
    // Credential Status
    verified: "Verified",
    pending: "Pending",
    expired: "Expired",
    
    // Add Credential Modal
    selectDocumentType: "Select Document Type",
    chooseCredentialType: "Choose the type of credential you want to add",
    documentTitle: "Document Title",
    issuingAuthority: "Issuing Authority",
    documentNumber: "Document Number",
    issueDate: "Issue Date",
    expiryDate: "Expiry Date",
    additionalDetails: "Additional Details",
    documentInfoGuide: "Document Information Guide",
    requiredFields: "Required Fields",
    commonExamples: "Common Examples",
    about: "About",
    securityNote: "Security Note",
    securityNoteText: "All credential data is encrypted and stored securely on your device. Only you control access to your credentials through biometric authentication.",
    back: "Back",
    
    // Toast Messages
    languageChanged: "Language",
    switchedToEnglish: "Switched to English",
    switchedToHindi: "Switched to Hindi",
    themeChanged: "Theme",
    lightMode: "Light mode",
    darkMode: "Dark mode",
    systemDefault: "System default",
    profileOpening: "Profile",
    settingsOpening: "Settings",
    securityOpening: "Security",
    helpOpening: "Help & Support",
    signedOut: "Signed out",
    signedOutDesc: "You have been signed out.",
  },
  
  hi: {
    // Header
    appTitle: "भारत-आईडी शील्ड",
    appSubtitle: "विकेंद्रीकृत पहचान",
    verifiedIdentity: "सत्यापित पहचान",
    online: "ऑनलाइन",
    preferences: "प्राथमिकताएं",
    language: "भाषा",
    theme: "थीम",
    light: "हल्का",
    dark: "गहरा",
    system: "सिस्टम",
    myAccount: "मेरा खाता",
    profile: "प्रोफाइल",
    settings: "सेटिंग्स",
    security: "सुरक्षा",
    helpSupport: "सहायता और समर्थन",
    signOut: "साइन आउट",

    // Dashboard
    myCredentials: "मेरे प्रमाण पत्र",
    manageCredentials: "अपने सत्यापित डिजिटल पहचान प्रमाण पत्रों का प्रबंधन करें",
    export: "निर्यात",
    addCredential: "प्रमाण पत्र जोड़ें",
    
    // Stats
    totalCredentials: "कुल प्रमाण पत्र",
    verifiedCredentials: "सत्यापित",
    pendingVerifications: "लंबित",
    securityScore: "सुरक्षा स्कोर",
    
    // Security Panel
    securityCenter: "सुरक्षा केंद्र",
    biometricAuth: "बायोमेट्रिक प्रमाणीकरण",
    enabled: "सक्षम",
    disabled: "अक्षम",
    encryptionStatus: "एन्क्रिप्शन स्थिति",
    active: "सक्रिय",
    lastBackup: "अंतिम बैकअप",
    never: "कभी नहीं",
    enableBiometric: "बायोमेट्रिक सक्षम करें",
    createBackup: "बैकअप बनाएं",
    
    // Offline Panel
    offlineMode: "ऑफलाइन मोड",
    credentialsCached: "कैश किए गए प्रमाण पत्र",
    lastSync: "अंतिम सिंक",
    syncNow: "अभी सिंक करें",
    
    // Credential Types
    governmentId: "सरकारी पहचान",
    education: "शिक्षा",
    financial: "वित्तीय",
    professional: "व्यावसायिक",
    medical: "चिकित्सा",
    
    // Credential Status
    verified: "सत्यापित",
    pending: "लंबित",
    expired: "समाप्त",
    
    // Add Credential Modal
    selectDocumentType: "दस्तावेज़ प्रकार चुनें",
    chooseCredentialType: "जोड़ने वाले प्रमाण पत्र का प्रकार चुनें",
    documentTitle: "दस्तावेज़ शीर्षक",
    issuingAuthority: "जारीकर्ता प्राधिकरण",
    documentNumber: "दस्तावेज़ संख्या",
    issueDate: "जारी करने की तारीख",
    expiryDate: "समाप्ति तिथि",
    additionalDetails: "अतिरिक्त विवरण",
    documentInfoGuide: "दस्तावेज़ जानकारी गाइड",
    requiredFields: "आवश्यक फ़ील्ड",
    commonExamples: "सामान्य उदाहरण",
    about: "के बारे में",
    securityNote: "सुरक्षा नोट",
    securityNoteText: "सभी प्रमाण पत्र डेटा एन्क्रिप्ट किया गया है और आपके डिवाइस पर सुरक्षित रूप से संग्रहीत है। केवल आप बायोमेट्रिक प्रमाणीकरण के माध्यम से अपने प्रमाण पत्रों तक पहुंच को नियंत्रित करते हैं।",
    back: "वापस",
    
    // Toast Messages
    languageChanged: "भाषा",
    switchedToEnglish: "अंग्रेजी में बदल गया",
    switchedToHindi: "हिन्दी चुनी गई",
    themeChanged: "थीम",
    lightMode: "हल्का मोड",
    darkMode: "गहरा मोड",
    systemDefault: "सिस्टम डिफ़ॉल्ट",
    profileOpening: "प्रोफाइल",
    settingsOpening: "सेटिंग्स",
    securityOpening: "सुरक्षा",
    helpOpening: "सहायता और समर्थन",
    signedOut: "साइन आउट हो गया",
    signedOutDesc: "आप साइन आउट हो गए हैं।",
  }
}

// Hook to use translations
export function useTranslations() {
  const [language, setLanguage] = useState<Language>(() => 
    (localStorage.getItem("app-language") || "en") as Language
  )

  useEffect(() => {
    const handleLanguageChange = () => {
      const newLanguage = (localStorage.getItem("app-language") || "en") as Language
      setLanguage(newLanguage)
    }

    window.addEventListener('languagechange', handleLanguageChange)
    return () => window.removeEventListener('languagechange', handleLanguageChange)
  }, [])

  return translations[language]
}
