// app/enroll/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, ChevronRight, ChevronLeft, 
  Upload, CreditCard, User, BookOpen, 
  Clock, Shield, AlertCircle, Loader2,
  CheckIcon, ArrowRight
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
import { Progress } from '@/components/ui/progress';
import { createEnrollment, checkEnrollmentStatus } from '@/lib/api/enrollments';
import { EnrollmentFormData, ICourse } from '@/types/enrollment';

const steps = [
  { id: 1, title: 'Select Course', icon: BookOpen },
  { id: 2, title: 'Personal Info', icon: User },
  { id: 3, title: 'Payment', icon: CreditCard },
  { id: 4, title: 'Confirmation', icon: CheckCircle },
];

const LEVEL_CONFIG = {
  "Beginner": { color: "from-emerald-500 to-teal-600", badge: "bg-emerald-100 text-emerald-700" },
  "Intermediate": { color: "from-blue-500 to-indigo-600", badge: "bg-blue-100 text-blue-700" },
  "Advanced": { color: "from-violet-500 to-purple-600", badge: "bg-violet-100 text-violet-700" },
  "All Levels": { color: "from-amber-500 to-orange-600", badge: "bg-amber-100 text-amber-700" }
};

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
  
  // Form state
  const [formData, setFormData] = useState<Partial<EnrollmentFormData>>({
    experience: 'beginner',
    preferredBatch: 'morning',
    paymentMethod: 'bank_transfer',
  });
  
  const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
  const [receiptPreview, setReceiptPreview] = useState<string | null>(null);
  const [existingEnrollment, setExistingEnrollment] = useState<any>(null);

  // Pre-select course from URL
  useEffect(() => {
    const courseSlug = searchParams.get('course');
    if (courseSlug) {
      const course = courses.find(c => c.slug === courseSlug);
      if (course) {
        setSelectedCourse(course as ICourse);
        setFormData(prev => ({
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

  // Pre-fill user data if authenticated
  useEffect(() => {
  if (isAuthenticated && user) {
    setFormData(prev => ({
      ...prev,
      userId: user.id,
      // Profile object se data nikaalna hai aur optional chaining use karni hai
      firstName: user.profile?.firstName || '',
      lastName: user.profile?.lastName || '',
      email: user.email || '',
      // Agar phone profile mein hai toh user.profile.phone check karein
      phone: (user as any).phone || user.profile?.phone || '', 
    }));
  }
}, [isAuthenticated, user]);


  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'].includes(file.type)) {
        setError('Only JPG, PNG, or PDF files allowed');
        return;
      }
      handleInputChange('receipt', file);
      setReceiptPreview(URL.createObjectURL(file));
    }
  };

  const checkExistingEnrollment = async () => {
    if (formData.email && selectedCourse) {
      const result = await checkEnrollmentStatus(formData.email, selectedCourse.id);
      if (result.enrolled) {
        setExistingEnrollment(result.enrollment);
        return true;
      }
    }
    return false;
  };

  const validateStep = async () => {
    setError('');
    
    switch (currentStep) {
      case 1:
        if (!selectedCourse) {
          setError('Please select a course');
          return false;
        }
        const exists = await checkExistingEnrollment();
        if (exists) {
          setError(`You are already enrolled in this course (ID: ${existingEnrollment.enrollmentId})`);
          return false;
        }
        return true;
        
      case 2:
        const required = ['firstName', 'lastName', 'email', 'phone', 'cnic', 'address', 'city', 'education'];
        for (const field of required) {
          if (!formData[field as keyof EnrollmentFormData]) {
            setError(`Please fill in all required fields`);
            return false;
          }
        }
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email!)) {
          setError('Please enter a valid email address');
          return false;
        }
        // Validate phone (Pakistan format)
        const phoneRegex = /^(\+92|0)?[0-9]{10,11}$/;
        if (!phoneRegex.test(formData.phone!.replace(/[-\s]/g, ''))) {
          setError('Please enter a valid phone number');
          return false;
        }
        // Validate CNIC
        const cnicRegex = /^[0-9]{13}$/;
        if (!cnicRegex.test(formData.cnic!.replace(/[-]/g, ''))) {
          setError('Please enter a valid 13-digit CNIC number');
          return false;
        }
        return true;
        
      case 3:
        if (!formData.receipt) {
          setError('Please upload payment receipt');
          return false;
        }
        if (!formData.transactionId || formData.transactionId.length < 5) {
          setError('Please enter a valid transaction ID');
          return false;
        }
        return true;
        
      default:
        return true;
    }
  };

  const handleNext = async () => {
    const isValid = await validateStep();
    if (isValid && currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = await createEnrollment(formData as EnrollmentFormData);
      
      if (result.success) {
        setSuccess({
          enrollmentId: result.data!.enrollmentId,
          studentEmailSent: result.data!.studentEmailSent,
        });
        setCurrentStep(4);
      } else {
        setError(result.message || 'Something went wrong');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit enrollment');
    } finally {
      setIsLoading(false);
    }
  };

  const finalAmount = selectedCourse?.discountPrice || selectedCourse?.price || 0;

  return (
    <div className="min-h-screen bg-background relative top-20">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Course Enrollment</h1>
              <p className="text-muted-foreground mt-1">Complete your registration in 4 simple steps</p>
            </div>
            <Button variant="outline" onClick={() => router.push('/training')}>
              Back to Courses
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 h-1 bg-muted -translate-y-1/2 rounded-full" />
            <div 
              className="absolute left-0 top-1/2 h-1 bg-primary -translate-y-1/2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = step.id <= currentStep;
              const isCurrent = step.id === currentStep;
              
              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCurrent 
                      ? 'bg-primary border-primary text-primary-foreground scale-110 shadow-lg shadow-primary/25' 
                      : isActive 
                        ? 'bg-primary border-primary text-primary-foreground' 
                        : 'bg-card border-muted text-muted-foreground'
                  }`}>
                    {isActive && step.id < currentStep ? (
                      <CheckIcon className="w-6 h-6" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span className={`mt-2 text-sm font-medium ${
                    isCurrent ? 'text-foreground' : isActive ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
          <Progress value={(currentStep / steps.length) * 100} className="mt-6" />
        </div>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 1: Select Course */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Select Your Course</CardTitle>
                      <CardDescription>Choose the course you want to enroll in</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Select
                        value={selectedCourse?.slug}
                        onValueChange={(slug) => {
                          const course = courses.find(c => c.slug === slug);
                          if (course) {
                            setSelectedCourse(course as ICourse);
                            setFormData(prev => ({
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
                        <SelectTrigger className="h-auto">
                          <SelectValue placeholder="Select a course..." />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.slug} className="py-3">
                              <div className="flex items-center gap-3">
                                <span className="text-2xl">{course.icon}</span>
                                <div className="text-left">
                                  <p className="font-medium">{course.title}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {course.level} • {course.duration}
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {selectedCourse && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-lg border border-border bg-muted/30"
                        >
                          <div className="flex items-start gap-4">
                            <span className="text-4xl">{selectedCourse.icon}</span>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg">{selectedCourse.title}</h3>
                                <Badge className={LEVEL_CONFIG[selectedCourse.level as keyof typeof LEVEL_CONFIG]?.badge}>
                                  {selectedCourse.level}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mb-3">
                                {selectedCourse.shortDescription}
                              </p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" /> {selectedCourse.duration}
                                </span>
                                <span className="flex items-center gap-1">
                                  <BookOpen className="w-4 h-4" /> {selectedCourse.totalModules} modules
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-foreground">
                                PKR {(selectedCourse.discountPrice || selectedCourse.price).toLocaleString()}
                              </p>
                              {selectedCourse.discountPrice && (
                                <p className="text-sm text-muted-foreground line-through">
                                  PKR {selectedCourse.price.toLocaleString()}
                                </p>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Personal Info */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Personal Information</CardTitle>
                      <CardDescription>Enter your details for enrollment</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName || ''}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            placeholder="John"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName || ''}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            placeholder="Doe"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email || ''}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="john@example.com"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            value={formData.phone || ''}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="0300 1234567"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cnic">CNIC Number * (without dashes)</Label>
                        <Input
                          id="cnic"
                          value={formData.cnic || ''}
                          onChange={(e) => handleInputChange('cnic', e.target.value)}
                          placeholder="3520112345678"
                          maxLength={13}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Complete Address *</Label>
                        <Textarea
                          id="address"
                          value={formData.address || ''}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          placeholder="House #123, Street 4, Block A..."
                          rows={3}
                        />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={formData.city || ''}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            placeholder="Lahore"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="education">Education *</Label>
                          <Input
                            id="education"
                            value={formData.education || ''}
                            onChange={(e) => handleInputChange('education', e.target.value)}
                            placeholder="Bachelor's in Computer Science"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Experience Level *</Label>
                          <Select
                            value={formData.experience}
                            onValueChange={(value) => handleInputChange('experience', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner (0-1 year)</SelectItem>
                              <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                              <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Preferred Batch *</Label>
                          <Select
                            value={formData.preferredBatch}
                            onValueChange={(value) => handleInputChange('preferredBatch', value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                              <SelectItem value="evening">Evening (6 PM - 9 PM)</SelectItem>
                              <SelectItem value="weekend">Weekend (Sat-Sun)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Additional Message (Optional)</Label>
                        <Textarea
                          id="message"
                          value={formData.message || ''}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Any questions or special requirements..."
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Details</CardTitle>
                      <CardDescription>Upload payment receipt and transaction details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Payment Methods Info */}
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg border border-border bg-muted/30 text-center">
                          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-2xl">🏦</span>
                          </div>
                          <p className="font-medium text-sm">Bank Transfer</p>
                          <p className="text-xs text-muted-foreground mt-1">Account: 0123 4567 8901</p>
                          <p className="text-xs text-muted-foreground">Bank: HBL</p>
                        </div>
                        <div className="p-4 rounded-lg border border-border bg-muted/30 text-center">
                          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-2xl">📱</span>
                          </div>
                          <p className="font-medium text-sm">EasyPaisa</p>
                          <p className="text-xs text-muted-foreground mt-1">0300 1234567</p>
                          <p className="text-xs text-muted-foreground">Account Title: CodeEarn</p>
                        </div>
                        <div className="p-4 rounded-lg border border-border bg-muted/30 text-center">
                          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-yellow-100 flex items-center justify-center">
                            <span className="text-2xl">💰</span>
                          </div>
                          <p className="font-medium text-sm">JazzCash</p>
                          <p className="text-xs text-muted-foreground mt-1">0300 1234567</p>
                          <p className="text-xs text-muted-foreground">Account Title: CodeEarn</p>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Payment Method *</Label>
                          <Select
                            value={formData.paymentMethod}
                            onValueChange={(value) => handleInputChange('paymentMethod', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                              <SelectItem value="easypaisa">EasyPaisa</SelectItem>
                              <SelectItem value="jazzcash">JazzCash</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="transactionId">Transaction ID / Reference Number *</Label>
                          <Input
                            id="transactionId"
                            value={formData.transactionId || ''}
                            onChange={(e) => handleInputChange('transactionId', e.target.value)}
                            placeholder="e.g., TRX123456789"
                          />
                        </div>

                        {/* File Upload */}
                        <div className="space-y-2">
                          <Label>Payment Receipt *</Label>
                          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer relative">
                            <input
                              type="file"
                              accept="image/*,.pdf"
                              onChange={handleFileChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {receiptPreview ? (
                              <div className="space-y-2">
                                <img 
                                  src={receiptPreview} 
                                  alt="Receipt preview" 
                                  className="max-h-48 mx-auto rounded-lg shadow-md"
                                />
                                <p className="text-sm text-muted-foreground">Click to change file</p>
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <Upload className="w-10 h-10 mx-auto text-muted-foreground" />
                                <p className="text-sm font-medium">Click to upload receipt</p>
                                <p className="text-xs text-muted-foreground">JPG, PNG or PDF (max 5MB)</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 4: Success */}
              {currentStep === 4 && success && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-foreground mb-4">Enrollment Submitted!</h2>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Your enrollment has been received and is pending verification. You will receive a confirmation email shortly.
                  </p>
                  
                  <div className="bg-muted rounded-lg p-6 max-w-sm mx-auto mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Enrollment ID</p>
                    <p className="text-2xl font-bold text-foreground font-mono">{success.enrollmentId}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button variant="outline" onClick={() => router.push('/training')}>
                      Browse More Courses
                    </Button>
                    <Button onClick={() => router.push('student/dashboard')}>
                      Go to Dashboard
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 4 && (
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1 || isLoading}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                
                {currentStep === 3 ? (
                  <Button 
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-linear-to-r from-primary to-purple-600"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Complete Enrollment
                        <CheckCircle className="w-4 h-4 ml-2 " />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button className='relative right-5 ' onClick={handleNext}>
                    Continue
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Enrollment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedCourse ? (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{selectedCourse.icon}</span>
                        <div>
                          <p className="font-medium text-sm">{selectedCourse.title}</p>
                          <Badge variant="secondary" className="text-xs">
                            {selectedCourse.level}
                          </Badge>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Duration</span>
                          <span>{selectedCourse.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Modules</span>
                          <span>{selectedCourse.totalModules}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Topics</span>
                          <span>{selectedCourse.totalTopics}</span>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Course Fee</span>
                          <span className="line-through text-sm">
                            PKR {selectedCourse.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Total Payable</span>
                          <span className="text-xl font-bold text-primary">
                            PKR {finalAmount.toLocaleString()}
                          </span>
                        </div>
                        {selectedCourse.discountPrice && (
                          <Badge className="w-full justify-center bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                            You save PKR {(selectedCourse.price - selectedCourse.discountPrice).toLocaleString()}
                          </Badge>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="text-muted-foreground text-sm text-center py-4">
                      Select a course to see summary
                    </p>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Secure Enrollment</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Your information is encrypted and secure. We never share your data with third parties.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}