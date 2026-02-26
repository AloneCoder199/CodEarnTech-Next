'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Loader2, 
  UserPlus, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  Shield, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  FileText,
  ChevronRight,
  Fingerprint
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Disposable email domains list
const DISPOSABLE_DOMAINS = [
  'tempmail.com', '10minutemail.com', 'guerrillamail.com', 'mailinator.com',
  'throwaway.com', 'fakeinbox.com', 'sharklasers.com', 'getairmail.com',
  'temp-mail.org', 'fake-mail.net', 'yopmail.com', 'tempinbox.com',
  'mailnesia.com', 'tempmailaddress.com', 'burnermail.io', 'tempmailo.com'
];

// Free email providers (warning only)
const FREE_EMAIL_PROVIDERS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];

// Password strength checker
const checkPasswordStrength = (password: string): { score: number; label: string; color: string; requirements: { met: boolean; text: string }[] } => {
  const requirements = [
    { met: password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(password), text: 'One uppercase letter' },
    { met: /[a-z]/.test(password), text: 'One lowercase letter' },
    { met: /[0-9]/.test(password), text: 'One number' },
    { met: /[^A-Za-z0-9]/.test(password), text: 'One special character' },
  ];

  const score = requirements.filter(r => r.met).length;
  
  let label = 'Weak';
  let color = 'bg-destructive';
  
  if (score === 5) {
    label = 'Strong';
    color = 'bg-green-500';
  } else if (score >= 3) {
    label = 'Medium';
    color = 'bg-yellow-500';
  } else if (score >= 2) {
    label = 'Fair';
    color = 'bg-orange-500';
  }

  return { score, label, color, requirements };
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

// Check if domain is disposable
const isDisposableEmail = (email: string): boolean => {
  const domain = email.split('@')[1]?.toLowerCase();
  return DISPOSABLE_DOMAINS.includes(domain) || false;
};

// Check if free email
const isFreeEmail = (email: string): boolean => {
  const domain = email.split('@')[1]?.toLowerCase();
  return FREE_EMAIL_PROVIDERS.includes(domain) || false;
};

export default function RegisterForm() {
  const router = useRouter();
  const { register, error: authError } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    privacyAccepted: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'checking' | 'valid' | 'invalid' | 'disposable'>('idle');
  const [passwordStrength, setPasswordStrength] = useState(checkPasswordStrength(''));
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  // Real-time password strength check
  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(formData.password));
  }, [formData.password]);

  // Email validation with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.email && touched.email) {
        validateEmail(formData.email);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.email, touched.email]);

  const validateEmail = useCallback((email: string) => {
    if (!isValidEmail(email)) {
      setEmailStatus('invalid');
      return;
    }

    if (isDisposableEmail(email)) {
      setEmailStatus('disposable');
      return;
    }

    setEmailStatus('valid');
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
    
    // Clear error when typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field: string) => {
    const errors: Record<string, string> = { ...validationErrors };

    switch (field) {
      case 'firstName':
        if (!formData.firstName.trim()) errors.firstName = 'First name is required';
        else if (formData.firstName.length < 2) errors.firstName = 'Must be at least 2 characters';
        break;
      case 'lastName':
        if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
        else if (formData.lastName.length < 2) errors.lastName = 'Must be at least 2 characters';
        break;
      case 'email':
        if (!formData.email) errors.email = 'Email is required';
        else if (emailStatus === 'invalid') errors.email = 'Please enter a valid email address';
        else if (emailStatus === 'disposable') errors.email = 'Corporate email required. Temporary emails not allowed for security.';
        break;
      case 'phone':
        if (formData.phone && formData.phone.replace(/\D/g, '').length < 10) {
          errors.phone = 'Please enter a valid phone number';
        }
        break;
      case 'password':
        if (!formData.password) errors.password = 'Password is required';
        else if (passwordStrength.score < 4) errors.password = 'Password does not meet security requirements';
        break;
      case 'confirmPassword':
        if (!formData.confirmPassword) errors.confirmPassword = 'Please confirm your password';
        else if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
        break;
      case 'privacyAccepted':
        if (!formData.privacyAccepted) errors.privacyAccepted = 'You must accept the Privacy Policy to continue';
        break;
    }

    setValidationErrors(errors);
    return !errors[field];
  };

  const validateForm = () => {
    const fields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'privacyAccepted'];
    let isValid = true;

    fields.forEach(field => {
      if (!validateField(field)) isValid = false;
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const { confirmPassword, privacyAccepted, ...registerData } = formData;
      await register(registerData);
      router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
    } catch (err: any) {
      console.error("Registration failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getEmailStatusIcon = () => {
    switch (emailStatus) {
      case 'checking':
        return <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground animate-spin" />;
      case 'valid':
        return <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />;
      case 'invalid':
      case 'disposable':
        return <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-xl"
      >
        <Card className="w-full shadow-2xl border-0 overflow-hidden bg-card/80 backdrop-blur-sm">
          {/* linear Header */}
          <div className="h-2 bg-linear-to-r from-codearn-blue via-codearn-purple to-codearn-cyan" />
          
          <CardHeader className="space-y-1 text-center pt-8 pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-br from-codearn-blue via-codearn-purple to-codearn-cyan flex items-center justify-center shadow-lg"
            >
              <Fingerprint className="w-8 h-8 text-black dark:text-white " />
            </motion.div>
            
            <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight bg-linear-to-r from-codearn-blue via-codearn-purple to-codearn-cyan bg-clip-text text-black dark:text-white">
              Create Your Account
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-muted-foreground">
              Join 200+ ISPs managing networks with CodEarn Tech
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit} noValidate>
            <CardContent className="space-y-5 px-6 sm:px-8">
              {/* Global Error */}
              <AnimatePresence>
                {authError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{authError}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Label htmlFor="firstName" className="text-sm font-medium">
                    First Name <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={() => handleBlur('firstName')}
                      disabled={isSubmitting}
                      className={`h-12 pl-4 transition-all ${
                        validationErrors.firstName && touched.firstName 
                          ? "border-destructive focus:ring-destructive/20" 
                          : "focus:ring-primary/20"
                      }`}
                      required
                    />
                  </div>
                  <AnimatePresence>
                    {validationErrors.firstName && touched.firstName && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-destructive flex items-center gap-1"
                      >
                        <XCircle className="w-3 h-3" /> {validationErrors.firstName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <Label htmlFor="lastName" className="text-sm font-medium">
                    Last Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={() => handleBlur('lastName')}
                    disabled={isSubmitting}
                    className={`h-12 pl-4 transition-all ${
                      validationErrors.lastName && touched.lastName 
                        ? "border-destructive focus:ring-destructive/20" 
                        : "focus:ring-primary/20"
                    }`}
                    required
                  />
                  <AnimatePresence>
                    {validationErrors.lastName && touched.lastName && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-destructive flex items-center gap-1"
                      >
                        <XCircle className="w-3 h-3" /> {validationErrors.lastName}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Email Field */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Label htmlFor="email" className="text-sm font-medium">
                  Work Email <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur('email')}
                    disabled={isSubmitting}
                    className={`h-12 pl-12 pr-10 transition-all ${
                      emailStatus === 'disposable' || (validationErrors.email && touched.email)
                        ? "border-destructive focus:ring-destructive/20" 
                        : emailStatus === 'valid'
                          ? "border-green-500 focus:ring-green-500/20"
                          : "focus:ring-primary/20"
                    }`}
                    required
                  />
                  {getEmailStatusIcon()}
                </div>
                
                {/* Email Status Messages */}
                <AnimatePresence>
                  {emailStatus === 'disposable' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2"
                    >
                      <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                      <p className="text-xs text-destructive">
                        Temporary email addresses are not allowed for security reasons. Please use your corporate email.
                      </p>
                    </motion.div>
                  )}
                  {emailStatus === 'valid' && isFreeEmail(formData.email) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-start gap-2"
                    >
                      <AlertTriangle className="w-4 h-4 text-yellow-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-yellow-700">
                        We recommend using your corporate email for better account security and verification.
                      </p>
                    </motion.div>
                  )}
                  {validationErrors.email && touched.email && emailStatus !== 'disposable' && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-destructive flex items-center gap-1"
                    >
                      <XCircle className="w-3 h-3" /> {validationErrors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Phone Field */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone Number <span className="text-muted-foreground font-normal">(Optional)</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+92 300 0000000"
                    value={formData.phone}
                    onChange={handleChange}
                    onBlur={() => handleBlur('phone')}
                    disabled={isSubmitting}
                    className={`h-12 pl-12 transition-all ${
                      validationErrors.phone && touched.phone 
                        ? "border-destructive focus:ring-destructive/20" 
                        : "focus:ring-primary/20"
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {validationErrors.phone && touched.phone && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-destructive flex items-center gap-1"
                    >
                      <XCircle className="w-3 h-3" /> {validationErrors.phone}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Password Field */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Label htmlFor="password" className="text-sm font-medium">
                  Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur('password')}
                    disabled={isSubmitting}
                    className={`h-12 pl-12 pr-12 transition-all ${
                      validationErrors.password && touched.password 
                        ? "border-destructive focus:ring-destructive/20" 
                        : passwordStrength.score >= 4
                          ? "border-green-500 focus:ring-green-500/20"
                          : "focus:ring-primary/20"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-md transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {formData.password && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                          className={`h-full ${passwordStrength.color} transition-colors duration-300`}
                        />
                      </div>
                      <span className={`text-xs font-medium ${
                        passwordStrength.score >= 4 ? 'text-green-600' : 
                        passwordStrength.score >= 3 ? 'text-yellow-600' : 'text-destructive'
                      }`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-1.5">
                      {passwordStrength.requirements.map((req, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs">
                          {req.met ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                          ) : (
                            <div className="w-3.5 h-3.5 rounded-full border border-muted-foreground/30 shrink-0" />
                          )}
                          <span className={req.met ? 'text-muted-foreground' : 'text-muted-foreground/60'}>
                            {req.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                
                <AnimatePresence>
                  {validationErrors.password && touched.password && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-destructive flex items-center gap-1"
                    >
                      <XCircle className="w-3 h-3" /> {validationErrors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Confirm Password */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
              >
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={() => handleBlur('confirmPassword')}
                    disabled={isSubmitting}
                    className={`h-12 pl-12 pr-12 transition-all ${
                      validationErrors.confirmPassword && touched.confirmPassword 
                        ? "border-destructive focus:ring-destructive/20" 
                        : formData.confirmPassword && formData.password === formData.confirmPassword
                          ? "border-green-500 focus:ring-green-500/20"
                          : "focus:ring-primary/20"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-md transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
                
                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`flex items-center gap-1.5 text-xs ${
                      formData.password === formData.confirmPassword ? 'text-green-600' : 'text-destructive'
                    }`}
                  >
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Passwords match
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5" />
                        Passwords do not match
                      </>
                    )}
                  </motion.div>
                )}
                
                <AnimatePresence>
                  {validationErrors.confirmPassword && touched.confirmPassword && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-xs text-destructive flex items-center gap-1"
                    >
                      <XCircle className="w-3 h-3" /> {validationErrors.confirmPassword}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Privacy Policy Acceptance */}
              <motion.div 
                className="space-y-3 pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className={`p-4 rounded-xl border transition-all ${
                  validationErrors.privacyAccepted && touched.privacyAccepted
                    ? 'border-destructive bg-destructive/5'
                    : formData.privacyAccepted
                      ? 'border-green-500 bg-green-500/5'
                      : 'border-border bg-muted/30'
                }`}>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="privacyAccepted"
                      checked={formData.privacyAccepted}
                      onCheckedChange={(checked) => {
                        setFormData(prev => ({ ...prev, privacyAccepted: checked as boolean }));
                        setTouched(prev => ({ ...prev, privacyAccepted: true }));
                        if (checked) {
                          setValidationErrors(prev => ({ ...prev, privacyAccepted: '' }));
                        }
                      }}
                      className="mt-1 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <div className="flex-1">
                      <Label htmlFor="privacyAccepted" className="text-sm font-medium cursor-pointer">
                        I agree to the Privacy Policy and Terms of Service
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        By creating an account, you agree to our{' '}
                        <button
                          type="button"
                          onClick={() => setShowPrivacyModal(true)}
                          className="text-primary hover:underline underline-offset-2 font-medium inline-flex items-center gap-0.5"
                        >
                          Privacy Policy
                          <ChevronRight className="w-3 h-3" />
                        </button>{' '}
                        and{' '}
                        <Link href="/terms" className="text-primary hover:underline underline-offset-2 font-medium">
                          Terms of Service
                        </Link>
                        . We protect your data with enterprise-grade encryption.
                      </p>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {validationErrors.privacyAccepted && touched.privacyAccepted && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-xs text-destructive flex items-center gap-1 mt-2 ml-7"
                      >
                        <XCircle className="w-3 h-3" /> {validationErrors.privacyAccepted}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-green-500" />
                    SOC 2 Compliant
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-green-500" />
                    AES-256 Encrypted
                  </span>
                </div>
              </motion.div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 px-6 sm:px-8 pb-8 pt-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="w-full"
              >
                <Button 
                  type="submit" 
                  className="w-full h-12 text-base font-semibold bg-linear-to-r from-codearn-blue via-codearn-purple to-codearn-cyan hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 rounded-xl"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Creating Secure Account...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-5 w-5" />
                      Create Account
                    </>
                  )}
                </Button>
              </motion.div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-sm text-center text-muted-foreground"
              >
                Already have an account?{' '}
                <Link href="/login" className="text-primary font-semibold hover:underline underline-offset-4 transition-colors">
                  Sign in to your account
                </Link>
              </motion.p>
            </CardFooter>
          </form>
        </Card>

        {/* Privacy Policy Modal */}
        <AnimatePresence>
          {showPrivacyModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowPrivacyModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-card border border-border rounded-2xl max-w-lg w-full max-h-[80vh] overflow-hidden shadow-2xl"
              >
                <div className="p-6 border-b border-border flex items-center justify-between bg-linear-to-r from-codearn-blue/10 to-codearn-purple/10">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-primary" />
                    <h3 className="font-semibold text-lg">Privacy Policy Summary</h3>
                  </div>
                  <button
                    onClick={() => setShowPrivacyModal(false)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-6 overflow-y-auto max-h-[50vh] space-y-4">
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">Data We Collect</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        Account information (name, email, company)
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        Usage data for improving our services
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                        Technical logs for security monitoring
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-foreground">How We Protect You</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        AES-256 encryption for all data
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        SOC 2 Type II certified infrastructure
                      </li>
                      <li className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        Never sell your data to third parties
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">Your Rights:</strong> You can request data deletion, 
                      export, or modification at any time from your account settings.
                    </p>
                  </div>
                </div>
                
                <div className="p-6 border-t border-border bg-muted/30">
                  <Button 
                    onClick={() => {
                      setFormData(prev => ({ ...prev, privacyAccepted: true }));
                      setShowPrivacyModal(false);
                    }}
                    className="w-full bg-linear-to-r from-codearn-blue via-codearn-purple to-codearn-cyan"
                  >
                    I Understand & Agree
                  </Button>
                  <Link 
                    href="/privacy" 
                    className="block text-center text-sm text-primary hover:underline mt-3"
                    onClick={() => setShowPrivacyModal(false)}
                  >
                    Read Full Privacy Policy
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}


















