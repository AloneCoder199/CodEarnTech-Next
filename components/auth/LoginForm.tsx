'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Loader2, 
  UserPlus,
  LogIn, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Shield,
  Smartphone,
  ArrowRight,
  Calendar,
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Email validation
const isValidEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, user, error: authError } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [showSupport, setShowSupport] = useState(false);
  
  // Validation states
  const [touched, setTouched] = useState({ email: false, password: false });
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Check for verification success messages from URL
  const verified = searchParams.get('verified');
  // const redirect = searchParams.get('redirect') || '/student/dashboard';

  // Agar user pehle se login hai to direct dashboard bhejo
  // useEffect(() => {
  //   if (user) {
  //     router.replace(redirect);
  //   }
  // }, [user, router, redirect]);

  // Real-time validation
  const validateField = useCallback((field: string, value: string) => {
    const errors: Record<string, string> = { ...validationErrors };

    switch (field) {
      case 'email':
        if (!value) errors.email = 'Email address is required';
        else if (!isValidEmail(value)) errors.email = 'Please enter a valid email address (e.g., name@company.com)';
        else delete errors.email;
        break;
      case 'password':
        if (!value) errors.password = 'Password is required';
        else if (value.length < 8) errors.password = 'Password must be at least 8 characters';
        else delete errors.password;
        break;
    }

    setValidationErrors(errors);
    return !errors[field];
  }, [validationErrors]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email) validateField('email', value);
    
    // Clear auth error when user starts typing
    if (authError) {
      // Assuming useAuth provides a way to clear error, or we just rely on re-render
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) validateField('password', value);
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, field === 'email' ? email : password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setTouched({ email: true, password: true });

  const isEmailValid = validateField('email', email);
  const isPasswordValid = validateField('password', password);

  if (!isEmailValid || !isPasswordValid) return;

  setIsSubmitting(true);

  try {
    // 🔥 login handles cookies + redirect
    await login(email, password);

    toast.success("Login Successful!", {
      description: "Preparing your dashboard...",
      duration: 2500,
    });

    // ❌ NO router.push / replace here
  } catch (err: any) {
    setLoginAttempts(prev => prev + 1);

    toast.error("Access Denied", {
      description: err.message || "Invalid credentials",
    });
  } finally {
    setIsSubmitting(false);
  }
};


  // Check if we should show support options
  const shouldShowSupport = loginAttempts >= 2 || authError?.includes('locked') || authError?.includes('suspended');

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
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
              <Shield className="w-8 h-8 text-black dark:text-white" />
            </motion.div>
            
            <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight bg-linear-to-r from-codearn-blue via-codearn-purple to-codearn-cyan bg-clip-text text-black dark:text-white">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-muted-foreground">
             Access Your Student Portal
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
            <CardContent className="space-y-5 px-6 sm:px-8">
              
              {/* Success Alert after Email Verification */}
              <AnimatePresence>
                {verified && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Alert className="bg-green-500/10 border-green-500/20 text-green-700">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <AlertDescription className="text-green-700">
                        Email verified successfully! Welcome to CodeEarn Tech.
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Error Alert from Auth Context */}
              <AnimatePresence>
                {authError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription className="flex flex-col gap-1">
                        <span className="font-medium">{authError}</span>
                        {authError.includes('password') && (
                          <span className="text-xs opacity-90">
                            Try using the password reset option below
                          </span>
                        )}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Field */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label htmlFor="email" className="text-sm font-medium">
                  Work Email <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => handleBlur('email')}
                    disabled={isSubmitting}
                    className={`h-12 pl-12 transition-all ${
                      validationErrors.email && touched.email
                        ? "border-destructive focus:ring-destructive/20"
                        : email && !validationErrors.email && touched.email
                          ? "border-green-500 focus:ring-green-500/20"
                          : "focus:ring-primary/20"
                    }`}
                    required
                  />
                  {email && touched.email && !validationErrors.email && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                </div>
                <AnimatePresence>
                  {validationErrors.email && touched.email && (
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

              {/* Password Field */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password <span className="text-destructive">*</span>
                  </Label>
                  <Link 
                    href="/forgot-password" 
                    className="text-xs text-primary hover:underline font-medium transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={() => handleBlur('password')}
                    disabled={isSubmitting}
                    className={`h-12 pl-12 pr-12 transition-all ${
                      validationErrors.password && touched.password
                        ? "border-destructive focus:ring-destructive/20"
                        : password && !validationErrors.password && touched.password
                          ? "border-green-500 focus:ring-green-500/20"
                          : "focus:ring-primary/20"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-muted rounded-md transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>
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

              {/* Security Features */}
              <motion.div 
                className="flex items-center justify-between text-xs text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-green-500" />
                  256-bit encryption
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  SOC 2 Compliant
                </span>
              </motion.div>

              {/* Support Section - Shows after multiple failed attempts */}
              <AnimatePresence>
                {shouldShowSupport && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3"
                  >
                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <h4 className="font-medium text-foreground text-sm mb-3 flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-primary" />
                        Having trouble signing in?
                      </h4>
                      
                      <div className="space-y-2">
                        <Link 
                          href="/forgot-password"
                          className="flex items-center justify-between p-2.5 rounded-lg bg-background border border-border hover:border-primary/30 transition-all text-sm"
                        >
                          <span className="text-foreground">Reset your password</span>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </Link>
                        
                        <Link 
                          href="/resend-verification"
                          className="flex items-center justify-between p-2.5 rounded-lg bg-background border border-border hover:border-primary/30 transition-all text-sm"
                        >
                          <span className="text-foreground">Resend verification email</span>
                          <Mail className="w-4 h-4 text-muted-foreground" />
                        </Link>
                        
                        <Link 
                          href="/book-call"
                          className="flex items-center justify-between p-2.5 rounded-lg bg-linear-to-r from-codearn-blue/10 to-codearn-purple/10 border border-primary/20 hover:border-primary/40 transition-all text-sm group"
                        >
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-foreground font-medium">Book a support call</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                      
                      <p className="text-xs text-muted-foreground mt-3 text-center">
                        Our team is available 24/7 to help you get back online
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 px-6 sm:px-8 pb-8 pt-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
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
                      Securing your session...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-5 w-5" />
                      Sign In to Dashboard
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Divider */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative w-full"
              >
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">New to CodEarn?</span>
                </div>
              </motion.div>

              {/* Create Account CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="w-full"
              >
                <Link href="/register" className="w-full block">
                  <Button 
                    variant="outline" 
                    className="w-full h-12 font-medium hover:bg-secondary transition-all border-2 border-dashed border-border hover:border-primary/30 rounded-xl"
                    type="button"
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    Create New Account
                  </Button>
                </Link>
              </motion.div>

              {/* Thanks Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center space-y-2 pt-2"
              >
                <p className="text-sm text-muted-foreground">
                  Thank you for choosing <span className="font-semibold text-foreground">CodEarn</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  Trusted by 10000+ Students worldwide
                </p>
              </motion.div>
              {/* Support CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
              >
                <span>Need help?</span>
                <Link 
                  href="/book-call" 
                  className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                >
                  <MessageSquare className="w-3 h-3" />
                  Book a call
                </Link>
                <span>or</span>
                <a 
                  href="mailto:support@codearntech.com" 
                  className="text-primary hover:underline font-medium"
                >
                  email us
                </a>
              </motion.div>
            </CardFooter>
          </form>
        </Card>

        {/* Footer Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex items-center justify-center gap-4 text-xs text-muted-foreground"
        >
          <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          <span>•</span>
          <Link href="/security" className="hover:text-foreground transition-colors">Security</Link>
        </motion.div>
      </motion.div>
    </div>
  );
}