// types/enrollment.ts
export interface EnrollmentFormData {
  // Student Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cnic: string;
  address: string;
  city: string;
  education: string;
  experience: 'beginner' | 'intermediate' | 'advanced';
  
  // Course Info
  courseId: string;
  courseTitle: string;
  courseSlug: string;
  courseLevel: string;
  courseDuration: string;
  coursePrice: number;
  courseDiscountPrice?: number;
  
  // Payment Info
  paymentMethod: 'bank_transfer' | 'easypaisa' | 'jazzcash' | 'other';
  transactionId: string;
  receipt: File | null;
  paymentAmount: number;
  
  // Preferences
  preferredBatch: 'morning' | 'evening' | 'weekend';
  message?: string;
}

export interface EnrollmentResponse {
  success: boolean;
  message: string;
  data?: {
    enrollmentId: string;
    id: string;
    studentEmailSent: boolean;
    adminEmailSent: boolean;
  };
}

export interface ICourse {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration: string;
  price: number;
  discountPrice?: number;
  icon: string;
  featured?: boolean;
  totalModules: number;
  totalTopics: number;
  tags: string[];
  modules: any[];
  whatYouWillLearn: string[];
  requirements: string[];
}