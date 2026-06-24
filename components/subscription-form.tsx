'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion' /* framer-motion code matches smooth layout updates */;
import { motion as framerMotion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  Unlock, 
  Terminal, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

export function SubscriptionForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Real-time visual lock status verification
  const isValidEmail = email.length > 4 && email.includes('@') && email.includes('.');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please provide a valid architectural payload.');
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(data.message || 'Injection successful. Secure pipeline initialized.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Pipeline error: Payload injection aborted.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Tunnel connection failed. Check live network sync.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4 text-left">
      <AnimatePresence mode="wait">
        {status !== 'success' ? (
          <framerMotion.form
            key="quantum-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3.5"
          >
            {/* The Cyber Shield Capsule Frame */}
{/* The Cyber Shield Capsule Frame - Mobile-Optimized Responsive Stack */}
<div className="relative flex flex-col p-1.5 rounded-[24px] sm:rounded-full bg-background/50 border border-primary/20 focus-within:border-primary/40 focus-within:bg-background/90 transition-all duration-300 backdrop-blur-xl ring-0 shadow-none">
  
  <div className="relative flex flex-col sm:flex-row items-center gap-1">
    
    {/* Magnetic Lock Engine Indicator - Only visible on desktop/wide */}
    <div className="absolute left-5 hidden sm:flex items-center text-muted-foreground transition-colors duration-300">
      {isValidEmail ? (
        <Unlock className="w-4 h-4 text-emerald-600 transition-all" />
      ) : (
        <Lock className="w-4 h-4 text-muted-foreground/50" />
      )}
    </div>

    {/* Seamless Clean Input - Mobile touch target size increased */}
    <Input
      type="email"
      required
      disabled={status === 'loading'}
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter architectural token..."
      className="w-full bg-transparent h-[52px] sm:h-[46px] border-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none pl-4 sm:pl-12 pr-4 text-sm sm:text-xs font-mono text-foreground placeholder:text-muted-foreground/50 rounded-full"
    />

    {/* Tactical Action Submit Button - Full width on mobile */}
    <Button 
      type="submit" 
      disabled={status === 'loading' || !isValidEmail}
      className="w-full sm:w-auto shrink-0 h-[48px] sm:h-[42px] inline-flex items-center justify-center gap-2 px-6 rounded-[18px] sm:rounded-full bg-primary text-primary-foreground text-xs font-bold tracking-wider uppercase transition-all duration-300 disabled:opacity-50 hover:opacity-90 active:scale-[0.98]"
    >
      {status === 'loading' ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <>
          <span>Join Network</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </>
      )}
    </Button>
  </div>
</div>

            {/* Static Interactive Live Telemetry Ledger Underline */}
            <div className="flex items-center justify-between px-3.5 font-mono text-[9px] tracking-wide text-muted-foreground/40">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-primary/50" />
                <span>
                  {status === 'loading' ? (
                    <span className="text-primary animate-pulse">EXECUTING_INJECTION...</span>
                  ) : isValidEmail ? (
                    <span className="text-emerald-500/80 font-bold">PAYLOAD_VALIDATED // LINK_READY</span>
                  ) : (
                    "AWAITING_VAULT_PAYLOAD"
                  )}
                </span>
              </div>
              <span className="text-right text-muted-foreground/20">SECURE_TUNNEL_v2.4</span>
            </div>

            {/* Premium Handled Dynamic Error Alert Matrix */}
            {status === 'error' && (
              <framerMotion.div
                initial={{ opacity: 0, y: 5, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-destructive/20 bg-destructive/[0.02] text-destructive font-mono text-[11px]"
              >
                <ShieldAlert className="h-4 w-4 shrink-0 text-destructive/80" />
                <span className="leading-none tracking-tight">{message}</span>
              </framerMotion.div>
            )}
          </framerMotion.form>
        ) : (
          /* PURE INDUSTRIAL SATISFACTION IMMERSIVE SUCCESS RESPONSE */
          <framerMotion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.02] backdrop-blur-md text-left font-mono text-xs text-emerald-400/90 shadow-[0_20px_50px_-20px_rgba(16,185,129,0.15)]"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              <div className="space-y-1">
                <p className="font-bold text-foreground text-xs sm:text-sm tracking-tight uppercase">
                  ACCESS_GRANTED // NETWORK_LINKED
                </p>
                <p className="text-muted-foreground/60 text-[10px] sm:text-[11px] leading-relaxed">
                  {message || "Terminal pipeline synced successfully with CodEarn production clusters."}
                </p>
              </div>
            </div>
          </framerMotion.div>
        )}
      </AnimatePresence>
    </div>
  );
}