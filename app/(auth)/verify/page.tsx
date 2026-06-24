'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, CheckCircle2, XCircle, Clock, BookOpen, Mail, 
  UserCircle, Download, ArrowRight, Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

// Dynamic Level Config Fallback mapping
const LEVEL_CONFIG = {
  "Beginner": { badge: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 border-neutral-200/40" },
  "Intermediate": { badge: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 border-neutral-200/40" },
  "Advanced": { badge: "bg-primary text-primary-foreground border-transparent font-medium" },
  "All Levels": { badge: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 border-neutral-200/40" }
};

// Available Lucide Icons Map for safe execution fallback
const ICON_COMPONENTS: Record<string, any> = {
  BookOpen: BookOpen,
};

interface PopulatedCourse {
  _id: string;
  title: string;
  slug: string;
  icon: string;
  level: string;
  duration: string;
  shortDescription: string;
}

interface VerificationData {
  _id: string;
  studentId: string;
  fullName: string;
  email: string;
  isVerified: boolean;
  role: string;
  joinedDate: string;
  courses: PopulatedCourse[]; // Aligned with consolidated mapping array from API
}

export default function VerifyCertificatePage() {
  const [studentId, setStudentId] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<VerificationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    if (!studentId.trim().startsWith('CET-')) {
      setError('Please enter a valid Student ID starting with "CET-".');
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      // 🔥 PERFECT LINKAGE: Make sure this points to the exact path where you saved the GET API
      const res = await fetch(`/api/auth/verify-certificate?studentId=${studentId.trim()}`);
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || 'Verification failed.');
      }
      // API wraps the actual payload inside the "data" attribute
      setData(result.data);
    } catch (err: any) {
      setError(err.message || 'Student ID not found or invalid within live registries.');
    } finally {
      setLoading(false);
    }
  };

  // Safe Render Handler for Emojis vs Lucide Icon strings
  const renderCourseIcon = (iconName: string) => {
    const IconComp = ICON_COMPONENTS[iconName];
    if (IconComp) {
      return <IconComp className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />;
    }
    return <span className="text-xl leading-none">{iconName || '📚'}</span>;
  };

  // Professional Native PDF Engine Trigger
  const handleDownloadPDF = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950 text-foreground antialiased pb-24 pt-20 relative mt-10 print:bg-white print:pt-0 print:pb-0">
      
      {/* Decorative Minimal Ambient Light Effect (Hidden in Print) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-64 bg-radial from-neutral-100/40 to-transparent dark:from-neutral-900/10 pointer-events-none print:hidden" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative">
        
        {/* Header Segment */}
        <div className="max-w-3xl mx-auto text-center space-y-3 print:text-left print:border-b print:pb-6 print:border-neutral-200">
          <Badge variant="outline" className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border-neutral-200 dark:border-neutral-800 text-neutral-500 print:border-neutral-400">
            Official CET Registry System
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 print:text-2xl print:text-black">
            Verification & Audit Transcript
          </h1>
          <p className="text-sm sm:text-base text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto font-normal leading-relaxed print:text-xs print:text-neutral-600 print:mt-1">
            Secure, unalterable data logs confirming the graduation records and completed technical milestones at CodEarn Tech.
          </p>
        </div>

        {/* Search Bar Block (Hidden completely during Print) */}
        <Card className="max-w-xl mx-auto border border-neutral-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-950/50 rounded-2xl shadow-xs backdrop-blur-sm print:hidden">
          <CardContent className="p-3 sm:p-4 flex items-center gap-3">
            <Search className="w-5 h-5 text-neutral-400 shrink-0 ml-1" />
            <Input 
              type="text" 
              value={studentId}
              onChange={(e) => setStudentId(e.target.value.toUpperCase())}
              placeholder="Enter Student ID (e.g. CET-0001)"
              className="flex-grow border-none bg-transparent rounded-xl h-10 text-sm focus:ring-0 shadow-none font-mono tracking-wider"
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
            />
            <Button 
              onClick={handleVerify} 
              disabled={loading}
              className="rounded-xl h-10 px-5 text-xs font-semibold shadow-xs"
            >
              {loading ? "Verifying..." : "Verify"}
            </Button>
          </CardContent>
        </Card>

        {/* Results Presentation Dashboard */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="max-w-xl mx-auto text-center print:hidden">
              <XCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
            </motion.div>
          )}

          {data && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              
              {/* Actions Header Bar for Data Export (Hidden in Print) */}
              <div className="flex justify-end items-center print:hidden">
                <Button 
                  onClick={handleDownloadPDF}
                  variant="outline" 
                  className="rounded-xl text-xs font-medium px-4 h-9 gap-2 border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Audit PDF
                </Button>
              </div>

              {/* Main Responsive Grid Details */}
              <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start print:grid-cols-3 print:gap-4">
                
                {/* Column 1: Profile Matrix */}
                <div className="md:col-span-1 space-y-6 sticky top-24 print:relative print:top-0 print:col-span-1">
                  <Card className="border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-950 rounded-2xl overflow-hidden shadow-xs print:border-none print:shadow-none">
                    <CardHeader className="p-6 text-center bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200/50 dark:border-neutral-800/50 print:bg-transparent print:border-b-0 print:p-0 print:text-left">
                      {data.isVerified ? (
                        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3 print:mx-0 print:w-8 print:h-8 print:mb-2" />
                      ) : (
                        <XCircle className="w-12 h-12 text-neutral-400 mx-auto mb-3 print:mx-0 print:w-8 print:h-8 print:mb-2" />
                      )}
                      <CardTitle className="text-xl font-bold tracking-tight text-neutral-950 dark:text-neutral-50 print:text-lg print:text-black">
                        {data.fullName}
                      </CardTitle>
                      <CardDescription className="text-xs font-mono tracking-wider uppercase text-neutral-400 print:text-neutral-600 print:mt-0.5">
                        {data.studentId}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 space-y-5 text-xs font-normal text-neutral-700 dark:text-neutral-300 print:p-0 print:mt-4 print:space-y-3 print:text-black">
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-neutral-400 shrink-0 print:text-neutral-700" /> 
                        <span className="truncate">{data.email}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <UserCircle className="w-4 h-4 text-neutral-400 shrink-0 print:text-neutral-700" /> 
                        Joined {new Date(data.joinedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </div>
                      <Separator className="bg-neutral-100 dark:bg-neutral-800/60 print:bg-neutral-200" />
                      <div className="flex justify-between items-center text-xs pt-0.5 print:justify-start print:gap-4">
                        <span className="text-neutral-400 print:text-neutral-600">Registry Status:</span>
                        <Badge className={data.isVerified ? "bg-green-100 text-green-800 dark:bg-green-950/40 dark:text-green-400 border-transparent" : "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 border-transparent"}>
                          {data.isVerified ? "Verified Graduate" : "Pending Records"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Column 2: Architectural Courses List */}
                <div className="md:col-span-2 space-y-6 print:col-span-2">
                  <Card className="border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-950 rounded-2xl overflow-hidden shadow-xs print:border-none print:shadow-none">
                    <CardHeader className="p-6 sm:p-8 pb-3 print:p-0">
                      <CardTitle className="text-lg sm:text-xl font-bold tracking-tight print:text-base print:text-black">Completed Curriculums</CardTitle>
                      <CardDescription className="text-xs text-neutral-400 print:text-neutral-600">Verified institutional curriculum paths successfully evaluated and concluded.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-6 sm:p-8 pt-2 space-y-4 print:p-0 print:mt-4">
                      {data?.courses && data.courses.length > 0 ? (
                        <div className="grid sm:grid-cols-2 gap-4 print:grid-cols-1 print:gap-3">
                          {data.courses.map((course) => (
                            <div 
                              key={course?._id} 
                              className="p-4 rounded-xl border border-neutral-200/50 dark:border-neutral-800 bg-neutral-50/20 dark:bg-neutral-900/10 flex items-start gap-3.5 transition-colors hover:border-neutral-300 dark:hover:border-neutral-700 print:bg-transparent print:border print:border-neutral-300 print:p-3"
                            >
                              {/* Integrated Icon Resolver */}
                              <div className="p-2 bg-white dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800 rounded-lg shadow-3xs shrink-0 flex items-center justify-center min-w-10 min-h-10 print:border-neutral-300 print:p-1">
                                {renderCourseIcon(course?.icon)}
                              </div>
                              <div className="space-y-0.5 min-w-0 flex-grow">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <h3 className="font-bold text-xs text-neutral-900 dark:text-neutral-50 print:text-black truncate max-w-[140px] sm:max-w-none">
                                    {course?.title}
                                  </h3>
                                  <Badge className={`text-[8px] font-semibold uppercase px-1.5 py-0.5 rounded ${LEVEL_CONFIG[course?.level as keyof typeof LEVEL_CONFIG]?.badge || LEVEL_CONFIG["All Levels"].badge} print:border print:border-neutral-400 print:text-black print:bg-transparent`}>
                                    {course?.level || 'All Levels'}
                                  </Badge>
                                </div>
                                <p className="text-[11px] text-neutral-400 dark:text-neutral-500 max-w-sm line-clamp-2 leading-relaxed font-normal print:text-black print:line-clamp-none">
                                  {course?.shortDescription}
                                </p>
                                <div className="flex items-center gap-4 text-[10px] text-neutral-400 font-mono pt-1 print:text-neutral-700">
                                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course?.duration}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-neutral-400 italic text-center py-6 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl bg-neutral-50/50 dark:bg-neutral-900/30 print:text-black">No active industrial tracks mapped onto this user ledger account.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

              </div>

              {/* Ultra-Premium Marketing CTA Banner (Hidden in Print Layout) */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="pt-4 print:hidden"
              >
                <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8 border border-neutral-200/70 dark:border-neutral-800/80 bg-gradient-to-r from-neutral-900 to-neutral-950 dark:from-neutral-950 dark:to-neutral-900/50 text-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
                  
                  {/* Glowing background highlights */}
                  <div className="absolute inset-0 bg-radial from-primary/10 to-transparent pointer-events-none opacity-60" />
                  
                  <div className="space-y-2 text-center sm:text-left relative z-10 max-w-xl">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-neutral-400 font-mono tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-primary shrink-0 animate-pulse" />
                      Build Real Industrial Skills
                    </div>
                    <h3 className="text-base sm:text-lg font-bold tracking-tight text-white">
                      Want to accelerate your technical expertise like this student?
                    </h3>
                    <p className="text-xs text-neutral-400 font-normal leading-relaxed">
                      Join CodEarn Tech to learn software development, architectural system engineering, and earn cryptographic verifiable badges.
                    </p>
                  </div>

                  <Link href="/training" className="shrink-0 relative z-10 w-full sm:w-auto">
                    <Button className="w-full sm:w-auto rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 transition-all font-semibold text-xs h-10 px-5 group gap-1.5 shadow-sm">
                      Explore Tracks
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Button>
                  </Link>

                </div>
              </motion.div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Global Printing Media Query CSS Hack */}
      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
          }
          .print\:hidden {
            display: none !important;
          }
          nav, footer, .absolute {
            display: none !important;
          }
          .max-w-6xl {
            max-w: 100% !important;
            width: 100% !important;
            padding: 0 !important;
          }
          card, .border {
            border: none !important;
            background: transparent !important;
            box-shadow: none !important;
          }
        }
      `}</style>

    </div>
  );
}