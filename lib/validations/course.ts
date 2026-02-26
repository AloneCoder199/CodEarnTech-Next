import { z } from 'zod';

export const createCourseSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  shortDescription: z.string().min(20).max(200),
  price: z.number().min(0, 'Price cannot be negative'),
  discountPrice: z.number().min(0).optional(),
  category: z.enum(['Programming', 'Web Development', 'Mobile Development', 'Data Science', 'Design', 'Marketing', 'Other']),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  language: z.enum(['Urdu', 'English', 'Both']).default('Urdu'),
  maxStudents: z.number().min(1).optional(),
  instructor: z.object({
    name: z.string().min(2),
    bio: z.string().min(20),
    email: z.string().email(),
    phone: z.string().min(11),
  }),
  requirements: z.array(z.string()).min(1, 'At least one requirement'),
  whatYouWillLearn: z.array(z.string()).min(1, 'At least one learning outcome'),
  tags: z.array(z.string()),
  syllabusVisibility: z.object({
    basic: z.enum(['public', 'login']).default('public'),
    intermediate: z.enum(['public', 'login']).default('login'),
    advanced: z.enum(['public', 'login']).default('login'),
  }),
  referralDiscount: z.object({
    enabled: z.boolean().default(false),
    discountPercent: z.number().min(0).max(100).default(10),
    maxUses: z.number().optional(),
  }).optional(),
});

export const updateCourseSchema = createCourseSchema.partial();

export const moduleSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  isPreview: z.boolean().default(false),
  topics: z.array(z.object({
    title: z.string().min(3),
    description: z.string(),
    videoUrl: z.string().url().optional(),
    duration: z.number().min(0),
    isPreview: z.boolean().default(false),
    resources: z.array(z.object({
      title: z.string(),
      fileUrl: z.string().url(),
      fileType: z.string(),
    })).optional(),
  })).min(1, 'At least one topic required'),
});

export const liveClassSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  meetingLink: z.string().url(),
  meetingId: z.string().optional(),
  password: z.string().optional(),
  scheduledAt: z.string().datetime(),
  duration: z.number().min(15),
});

export const couponSchema = z.object({
  code: z.string().min(4).max(20).toUpperCase(),
  discountType: z.enum(['percentage', 'fixed']),
  discountValue: z.number().min(0),
  validUntil: z.string().datetime(),
  maxUses: z.number().optional(),
  assignedTo: z.string().optional(), // User ID
  description: z.string().optional(),
});

export const paymentSubmissionSchema = z.object({
  courseId: z.string(),
  amount: z.number(),
  couponCode: z.string().optional(),
  paymentMethod: z.enum(['jazzcash', 'easypaisa']),
  transactionId: z.string().min(5),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>;
export type UpdateCourseInput = z.infer<typeof updateCourseSchema>;
export type ModuleInput = z.infer<typeof moduleSchema>;
export type LiveClassInput = z.infer<typeof liveClassSchema>;
export type CouponInput = z.infer<typeof couponSchema>;
export type PaymentSubmissionInput = z.infer<typeof paymentSubmissionSchema>;