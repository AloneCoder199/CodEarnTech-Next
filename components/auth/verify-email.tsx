'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PageLoader from "@/components/ui/page-loader"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, ArrowLeft, ExternalLink, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

// Main Component with Suspense Boundary (Next.js requirement for useSearchParams)
export default function VerifyEmailPage() {
  return (
    
    <Suspense fallback={<PageLoader message="Setting up your workspace..." />}>
       <VerifyEmailContent />
    </Suspense>
  );
}

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'your email';
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<'idle' | 'sent' | 'error'>('idle');

  const handleResend = async () => {
    setIsResending(true);
    setResendStatus('idle');
    try {
      // Yahan aap apna resend API call kar saktay hain
      const res = await fetch('/api/auth/resend-verification', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (res.ok) setResendStatus('sent');
      else setResendStatus('error');
    } catch (err) {
      setResendStatus('error');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background transition-colors duration-300">
      {/* Background Decorative Elements (Subtle Gradients) */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-[10%] left-[10%] w-72 h-72 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] w-72 h-72 bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <Card className="w-full max-w-md border-border/50 bg-card/50 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in duration-500">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-2 animate-bounce-slow">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight text-foreground">
            Check your inbox
          </CardTitle>
          <CardDescription className="text-base">
            We've sent a verification link to <br />
            <span className="font-semibold text-foreground italic">{email}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Click on the link in the email to verify your account. 
            If you don't see it, please check your <b>spam folder</b>.
          </p>
          
          {resendStatus === 'sent' && (
            <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-medium animate-in slide-in-from-top-2">
              <CheckCircle2 className="h-4 w-4" />
              Verification email resent successfully!
            </div>
          )}

          {resendStatus === 'error' && (
            <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm font-medium">
              Failed to resend. Please try again later.
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button 
            className="w-full h-11 text-base font-semibold group" 
            asChild
          >
            <a href="https://mail.google.com" target="_blank" rel="noreferrer">
              Open Gmail
              <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </Button>

          <Button 
            variant="ghost" 
            className="w-full text-muted-foreground hover:text-foreground"
            onClick={handleResend}
            disabled={isResending || resendStatus === 'sent'}
          >
            {isResending ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            {resendStatus === 'sent' ? 'Sent!' : 'Resend verification email'}
          </Button>

          <Link 
            href="/login" 
            className="flex items-center text-sm font-medium text-primary hover:underline transition-all mt-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
