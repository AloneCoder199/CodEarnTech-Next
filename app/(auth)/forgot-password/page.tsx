'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "sonner";
import { AlertCircle, UserPlus } from 'lucide-react'; // Icons for professional look
// import Link from 'next/link';

// ... state variables ...


import { 
  Mail, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  AlertTriangle, 
  Shield, 
  Clock,
  RefreshCw,
  HelpCircle,
  MessageSquare,
  Calendar,
  ExternalLink,
  Inbox,
  XCircle,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Email validation
const isValidEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

// Extract domain from email
const getEmailDomain = (email: string): string => {
  return email.split('@')[1]?.toLowerCase() || '';
};

// Get email provider URL
const getEmailProviderUrl = (domain: string): string => {
  const providers: Record<string, string> = {
    'gmail.com': 'https://mail.google.com',
    'googlemail.com': 'https://mail.google.com',
    'outlook.com': 'https://outlook.live.com',
    'hotmail.com': 'https://outlook.live.com',
    'live.com': 'https://outlook.live.com',
    'yahoo.com': 'https://mail.yahoo.com',
    'icloud.com': 'https://www.icloud.com/mail',
    'me.com': 'https://www.icloud.com/mail',
  };
  return providers[domain] || `https://${domain}`;
};

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
const [showRegisterLink, setShowRegisterLink] = useState(false);
  // Form states
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [cooldownEnd, setCooldownEnd] = useState<Date | null>(null);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  
  // Honeypot field (anti-spam)
  const [honeypot, setHoneypot] = useState('');

  // Cooldown timer effect
  useEffect(() => {
    if (cooldownEnd && new Date() < cooldownEnd) {
      const interval = setInterval(() => {
        const remaining = Math.ceil((cooldownEnd.getTime() - new Date().getTime()) / 1000);
        if (remaining <= 0) {
          setCooldownEnd(null);
          clearInterval(interval);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [cooldownEnd]);

  // Resend timer effect
  useEffect(() => {
    if (!canResend && resendTimer > 0) {
      const interval = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [canResend, resendTimer]);

  const validateEmail = useCallback(() => {
    if (!email) return 'Email address is required';
    if (!isValidEmail(email)) return 'Please enter a valid email address';
    return '';
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setTouched(true);
  setError(null);
  setShowRegisterLink(false);

  // 1. Honeypot check
  if (honeypot) return;

  // 2. Client-side Validation
  const validationError = validateEmail();
  if (validationError) {
    setError(validationError);
    return;
  }

  // 3. Cooldown check
  const now = new Date();
  if (cooldownEnd && now < cooldownEnd) {
    const remaining = Math.ceil((cooldownEnd.getTime() - now.getTime()) / 1000);
    setError(`Security cooldown: Please wait ${remaining} seconds.`);
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    // 4. Handle "Account Not Found" (404)
    if (response.status === 404) {
      setError("This email is not registered in our system.");
      setShowRegisterLink(true); // Alert mein register link dikhane ke liye
      return;
    }

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send reset email');
    }

    // 5. Success Flow
    setIsSuccess(true);
    setAttempts(0);
    toast.success("Reset link sent to your inbox!");
      
  } catch (err: any) {
    const errorMessage = err.message || 'Something went wrong. Please try again.';
    setError(errorMessage);
    setAttempts(prev => prev + 1);
    
    if (attempts >= 2) {
      const cooldown = new Date();
      cooldown.setMinutes(cooldown.getMinutes() + 15);
      setCooldownEnd(cooldown);
    }
  } finally {
    setIsSubmitting(false);
  }
};

// --- JSX Render Section ---
{error && (
  <Alert variant="destructive" className="mb-6 animate-in fade-in zoom-in duration-300">
    <AlertCircle className="h-4 w-4" />
    <AlertDescription className="flex items-center justify-between w-full">
      <span>{error}</span>
      {showRegisterLink && (
        <Link 
          href="/register" 
          className="flex items-center gap-1 font-bold underline underline-offset-4 hover:text-white transition-colors"
        >
          <UserPlus className="h-3 w-3" />
          Register Now
        </Link>
      )}
    </AlertDescription>
  </Alert>
)}
  const handleResend = async () => {
    if (!canResend) return;
    
    setResendTimer(60);
    setCanResend(false);
    await handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  };

  const emailDomain = getEmailDomain(email);
  const emailProviderUrl = getEmailProviderUrl(emailDomain);

  // Success State
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="w-full shadow-2xl border-0 overflow-hidden bg-card/80 backdrop-blur-sm">
            <div className="h-2 bg-linear-to-r from-green-500 via-codearn-purple to-codearn-cyan" />
            
            <CardHeader className="text-center pt-8 pb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center"
              >
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </motion.div>
              
              <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">
                Check Your Email
              </CardTitle>
              <CardDescription className="text-base">
                We've sent a password reset link to
              </CardDescription>
              <p className="text-lg font-semibold text-primary mt-1">{email}</p>
            </CardHeader>

            <CardContent className="space-y-6 px-6 sm:px-8">
              {/* Email Preview Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4 rounded-xl bg-muted/50 border border-border"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">From: CodeEarn Tech</p>
                    <p className="text-xs text-muted-foreground">Subject: Reset your password</p>
                  </div>
                  <span className="text-xs text-muted-foreground">Just now</span>
                </div>
                <div className="pl-13 space-y-2">
                  <div className="h-2 bg-muted rounded w-3/4" />
                  <div className="h-2 bg-muted rounded w-1/2" />
                  <div className="h-8 bg-primary/10 rounded mt-3 w-32" />
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-3"
              >
                <a
                  href={emailProviderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Inbox className="w-5 h-5" />
                    <div>
                      <p className="font-semibold">Open {emailDomain}</p>
                      <p className="text-xs opacity-90">Check your inbox</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleResend}
                    disabled={!canResend}
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-muted border border-border hover:border-primary/30 transition-all disabled:opacity-50 text-sm font-medium"
                  >
                    <RefreshCw className={`w-4 h-4 ${!canResend ? 'animate-spin' : ''}`} />
                    {canResend ? 'Resend Email' : `Resend in ${resendTimer}s`}
                  </button>
                  
                  <Link
                    href="/book-call"
                    className="flex items-center justify-center gap-2 p-3 rounded-xl bg-muted border border-border hover:border-primary/30 transition-all text-sm font-medium"
                  >
                    <Calendar className="w-4 h-4" />
                    Get Help
                  </Link>
                </div>
              </motion.div>

              {/* Helpful Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10"
              >
                <h4 className="font-medium text-foreground text-sm mb-2 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-yellow-600" />
                  Didn't receive the email?
                </h4>
                <ul className="text-xs text-muted-foreground space-y-1.5">
                  <li>• Check your spam or junk folder</li>
                  <li>• Verify that {email} is correct</li>
                  <li>• Wait a few minutes for delivery</li>
                  <li>• Add noreply@codearntech.com to your contacts</li>
                </ul>
              </motion.div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 px-6 sm:px-8 pb-8">
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full h-12 rounded-xl">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Button>
              </Link>
              
              <p className="text-xs text-center text-muted-foreground">
                Link expires in 24 hours for security
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Main Form State
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
              <Lock className="w-8 h-8 text-black dark:text-white" />
            </motion.div>
            
            <CardTitle className="text-2xl sm:text-3xl font-bold tracking-tight bg-linear-to-r from-codearn-blue via-codearn-purple to-codearn-cyan bg-clip-text text-black dark:text-white">
              Forgot Password?
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-muted-foreground">
              No worries. We'll send you a reset link.
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
                      <AlertDescription className="flex flex-col gap-1">
                        <span className="font-medium">{error}</span>
                        {attempts >= 2 && !cooldownEnd && (
                          <span className="text-xs opacity-90">
                            Too many attempts will trigger a 15-minute cooldown
                          </span>
                        )}
                        {cooldownEnd && (
                          <span className="text-xs opacity-90">
                            Please try again after the cooldown period
                          </span>
                        )}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Honeypot Field (Invisible) */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* Email Field */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Label htmlFor="email" className="text-sm font-medium">
                  Work Email Address <span className="text-destructive">*</span>
                </Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    onBlur={() => setTouched(true)}
                    disabled={isSubmitting || !!cooldownEnd}
                    className={`h-12 pl-12 pr-10 transition-all ${
                      error && touched
                        ? "border-destructive focus:ring-destructive/20"
                        : email && !error && touched
                          ? "border-green-500 focus:ring-green-500/20"
                          : "focus:ring-primary/20"
                    }`}
                    required
                  />
                  {email && !error && touched && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                  )}
                  {error && touched && (
                    <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-destructive" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter the email associated with your CodeEarn Tech account
                </p>
              </motion.div>

              {/* Security Note */}
              <motion.div 
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">Secure Process:</span> We'll send a time-limited link to reset your password. Link expires in 24 hours.
                </div>
              </motion.div>

              {/* Alternative Recovery Methods */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Other ways to recover
                </p>
                <div className="  flex">
                  {/*  */}
                  <Link
                    href="/book-call"
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-muted border border-border hover:border-primary/30 transition-all text-xs font-medium"
                  >
                    <MessageSquare className="w-4 h-4 text-primary " />
                    Contact Support
                  </Link>
                </div>
              </motion.div>

              {/* Cooldown Warning */}
              <AnimatePresence>
                {cooldownEnd && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-xl bg-destructive/5 border border-destructive/10"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-destructive" />
                      <div>
                        <p className="text-sm font-medium text-destructive">Too many attempts</p>
                        <p className="text-xs text-muted-foreground">
                          For your security, please wait before trying again
                        </p>
                      </div>
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
                  disabled={isSubmitting || !!cooldownEnd}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending Reset Link...
                    </>
                  ) : cooldownEnd ? (
                    <>
                      <Clock className="mr-2 h-5 w-5" />
                      Please Wait
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </motion.div>

              {/* Back to Login */}
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
                  Remember your password? Sign in
                </Link>
              </motion.div>

              {/* Support Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="pt-4 border-t border-border"
              >
                <p className="text-xs text-center text-muted-foreground mb-3">
                  Still need help? Our security team is available 24/7
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
                    href="mailto:support@codearntech.com"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    Email support
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
          <div className="mt-2 flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/security" className="hover:text-foreground transition-colors">Security</Link>
            <Link href="/help" className="hover:text-foreground transition-colors">Help Center</Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}