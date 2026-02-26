'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Lock, 
  Key, 
  CheckCircle2, 
  Loader2, 
  AlertTriangle, 
  XCircle, 
  Eye, 
  EyeOff,
  Shield,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  HelpCircle,
  Calendar,
  Mail,
  Check,
  Fingerprint
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

// Password strength checker
const checkPasswordStrength = (password: string): { 
  score: number; 
  label: string; 
  color: string; 
  requirements: { met: boolean; text: string }[] 
} => {
  const requirements = [
    { met: password.length >= 12, text: 'At least 12 characters' },
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
  } else if (score >= 4) {
    label = 'Good';
    color = 'bg-blue-500';
  } else if (score >= 3) {
    label = 'Fair';
    color = 'bg-yellow-500';
  } else if (score >= 2) {
    label = 'Weak';
    color = 'bg-orange-500';
  }

  return { score, label, color, requirements };
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  // States
  const [isValidating, setIsValidating] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [tokenError, setTokenError] = useState('');
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [touched, setTouched] = useState({ password: false, confirmPassword: false });
  const [passwordStrength, setPasswordStrength] = useState(checkPasswordStrength(''));
  const [redirectTimer, setRedirectTimer] = useState(3);

  // Validate token on mount
  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setTokenError('No reset token found. Please request a new password reset link.');
        setIsValidating(false);
        return;
      }

      try {
        // Optional: Validate token with backend before showing form
        const response = await fetch(`/api/auth/reset-password?token=${token}`);
        
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Invalid or expired token');
        }

        setIsTokenValid(true);
      } catch (err: any) {
        setTokenError(err.message || 'This reset link is invalid or has expired.');
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  // Password strength update
  useEffect(() => {
    setPasswordStrength(checkPasswordStrength(password));
  }, [password]);

  // Redirect countdown
  useEffect(() => {
    if (isSuccess && redirectTimer > 0) {
      const timer = setTimeout(() => {
        setRedirectTimer(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isSuccess && redirectTimer === 0) {
      router.push('/login?reset=success');
    }
  }, [isSuccess, redirectTimer, router]);

  const validateForm = useCallback(() => {
    const errors: string[] = [];

    if (passwordStrength.score < 4) {
      errors.push('Password does not meet security requirements');
    }

    if (password !== confirmPassword) {
      errors.push('Passwords do not match');
    }

    return errors;
  }, [password, confirmPassword, passwordStrength.score]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ password: true, confirmPassword: true });
    setError('');

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors[0]);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading State
  if (isValidating) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying your reset link...</p>
        </motion.div>
      </div>
    );
  }

  // Invalid Token State
  if (!isTokenValid || tokenError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="w-full shadow-2xl border-0 overflow-hidden bg-card/80 backdrop-blur-sm">
            <div className="h-2 bg-destructive" />
            
            <CardHeader className="text-center pt-8 pb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center"
              >
                <AlertTriangle className="w-10 h-10 text-destructive" />
              </motion.div>
              
              <CardTitle className="text-2xl font-bold text-foreground">
                Invalid Reset Link
              </CardTitle>
              <CardDescription className="text-base">
                {tokenError}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 px-6 sm:px-8">
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <h4 className="font-medium text-foreground text-sm mb-2">Why this happened:</h4>
                <ul className="text-xs text-muted-foreground space-y-1.5">
                  <li>• The link has expired (valid for 24 hours)</li>
                  <li>• The link was already used</li>
                  <li>• The link was malformed or incomplete</li>
                  <li>• Your account may have been secured</li>
                </ul>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-3 px-6 sm:px-8 pb-8">
              <Link href="/forgot-password" className="w-full">
                <Button className="w-full h-12 bg-linear-to-r from-codearn-blue via-codearn-purple to-codearn-cyan rounded-xl">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Request New Link
                </Button>
              </Link>
              
              <Link href="/book-call" className="w-full">
                <Button variant="outline" className="w-full h-12 rounded-xl">
                  <Calendar className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </Link>

              <Link 
                href="/login" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Back to login
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Success State
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="w-full shadow-2xl border-0 overflow-hidden bg-card/80 backdrop-blur-sm">
            <div className="h-2 bg-linear-to-r from-green-500 via-codearn-purple to-codearn-cyan" />
            
            <CardHeader className="text-center pt-8 pb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring" }}
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center"
              >
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </motion.div>
              
              <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">
                Password Updated!
              </CardTitle>
              <CardDescription className="text-base">
                Your password has been successfully reset.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 px-6 sm:px-8">
              <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-foreground">Security Notice</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  For your security, all other active sessions have been logged out. 
                  Please sign in again with your new password.
                </p>
              </div>

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Redirecting to login in <span className="font-bold text-foreground">{redirectTimer}</span> seconds...
                </p>
                <div className="w-full bg-muted rounded-full h-2 mt-3 overflow-hidden">
                  <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: '0%' }}
                    transition={{ duration: 3, ease: 'linear' }}
                    className="h-full bg-linear-to-r from-codearn-blue to-codearn-cyan"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="px-6 sm:px-8 pb-8">
              <Link href="/login?reset=success" className="w-full">
                <Button className="w-full h-12 bg-linear-to-r from-codearn-blue via-codearn-purple to-codearn-cyan rounded-xl">
                  Sign In Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Main Reset Form
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="w-full shadow-2xl border-0 overflow-hidden bg-card/80 backdrop-blur-sm">
          <div className="h-2 bg-linear-to-r from-codearn-blue via-codearn-purple to-codearn-cyan" />
          
          <CardHeader className="space-y-1 text-center pt-8 pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-br from-codearn-blue via-codearn-purple to-codearn-cyan flex items-center justify-center shadow-lg"
            >
              <Key className="w-8 h-8 text-white" />
            </motion.div>
            
            <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight bg-linear-to-r from-codearn-blue via-codearn-purple to-codearn-cyan bg-clip-text text-transparent">
              Create New Password
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-muted-foreground">
              Choose a strong, unique password for your account
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit} noValidate>
            <CardContent className="space-y-5 px-6 sm:px-8">
              {/* Error Alert */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <Alert variant="destructive" className="border-destructive/50 bg-destructive/10">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* New Password */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label htmlFor="password" className="text-sm font-medium">
                  New Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError('');
                    }}
                    onBlur={() => setTouched(prev => ({ ...prev, password: true }))}
                    disabled={isSubmitting}
                    className={`h-12 pl-12 pr-12 transition-all ${
                      touched.password && passwordStrength.score < 4
                        ? "border-destructive focus:ring-destructive/20"
                        : password && passwordStrength.score >= 4
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

                {/* Password Strength Meter */}
                <AnimatePresence>
                  {password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                            className={`h-full ${passwordStrength.color} transition-colors duration-300`}
                          />
                        </div>
                        <span className={`text-xs font-bold ${
                          passwordStrength.score >= 4 ? 'text-green-600' : 
                          passwordStrength.score >= 3 ? 'text-blue-600' : 
                          passwordStrength.score >= 2 ? 'text-yellow-600' : 'text-destructive'
                        }`}>
                          {passwordStrength.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {passwordStrength.requirements.map((req, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs">
                            {req.met ? (
                              <Check className="w-3.5 h-3.5 text-green-500 shrink-0" />
                            ) : (
                              <div className="w-3.5 h-3.5 rounded-full border border-muted-foreground/30 shrink-0" />
                            )}
                            <span className={req.met ? 'text-muted-foreground' : 'text-muted-foreground/50'}>
                              {req.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Confirm Password */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••••••"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (error) setError('');
                    }}
                    onBlur={() => setTouched(prev => ({ ...prev, confirmPassword: true }))}
                    disabled={isSubmitting}
                    className={`h-12 pl-12 pr-12 transition-all ${
                      touched.confirmPassword && password !== confirmPassword
                        ? "border-destructive focus:ring-destructive/20"
                        : confirmPassword && password === confirmPassword
                          ? "border-green-500 focus:ring-green-500/20"
                          : "focus:ring-primary/20"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-muted rounded-md transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Eye className="h-5 w-5 text-muted-foreground" />
                    )}
                  </button>
                </div>

                {/* Match Indicator */}
                <AnimatePresence>
                  {confirmPassword && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`flex items-center gap-2 text-xs ${
                        password === confirmPassword ? 'text-green-600' : 'text-destructive'
                      }`}
                    >
                      {password === confirmPassword ? (
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
                </AnimatePresence>
              </motion.div>

              {/* Security Tips */}
              <motion.div 
                className="p-4 rounded-xl bg-muted/50 border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Security Tips
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1.5">
                  <li>• Use a unique password not used elsewhere</li>
                  <li>• Avoid common words, names, or dates</li>
                  <li>• Consider using a password manager</li>
                  <li>• Enable 2FA after login for extra security</li>
                </ul>
              </motion.div>
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
                  disabled={isSubmitting || passwordStrength.score < 4 || password !== confirmPassword}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Updating Password...
                    </>
                  ) : (
                    <>
                      Reset Password
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <Link 
                  href="/login" 
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to login
                </Link>
              </motion.div>

              {/* Support */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="pt-4 border-t border-border text-center"
              >
                <p className="text-xs text-muted-foreground mb-2">
                  Need help? Contact our security team
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Link 
                    href="/book-call"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Book a call
                  </Link>
                  <span className="text-muted-foreground">•</span>
                  <a 
                    href="mailto:security@codearntech.com"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email security
                  </a>
                </div>
              </motion.div>
            </CardFooter>
          </form>
        </Card>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-muted-foreground">
            Protected by enterprise-grade encryption
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}