'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, ChevronRight, ChevronLeft,
  Upload, CreditCard, User, BookOpen,
  Clock, Shield, AlertCircle, Loader2,
  CheckIcon, ArrowRight, Sparkles
} from 'lucide-react';
import { courses } from '@/lib/data';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { createEnrollment, checkEnrollmentStatus } from '@/lib/api/enrollments';
import { EnrollmentFormData, ICourse } from '@/types/enrollment';

const steps = [
  { id: 1, title: 'Course', icon: BookOpen },
  { id: 2, title: 'Profile', icon: User },
  { id: 3, title: 'Payment', icon: CreditCard },
  { id: 4, title: 'Done', icon: CheckCircle },
];

const LEVEL_CONFIG = {
  Beginner: { badge: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' },
  Intermediate: { badge: 'bg-primary/10 text-primary border border-primary/20' },
  Advanced: { badge: 'bg-violet-500/10 text-violet-400 border border-violet-500/20' },
  'All Levels': { badge: 'bg-amber-500/10 text-amber-400 border border-amber-500/20' },
};

/* ─── Field helper ─── */
function Field({
  label,
  id,
  children,
}: {
  label: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        htmlFor={id}
        className="block text-[13px] font-medium text-muted-foreground uppercase tracking-widest"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

/* ─── Apple-style Input ─── */
const appleInput =
  'h-12 rounded-xl bg-card border border-border/60 text-foreground placeholder:text-muted-foreground/50 px-4 text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary/60 transition-all duration-200';

export default function EnrollPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState<{
    enrollmentId: string;
    studentEmailSent: boolean;
  } | null>(null);

  const [formData, setFormData] = useState<Partial<EnrollmentFormData>>({
    experience: 'beginner',
    preferredBatch: 'morning',
    paymentMethod: 'bank_transfer',
  });

  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [existingEnrollment, setExistingEnrollment] = useState<any>(null);

  useEffect(() => {
    const courseSlug = searchParams.get('course');
    if (courseSlug) {
      const course = courses.find((c) => c.slug === courseSlug);
      if (course) {
        setSelectedCourse(course as ICourse);
        setFormData((prev) => ({
          ...prev,
          courseId: course.id,
          courseTitle: course.title,
          courseSlug: course.slug,
          courseLevel: course.level,
          courseDuration: course.duration,
          coursePrice: course.price,
          courseDiscountPrice: course.discountPrice,
          paymentAmount: course.discountPrice || course.price,
        }));
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (isAuthenticated && user) {
      setFormData((prev) => ({
        ...prev,
        userId: user.id,
        firstName: user.profile?.firstName || '',
        lastName: user.profile?.lastName || '',
        email: user.email || '',
        phone: (user as any).phone || user.profile?.phone || '',
      }));
    }
  }, [isAuthenticated, user]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { setError('File size must be less than 5MB'); return; }
      if (!['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'].includes(file.type)) {
        setError('Only JPG, PNG, or PDF files allowed'); return;
      }
      handleInputChange('receipt', file);
      setReceiptPreview(URL.createObjectURL(file));
    }
  };

  const checkExistingEnrollment = async () => {
    if (formData.email && selectedCourse) {
      const result = await checkEnrollmentStatus(formData.email, selectedCourse.id);
      if (result.enrolled) { setExistingEnrollment(result.enrollment); return true; }
    }
    return false;
  };

  const validateStep = async () => {
    setError('');
    switch (currentStep) {
      case 1:
        if (!selectedCourse) { setError('Please select a course'); return false; }
        const exists = await checkExistingEnrollment();
        if (exists) { setError(`Already enrolled (ID: ${existingEnrollment.enrollmentId})`); return false; }
        return true;
      case 2: {
        const required = ['firstName', 'lastName', 'email', 'phone', 'cnic', 'address', 'city', 'education'];
        for (const field of required) {
          if (!formData[field as keyof EnrollmentFormData]) { setError('Please fill in all required fields'); return false; }
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email!)) { setError('Invalid email address'); return false; }
        if (!/^(\+92|0)?[0-9]{10,11}$/.test(formData.phone!.replace(/[-\s]/g, ''))) { setError('Invalid phone number'); return false; }
        if (!/^[0-9]{13}$/.test(formData.cnic!.replace(/[-]/g, ''))) { setError('Invalid 13-digit CNIC'); return false; }
        return true;
      }
      case 3:
        if (!formData.receipt) { setError('Please upload payment receipt'); return false; }
        if (!formData.transactionId || formData.transactionId.length < 5) { setError('Enter a valid transaction ID'); return false; }
        return true;
      default: return true;
    }
  };

  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid && currentStep < 4) setCurrentStep((p) => p + 1);
  };

  const handleBack = () => { if (currentStep > 1) setCurrentStep((p) => p - 1); };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    try {
      const result = await createEnrollment(formData as EnrollmentFormData);
      if (result.success) {
        setSuccess({ enrollmentId: result.data!.enrollmentId, studentEmailSent: result.data!.studentEmailSent });
        setCurrentStep(4);
      } else setError(result.message || 'Something went wrong');
    } catch (err: any) {
      setError(err.message || 'Failed to submit enrollment');
    } finally {
      setIsLoading(false);
    }
  };

  const finalAmount = selectedCourse?.discountPrice || selectedCourse?.price || 0;

  /* ─── Step labels ─── */
  const stepTitles: Record<number, string> = {
    1: 'Choose your course',
    2: 'Your information',
    3: 'Complete payment',
    4: "You're enrolled",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ── Top Nav Bar ── */}
      <nav className="fixed top-0 inset-x-0 z-50 h-16 flex items-center border-b border-border/40 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between">
          <button
            onClick={() => router.push('/training')}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to courses
          </button>
          <span className="text-sm font-semibold text-foreground tracking-tight">Enrollment</span>
          <div className="w-24" /> {/* spacer */}
        </div>
      </nav>

      <div className="pt-16">
        {/* ── Hero Header ── */}
        <div className="max-w-6xl mx-auto px-6 pt-14 pb-10">
          <div className="max-w-xl">
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-primary mb-3">
              Step {currentStep} of {steps.length}
            </p>
            <h1 className="text-4xl font-bold text-foreground tracking-tight leading-tight">
              {stepTitles[currentStep]}
            </h1>
          </div>
        </div>

        {/* ── Step Track ── */}
        <div className="max-w-6xl mx-auto px-6 mb-10">
          <div className="flex items-center gap-0">
            {steps.map((step, idx) => {
              const isDone = step.id < currentStep;
              const isCurrent = step.id === currentStep;
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center flex-1 last:flex-none">
                  {/* Node */}
                  <div className="flex flex-col items-center gap-2">
                    <motion.div
                      animate={{
                        scale: isCurrent ? 1.1 : 1,
                        boxShadow: isCurrent
                          ? '0 0 0 4px oklch(0.64 0.16 250 / 18%)'
                          : '0 0 0 0px transparent',
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        isDone
                          ? 'bg-primary text-primary-foreground'
                          : isCurrent
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card border border-border text-muted-foreground'
                      }`}
                    >
                      {isDone ? <CheckIcon className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                    </motion.div>
                    <span className={`text-[11px] font-medium ${isCurrent ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.title}
                    </span>
                  </div>
                  {/* Connector */}
                  {idx < steps.length - 1 && (
                    <div className="flex-1 h-px mx-3 mb-5 bg-border relative overflow-hidden">
                      {isDone && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className="absolute inset-0 bg-primary origin-left"
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Error ── */}
        <div className="max-w-6xl mx-auto px-6">
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mb-6"
              >
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Main Grid ── */}
          <div className="grid lg:grid-cols-3 gap-8 pb-20">
            {/* Left: Form */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {/* ── Step 1 ── */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    <div className="rounded-2xl border border-border/60 bg-card p-6 space-y-5">
                      <Field label="Select Course">
                        <Select
                          value={selectedCourse?.slug}
                          onValueChange={(slug) => {
                            const course = courses.find((c) => c.slug === slug);
                            if (course) {
                              setSelectedCourse(course as ICourse);
                              setFormData((prev) => ({
                                ...prev,
                                courseId: course.id,
                                courseTitle: course.title,
                                courseSlug: course.slug,
                                courseLevel: course.level,
                                courseDuration: course.duration,
                                coursePrice: course.price,
                                courseDiscountPrice: course.discountPrice,
                                paymentAmount: course.discountPrice || course.price,
                              }));
                            }
                          }}
                        >
                          <SelectTrigger className={appleInput + ' w-full'}>
                            <SelectValue placeholder="Choose a course…" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-border/60">
                            {courses.map((course) => (
                              <SelectItem key={course.id} value={course.slug} className="py-3">
                                <div className="flex items-center gap-3">
                                  <span className="text-xl">{course.icon}</span>
                                  <div>
                                    <p className="font-medium text-sm">{course.title}</p>
                                    <p className="text-xs text-muted-foreground">{course.level} · {course.duration}</p>
                                  </div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>

                      {/* Course Card */}
                      <AnimatePresence>
                        {selectedCourse && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                              <div className="flex items-start gap-4">
                                <span className="text-4xl">{selectedCourse.icon}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <h3 className="font-semibold text-foreground">{selectedCourse.title}</h3>
                                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${LEVEL_CONFIG[selectedCourse.level as keyof typeof LEVEL_CONFIG]?.badge}`}>
                                      {selectedCourse.level}
                                    </span>
                                  </div>
                                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{selectedCourse.shortDescription}</p>
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {selectedCourse.duration}</span>
                                    <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {selectedCourse.totalModules} modules</span>
                                  </div>
                                </div>
                                <div className="text-right shrink-0">
                                  <p className="text-2xl font-bold text-foreground">
                                    PKR {(selectedCourse.discountPrice || selectedCourse.price).toLocaleString()}
                                  </p>
                                  {selectedCourse.discountPrice && (
                                    <p className="text-xs text-muted-foreground line-through">PKR {selectedCourse.price.toLocaleString()}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 2 ── */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="rounded-2xl border border-border/60 bg-card p-6 space-y-5">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="First Name" id="firstName">
                          <Input id="firstName" className={appleInput} value={formData.firstName || ''} onChange={(e) => handleInputChange('firstName', e.target.value)} placeholder="John" />
                        </Field>
                        <Field label="Last Name" id="lastName">
                          <Input id="lastName" className={appleInput} value={formData.lastName || ''} onChange={(e) => handleInputChange('lastName', e.target.value)} placeholder="Doe" />
                        </Field>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="Email Address" id="email">
                          <Input id="email" type="email" className={appleInput} value={formData.email || ''} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="john@example.com" />
                        </Field>
                        <Field label="Phone Number" id="phone">
                          <Input id="phone" className={appleInput} value={formData.phone || ''} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="0300 1234567" />
                        </Field>
                      </div>

                      <Field label="CNIC (without dashes)" id="cnic">
                        <Input id="cnic" className={appleInput} value={formData.cnic || ''} onChange={(e) => handleInputChange('cnic', e.target.value)} placeholder="3520112345678" maxLength={13} />
                      </Field>

                      <Field label="Complete Address" id="address">
                        <Textarea
                          id="address"
                          value={formData.address || ''}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="House #123, Street 4, Block A…"
                          rows={3}
                          className="rounded-xl bg-card border border-border/60 text-sm px-4 py-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 resize-none transition-all duration-200 placeholder:text-muted-foreground/50"
                        />
                      </Field>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="City" id="city">
                          <Input id="city" className={appleInput} value={formData.city || ''} onChange={(e) => handleInputChange('city', e.target.value)} placeholder="Lahore" />
                        </Field>
                        <Field label="Education" id="education">
                          <Input id="education" className={appleInput} value={formData.education || ''} onChange={(e) => handleInputChange('education', e.target.value)} placeholder="Bachelor's in CS" />
                        </Field>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <Field label="Experience Level">
                          <Select value={formData.experience} onValueChange={(v) => handleInputChange('experience', v)}>
                            <SelectTrigger className={appleInput + ' w-full'}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-border/60">
                              <SelectItem value="beginner">Beginner (0–1 year)</SelectItem>
                              <SelectItem value="intermediate">Intermediate (1–3 years)</SelectItem>
                              <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                        <Field label="Preferred Batch">
                          <Select value={formData.preferredBatch} onValueChange={(v) => handleInputChange('preferredBatch', v)}>
                            <SelectTrigger className={appleInput + ' w-full'}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-border/60">
                              <SelectItem value="morning">Morning (9 AM – 12 PM)</SelectItem>
                              <SelectItem value="evening">Evening (6 PM – 9 PM)</SelectItem>
                              <SelectItem value="weekend">Weekend (Sat–Sun)</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                      </div>

                      <Field label="Additional Message (optional)" id="message">
                        <Textarea
                          id="message"
                          value={formData.message || ''}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Any questions or special requirements…"
                          rows={2}
                          className="rounded-xl bg-card border border-border/60 text-sm px-4 py-3 focus:ring-2 focus:ring-primary/40 focus:border-primary/60 resize-none transition-all duration-200 placeholder:text-muted-foreground/50"
                        />
                      </Field>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 3 ── */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                  >
                    {/* Payment accounts */}
                    <div className="grid sm:grid-cols-3 gap-3">
                      {[
                        { emoji: '🏦', label: 'Bank Transfer', detail: 'HBL · 1021043597775014 . Muhammad Bilal' },
                        { emoji: '📱', label: 'Naypay', detail: '0322 0162499 · Muhammad Bilal' },
                        { emoji: '💰', label: 'JazzCash', detail: '0322 0162499 · Mhammad Bilal' },
                      ].map((m) => (
                        <div key={m.label} className="rounded-xl border border-border/60 bg-card p-4 text-center">
                          <span className="text-2xl block mb-2">{m.emoji}</span>
                          <p className="text-sm font-semibold text-foreground mb-0.5">{m.label}</p>
                          <p className="text-xs text-muted-foreground">{m.detail}</p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-2xl border border-border/60 bg-card p-6 space-y-5">
                      <Field label="Payment Method">
                        <Select value={formData.paymentMethod} onValueChange={(v) => handleInputChange('paymentMethod', v)}>
                          <SelectTrigger className={appleInput + ' w-full'}>
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-border/60">
                            <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                            <SelectItem value="NayPay">Naypay</SelectItem>
                            <SelectItem value="jazzcash">JazzCash</SelectItem>
                          </SelectContent>
                        </Select>
                      </Field>

                      <Field label="Transaction ID / Reference Number" id="transactionId">
                        <Input
                          id="transactionId"
                          className={appleInput}
                          value={formData.transactionId || ''}
                          onChange={(e) => handleInputChange('transactionId', e.target.value)}
                          placeholder="TRX123456789"
                        />
                      </Field>

                      {/* Receipt Upload */}
                      <div className="space-y-1.5">
                        <label className="block text-[13px] font-medium text-muted-foreground uppercase tracking-widest">
                          Payment Receipt
                        </label>
                        <label className="relative flex flex-col items-center justify-center w-full min-h-[180px] rounded-xl border-2 border-dashed border-border/60 bg-muted/20 hover:bg-muted/40 hover:border-primary/40 transition-all duration-200 cursor-pointer group">
                          <input type="file" accept="image/*,.pdf" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                          {receiptPreview ? (
                            <div className="p-4 text-center">
                              <img src={receiptPreview} alt="Receipt" className="max-h-40 mx-auto rounded-lg shadow-md mb-3" />
                              <p className="text-xs text-muted-foreground">Click to replace</p>
                            </div>
                          ) : (
                            <div className="text-center p-8">
                              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <Upload className="w-5 h-5 text-primary" />
                              </div>
                              <p className="text-sm font-medium text-foreground mb-1">Upload payment receipt</p>
                              <p className="text-xs text-muted-foreground">JPG, PNG or PDF · Max 5 MB</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ── Step 4 Success ── */}
                {currentStep === 4 && success && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, type: 'spring', stiffness: 200 }}
                    className="rounded-2xl border border-border/60 bg-card p-10 text-center"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-3 tracking-tight">Enrollment submitted</h2>
                    <p className="text-muted-foreground mb-8 max-w-sm mx-auto text-sm leading-relaxed">
                      Your enrollment is pending verification. You'll receive a confirmation email soon.
                    </p>

                    <div className="inline-block bg-muted/50 rounded-2xl px-8 py-5 mb-8">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">Enrollment ID</p>
                      <p className="text-3xl font-bold text-foreground font-mono tracking-wider">{success.enrollmentId}</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={() => router.push('/training')}
                        className="h-11 px-6 rounded-xl border border-border/60 text-sm font-medium text-foreground hover:bg-muted/50 transition-colors"
                      >
                        Browse more courses
                      </button>
                      <button
                        onClick={() => router.push('student/dashboard')}
                        className="h-11 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                      >
                        Go to dashboard <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Nav Buttons ── */}
              {currentStep < 4 && (
                <div className="flex justify-between mt-6">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 1 || isLoading}
                    className="h-11 px-5 rounded-xl border border-border/60 text-sm font-medium text-foreground hover:bg-muted/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>

                  {currentStep === 3 ? (
                    <button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="h-11 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-60 transition-colors flex items-center gap-2"
                    >
                      {isLoading ? (
                        <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                      ) : (
                        <><Sparkles className="w-4 h-4" /> Complete Enrollment</>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      className="h-11 px-6 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* ── Sidebar ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-3">
                {/* Summary Card */}
                <div className="rounded-2xl border border-border/60 bg-card p-5 space-y-4">
                  <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">Summary</p>

                  {selectedCourse ? (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{selectedCourse.icon}</span>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{selectedCourse.title}</p>
                          <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium mt-0.5 inline-block ${LEVEL_CONFIG[selectedCourse.level as keyof typeof LEVEL_CONFIG]?.badge}`}>
                            {selectedCourse.level}
                          </span>
                        </div>
                      </div>

                      <div className="h-px bg-border/60" />

                      <div className="space-y-2 text-sm">
                        {[
                          ['Duration', selectedCourse.duration],
                          ['Modules', selectedCourse.totalModules],
                          ['Topics', selectedCourse.totalTopics],
                        ].map(([k, v]) => (
                          <div key={k as string} className="flex justify-between">
                            <span className="text-muted-foreground">{k}</span>
                            <span className="text-foreground font-medium">{v}</span>
                          </div>
                        ))}
                      </div>

                      <div className="h-px bg-border/60" />

                      <div className="space-y-2">
                        {selectedCourse.discountPrice && (
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Original price</span>
                            <span className="line-through text-muted-foreground">PKR {selectedCourse.price.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-foreground">Total payable</span>
                          <span className="text-xl font-bold text-primary">PKR {finalAmount.toLocaleString()}</span>
                        </div>
                        {selectedCourse.discountPrice && (
                          <div className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-emerald-500/8 border border-emerald-500/15">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-xs font-medium text-emerald-400">
                              Save PKR {(selectedCourse.price - selectedCourse.discountPrice).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">Select a course to see your summary</p>
                  )}
                </div>

                {/* Trust card */}
                <div className="rounded-2xl border border-border/40 bg-muted/20 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-0.5">Secure enrollment</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Your information is encrypted. We never share your data with third parties.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}