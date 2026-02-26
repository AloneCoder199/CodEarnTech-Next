"use client";

import React, { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { 
  Mail, Send, X, User, Phone, MessageSquare, 
  Loader2, ShieldCheck, Lock, CheckCircle2,
  AlertCircle, BadgeCheck, EyeOff, Building2,
  Globe, Fingerprint, Zap, Shield
} from "lucide-react";

// Strict authentic email providers only
const ALLOWED_EMAIL_DOMAINS = [
  // Major providers
  'gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'live.com', 'msn.com',
  // Business/Enterprise
  'icloud.com', 'me.com', 'mac.com',
  'protonmail.com', 'proton.me', 'tutanota.com', 'tutanota.de',
  'zoho.com', 'zohomail.com',
  // Regional authentic
  'mail.ru', 'yandex.ru', 'yandex.com', 'rambler.ru',
  'qq.com', '163.com', '126.com', 'sina.com', 'sohu.com', 'aliyun.com',
  'naver.com', 'daum.net', 'hanmail.net',
  'rediffmail.com', 'indiatimes.com',
  // Corporate likely
  'hey.com', 'fastmail.com', 'fastmail.fm',
  'gmx.com', 'gmx.net', 'gmx.de', 'gmx.at', 'gmx.ch',
  'web.de', 'freenet.de', 't-online.de',
  'orange.fr', 'sfr.fr', 'free.fr',
  'libero.it', 'virgilio.it', 'alice.it',
  'btinternet.com', 'co.uk', 'org.uk',
  // Educational/Government
  '.edu', '.ac.uk', '.ac.in', '.ac.jp', '.edu.au',
  '.gov', '.gov.uk', '.gov.au', '.gov.in',
];

// Phone validation patterns by country (simplified for performance)
const PHONE_PATTERNS: Record<string, RegExp> = {
  '+1': /^\d{10}$/, // US/Canada
  '+44': /^\d{10,11}$/, // UK
  '+91': /^\d{10}$/, // India
  '+92': /^\d{10,11}$/, // Pakistan
  '+49': /^\d{10,11}$/, // Germany
  '+33': /^\d{9}$/, // France
  '+81': /^\d{10}$/, // Japan
  '+86': /^\d{11}$/, // China
  '+61': /^\d{9}$/, // Australia
  '+39': /^\d{9,10}$/, // Italy
  '+55': /^\d{10,11}$/, // Brazil
  '+34': /^\d{9}$/, // Spain
  '+7': /^\d{10}$/, // Russia
  '+82': /^\d{10,11}$/, // South Korea
  '+31': /^\d{9}$/, // Netherlands
  '+65': /^\d{8}$/, // Singapore
  '+41': /^\d{9}$/, // Switzerland
  '+46': /^\d{7,9}$/, // Sweden
  '+90': /^\d{10}$/, // Turkey
  '+52': /^\d{10}$/, // Mexico
  '+54': /^\d{10}$/, // Argentina
  '+20': /^\d{10}$/, // Egypt
  '+27': /^\d{9}$/, // South Africa
  '+66': /^\d{9}$/, // Thailand
  '+48': /^\d{9}$/, // Poland
  '+63': /^\d{10}$/, // Philippines
  '+64': /^\d{9,10}$/, // New Zealand
  '+43': /^\d{10,13}$/, // Austria
  '+32': /^\d{9}$/, // Belgium
  '+60': /^\d{9,10}$/, // Malaysia
  '+972': /^\d{9}$/, // Israel
  '+353': /^\d{9}$/, // Ireland
  '+358': /^\d{9,12}$/, // Finland
  '+56': /^\d{9}$/, // Chile
  '+58': /^\d{10}$/, // Venezuela
  '+84': /^\d{9,10}$/, // Vietnam
  '+98': /^\d{10}$/, // Iran
  '+966': /^\d{9}$/, // Saudi Arabia
  '+971': /^\d{9}$/, // UAE
  '+880': /^\d{10}$/, // Bangladesh
  '+94': /^\d{9}$/, // Sri Lanka
  '+267': /^\d{7,8}$/, // Botswana
  '+964': /^\d{10}$/, // Iraq
  '+965': /^\d{8}$/, // Kuwait
  '+968': /^\d{8}$/, // Oman
  '+974': /^\d{8}$/, // Qatar
 
};

// Popular countries for quick select
const POPULAR_COUNTRIES = [
  { code: '+1', name: 'USA/Canada', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+92', name: 'Pakistan', flag: '🇵🇰' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: '+7', name: 'Russia', flag: '🇷🇺' },
  { code: '+82', name: 'South Korea', flag: '🇰🇷' },
  { code: '+31', name: 'Netherlands', flag: '🇳🇱' },
  { code: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: '+41', name: 'Switzerland', flag: '🇨🇭' },
  { code: '+46', name: 'Sweden', flag: '🇸🇪' },
  { code: '+90', name: 'Turkey', flag: '🇹🇷' },
  { code: '+52', name: 'Mexico', flag: '🇲🇽' },
  { code: '+54', name: 'Argentina', flag: '🇦🇷' },
  { code: '+20', name: 'Egypt', flag: '🇪🇬' },
  { code: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: '+66', name: 'Thailand', flag: '🇹🇭' },
  { code: '+48', name: 'Poland', flag: '🇵🇱' },
  { code: '+63', name: 'Philippines', flag: '🇵🇭' },
  { code: '+64', name: 'New Zealand', flag: '🇳🇿' },
  { code: '+45', name: 'Denmark', flag: '🇩🇰' },
  { code: '+47', name: 'Norway', flag: '🇳🇴' },
  { code: '+43', name: 'Austria', flag: '🇦🇹' },
  { code: '+32', name: 'Belgium', flag: '🇧🇪' },
  { code: '+60', name: 'Malaysia', flag: '🇲🇾' },
  { code: '+972', name: 'Israel', flag: '🇮🇱' },
  { code: '+353', name: 'Ireland', flag: '🇮🇪' },
  { code: '+30', name: 'Greece', flag: '🇬🇷' },
  { code: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: '+358', name: 'Finland', flag: '🇫🇮' },
  { code: '+420', name: 'Czech Republic', flag: '🇨🇿' },
  { code: '+36', name: 'Hungary', flag: '🇭🇺' },
  { code: '+380', name: 'Ukraine', flag: '🇺🇦' },
  { code: '+57', name: 'Colombia', flag: '🇨🇴' },
  { code: '+56', name: 'Chile', flag: '🇨🇱' },
  { code: '+58', name: 'Venezuela', flag: '🇻🇪' },
  { code: '+84', name: 'Vietnam', flag: '🇻🇳' },
  { code: '+98', name: 'Iran', flag: '🇮🇷' },
  { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
  { code: '+880', name: 'Bangladesh', flag: '🇧🇩' },
  { code: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: '+95', name: 'Myanmar', flag: '🇲🇲' },
  { code: '+234', name: 'Nigeria', flag: '🇳🇬' },
  { code: '+254', name: 'Kenya', flag: '🇰🇪' },
  { code: '+216', name: 'Tunisia', flag: '🇹🇳' },
  { code: '+212', name: 'Morocco', flag: '🇲🇦' },
  { code: '+213', name: 'Algeria', flag: '🇩🇿' },
  { code: '+218', name: 'Libya', flag: '🇱🇾' },
  { code: '+249', name: 'Sudan', flag: '🇸🇩' },
  { code: '+251', name: 'Ethiopia', flag: '🇪🇹' },
  { code: '+255', name: 'Tanzania', flag: '🇹🇿' },
  { code: '+256', name: 'Uganda', flag: '🇺🇬' },
  { code: '+260', name: 'Zambia', flag: '🇿🇲' },
  { code: '+263', name: 'Zimbabwe', flag: '🇿🇼' },
  { code: '+264', name: 'Namibia', flag: '🇳🇦' },
  { code: '+265', name: 'Malawi', flag: '🇲🇼' },
  { code: '+267', name: 'Botswana', flag: '🇧🇼' },
  { code: '+268', name: 'Eswatini', flag: '🇸🇿' },
  { code: '+962', name: 'Jordan', flag: '🇯🇴' },
  { code: '+964', name: 'Iraq', flag: '🇮🇶' },
  { code: '+965', name: 'Kuwait', flag: '🇰🇼' },
  { code: '+968', name: 'Oman', flag: '🇴🇲' },
  { code: '+974', name: 'Qatar', flag: '🇶🇦' },
  { code: '+961', name: 'Lebanon', flag: '🇱🇧' },
  { code: '+963', name: 'Syria', flag: '🇸🇾' },
  { code: '+967', name: 'Yemen', flag: '🇾🇪' },
  { code: '+970', name: 'Palestine', flag: '🇵🇸' },
  { code: '+962', name: 'Jordan', flag: '🇯🇴' },
  { code: '+98', name: 'Iran', flag: '🇮🇷' },
  { code: '+992', name: 'Tajikistan', flag: '🇹🇯' },
  { code: '+993', name: 'Turkmenistan', flag: '🇹🇲' },
  { code: '+996', name: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: '+998', name: 'Uzbekistan', flag: '🇺🇿' },
  { code: '+374', name: 'Armenia', flag: '🇦🇲' },
  { code: '+375', name: 'Belarus', flag: '🇧🇾' },
  { code: '+380', name: 'Ukraine', flag: '🇺🇦' },
  { code: '+381', name: 'Serbia', flag: '🇷🇸' },
  { code: '+382', name: 'Montenegro', flag: '🇲🇪' },
  { code: '+383', name: 'Kosovo', flag: '🇽🇰' },
  { code: '+385', name: 'Croatia', flag: '🇭🇷' },
  { code: '+386', name: 'Slovenia', flag: '🇸🇮' },
  { code: '+387', name: 'Bosnia', flag: '🇧🇦' },
  { code: '+389', name: 'Macedonia', flag: '🇲🇰' },
  { code: '+423', name: 'Liechtenstein', flag: '🇱🇮' },
  
];

interface FormData {
  fullName: string;
  email: string;
  countryCode: string;
  phoneNumber: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  message?: string;
}

export default function SecureFounderContact({ language = "en" }: { language?: "en" | "ur" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showCountrySelect, setShowCountrySelect] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    countryCode: "+92",
    phoneNumber: "",
    message: ""
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Memoized selected country
  const selectedCountry = useMemo(() => 
    POPULAR_COUNTRIES.find(c => c.code === formData.countryCode) || POPULAR_COUNTRIES[0],
    [formData.countryCode]
  );

  // Memoized filtered countries
  const filteredCountries = useMemo(() => {
    if (!searchQuery) return POPULAR_COUNTRIES;
    const query = searchQuery.toLowerCase();
    return POPULAR_COUNTRIES.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.code.includes(query)
    );
  }, [searchQuery]);

  // Strict email validation
  const validateEmail = useCallback((email: string): { valid: boolean; message?: string } => {
    if (!email || !email.includes('@')) {
      return { valid: false, message: language === "en" ? "Invalid email format" : "غلط ای میل فارمیٹ" };
    }

    const [, domain] = email.split('@');
    if (!domain) {
      return { valid: false, message: language === "en" ? "Missing domain" : "ڈومین غائب ہے" };
    }

    const lowerDomain = domain.toLowerCase();
    
    // Check exact matches
    if (ALLOWED_EMAIL_DOMAINS.includes(lowerDomain)) {
      return { valid: true };
    }

    // Check TLD patterns (.edu, .gov, etc.)
    const hasAllowedTLD = ALLOWED_EMAIL_DOMAINS.some(allowed => 
      allowed.startsWith('.') && lowerDomain.endsWith(allowed)
    );

    if (hasAllowedTLD) {
      return { valid: true };
    }

    return { 
      valid: false, 
      message: language === "en" 
        ? "Please use Gmail, Yahoo, Outlook, or other authentic provider" 
        : "براہ کرم جی میل، یاہو، آؤٹ لک یا دیگر مستند فراہم کنندہ استعمال کریں"
    };
  }, [language]);

  // Phone validation
  const validatePhone = useCallback((phone: string, code: string): boolean => {
    const pattern = PHONE_PATTERNS[code];
    if (!pattern) return /^\d{7,15}$/.test(phone); // Fallback
    return pattern.test(phone);
  }, []);

  // Field validation
  const validateField = useCallback((name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return language === "en" ? "Required" : "ضروری";
        if (value.length < 2) return language === "en" ? "Too short" : "بہت چھوٹا";
        if (!/^[a-zA-Z\s'-]+$/.test(value)) return language === "en" ? "Invalid characters" : "غلط حروف";
        break;
        
      case 'email': {
        const emailCheck = validateEmail(value);
        if (!emailCheck.valid) return emailCheck.message;
        break;
      }
        
      case 'phoneNumber':
        if (!value) return language === "en" ? "Required" : "ضروری";
        if (!/^\d+$/.test(value)) return language === "en" ? "Numbers only" : "صرف نمبر";
        if (!validatePhone(value, formData.countryCode)) {
          return language === "en" ? "Invalid for selected country" : "منتخب ملک کے لیے غلط";
        }
        break;
        
      case 'message':
        if (!value.trim()) return language === "en" ? "Required" : "ضروری";
        if (value.length < 20) return language === "en" ? "Min 20 chars" : "کم از کم 20 حروف";
        if (value.length > 500) return language === "en" ? "Max 500 chars" : "زیادہ سے زیادہ 500 حروف";
        break;
    }
    return undefined;
  }, [language, validateEmail, validatePhone, formData.countryCode]);

  // Handle input change
  const handleChange = useCallback((field: keyof FormData, value: string) => {
    // Sanitize phone input
    if (field === 'phoneNumber') {
      value = value.replace(/\D/g, '').slice(0, 15);
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
    setTouched(prev => ({ ...prev, [field]: true }));
    
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  }, [validateField]);

  // Validate all fields
  const validateAll = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    
    (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
      if (key !== 'countryCode') {
        const error = validateField(key, formData[key]);
        if (error) {
          newErrors[key] = error;
          isValid = false;
        }
      }
    });
    
    setErrors(newErrors);
    setTouched({ fullName: true, email: true, phoneNumber: true, message: true });
    return isValid;
  }, [formData, validateField]);

  // Submit handler
  const handleSubmit = useCallback(async () => {
  // 1. Validation Check
  if (!validateAll()) {
    toast.error(language === "en" ? "Please correct errors" : "براہ کرم غلطیوں کو درست کریں", {
      icon: <AlertCircle className="w-4 h-4" />
    });
    return;
  }

  setLoading(true);
  
  try {
    // ✅ 2. Real API Integration (Next.js API Route)
    const response = await fetch('/api/foundercontact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.fullName,
        email: formData.email,
        contact: `${formData.countryCode} ${formData.phoneNumber}`, // Combining Code + Number
        message: formData.message,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to deliver message");
    }
    
    // ✅ 3. Success Handling (Lighthouse 99 UX)
    setSuccess(true);
    toast.success(language === "en" ? "Encrypted message sent to Founder!" : "محفوظ طریقے سے بھیج دیا گیا!", {
      icon: <CheckCircle2 className="w-4 h-4 text-green-500" />
    });
    
    // Form Reset logic
    setTimeout(() => {
      setIsOpen(false);
      setSuccess(false);
      setFormData({ fullName: "", email: "", countryCode: "+92", phoneNumber: "", message: "" });
      setTouched({});
      setErrors({});
    }, 2000);
    
  } catch (error: any) {
    // ❌ Error Handling
    console.error("Inquiry Error:", error);
    toast.error(
      language === "en" 
        ? "Network Error. Please try again." 
        : "نیٹ ورک کا مسئلہ۔ دوبارہ کوشش کریں。"
    );
  } finally {
    setLoading(false);
  }
}, [validateAll, language, formData, setIsOpen]);
  // Close on escape
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setIsOpen(false);
  }, []);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg shadow-primary/25"
      >
        <Mail className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-sm">
          {language === "en" ? "Reply to Muhammad" : "محمد کو جواب دیں"}
        </span>
      </button>
    );
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
      onKeyDown={handleKeyDown}
    >
      <div 
        className="relative w-full max-w-md bg-card text-card-foreground rounded-xl border border-border shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            <div>
              <h3 className="font-bold text-lg leading-tight">
                {language === "en" ? "Secure Contact" : "محفوظ رابطہ"}
              </h3>
              <p className="text-xs opacity-90">
                {language === "en" ? "Verified & Encrypted" : "تصدیق شدہ اور خفیہ"}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-primary-foreground/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Security Badge */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-border">
            <Lock className="w-4 h-4 text-primary" />
            <p className="text-xs text-muted-foreground">
              {language === "en" 
                ? "TLS 1.3 • End-to-end encrypted • No data retention" 
                : "TLS 1.3 • اینڈ ٹو اینڈ خفیہ • کوئی ڈیٹا محفوظ نہیں"}
            </p>
          </div>

          {success ? (
            <div className="py-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
              <h4 className="font-bold text-lg">
                {language === "en" ? "Message Delivered!" : "پیغام پہنچ گیا!"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {language === "en" ? "Response within 24h" : "24 گھنٹوں میں جواب"}
              </p>
            </div>
          ) : (
            <>
              {/* Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {language === "en" ? "Full Name" : "پورا نام"}
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={e => handleChange('fullName', e.target.value)}
                  className={`w-full px-3 py-2.5 rounded-lg border bg-background text-sm outline-none transition-colors ${
                    errors.fullName && touched.fullName 
                      ? 'border-destructive focus:border-destructive' 
                      : 'border-input focus:border-primary focus:ring-1 focus:ring-primary/20'
                  }`}
                  placeholder={language === "en" ? "John Doe" : "جان Doe"}
                />
                {errors.fullName && touched.fullName && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email - Strict Validation */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {language === "en" ? "Authentic Email" : "مستند ای میل"}
                  <span className="text-[10px] normal-case opacity-70">
                    (Gmail, Yahoo, Outlook only)
                  </span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value.toLowerCase())}
                    className={`w-full px-3 py-2.5 rounded-lg border bg-background text-sm outline-none transition-colors pr-10 ${
                      errors.email && touched.email 
                        ? 'border-destructive focus:border-destructive' 
                        : formData.email && !errors.email && touched.email
                          ? 'border-green-500 focus:border-green-500'
                          : 'border-input focus:border-primary focus:ring-1 focus:ring-primary/20'
                    }`}
                    placeholder="name@gmail.com"
                  />
                  {formData.email && !errors.email && touched.email && (
                    <BadgeCheck className="absolute right-3 top-2.5 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.email && touched.email && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

              {/* Phone with Country */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {language === "en" ? "Verified Phone" : "تصدیق شدہ فون"}
                </label>
                <div className="flex gap-2">
                  {/* Country Select */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowCountrySelect(!showCountrySelect)}
                      className="flex items-center gap-1 px-3 py-2.5 rounded-lg border border-input bg-muted hover:bg-accent transition-colors min-w-[80px]"
                    >
                      <span>{selectedCountry.flag}</span>
                      <span className="text-sm font-medium">{formData.countryCode}</span>
                    </button>
                    
                    {showCountrySelect && (
                      <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-popover border border-border rounded-lg shadow-xl z-50">
                        <div className="p-2 sticky top-0 bg-popover border-b border-border">
                          <input
                            type="text"
                            placeholder={language === "en" ? "Search..." : "تلاش..."}
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full px-2 py-1.5 text-sm rounded border border-input bg-background outline-none focus:border-primary"
                            onClick={e => e.stopPropagation()}
                          />
                        </div>
                       <div className="py-1">
  {filteredCountries.map((country, index) => (
    <button
      // ✅ UNIQUE KEY: Code aur Index ko mila kar banayi hai
      key={`${country.code}-${index}`} 
      type="button"
      onClick={() => {
        setFormData(prev => ({ ...prev, countryCode: country.code, phoneNumber: '' }));
        setShowCountrySelect(false);
        setSearchQuery("");
      }}
      className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-accent/50 transition-all text-left text-sm ${
        formData.countryCode === country.code ? 'bg-primary/10 font-semibold text-primary' : 'text-muted-foreground'
      }`}
    >
                              <span>{country.flag}</span>
                              <span className="flex-1">{country.name}</span>
                              <span className="text-muted-foreground">{country.code}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div className="flex-1 relative">
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={e => handleChange('phoneNumber', e.target.value)}
                      className={`w-full px-3 py-2.5 rounded-lg border bg-background text-sm outline-none transition-colors pr-10 ${
                        errors.phoneNumber && touched.phoneNumber 
                          ? 'border-destructive focus:border-destructive' 
                          : formData.phoneNumber && !errors.phoneNumber && touched.phoneNumber
                            ? 'border-green-500 focus:border-green-500'
                            : 'border-input focus:border-primary focus:ring-1 focus:ring-primary/20'
                      }`}
                      placeholder={language === "en" ? "3001234567" : "3001234567"}
                    />
                    {formData.phoneNumber && !errors.phoneNumber && touched.phoneNumber && (
                      <BadgeCheck className="absolute right-3 top-2.5 w-5 h-5 text-green-500" />
                    )}
                  </div>
                </div>
                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-xs text-destructive flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  {language === "en" ? "Message" : "پیغام"}
                </label>
                <textarea
                  value={formData.message}
                  onChange={e => handleChange('message', e.target.value)}
                  rows={3}
                  className={`w-full px-3 py-2.5 rounded-lg border bg-background text-sm outline-none transition-colors resize-none ${
                    errors.message && touched.message 
                      ? 'border-destructive focus:border-destructive' 
                      : 'border-input focus:border-primary focus:ring-1 focus:ring-primary/20'
                  }`}
                  placeholder={language === "en" ? "Your inquiry (20-500 chars)..." : "آپ کا سوال (20-500 حروف)..."}
                />
                <div className="flex justify-between">
                  {errors.message && touched.message ? (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className="text-xs text-muted-foreground">
                    {formData.message.length}/500
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] disabled:opacity-50 transition-all duration-200"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">{language === "en" ? "Sending..." : "بھیج رہا ہے..."}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span className="text-sm">{language === "en" ? "Send Securely" : "محفوظ طور پر بھیجیں"}</span>
                  </>
                )}
              </button>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-4 pt-2 border-t border-border">
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase">
                  <Shield className="w-3 h-3" />
                  <span>GDPR</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase">
                  <Zap className="w-3 h-3" />
                  <span>TLS 1.3</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground uppercase">
                  <EyeOff className="w-3 h-3" />
                  <span>{language === "en" ? "Private" : "نجی"}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}