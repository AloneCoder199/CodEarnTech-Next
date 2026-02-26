// models/Enrollment.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IEnrollment extends Document {
  enrollmentId: string;
  student: {
    userId?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    cnic: string;
    address: string;
    city: string;
    education: string;
    experience: 'beginner' | 'intermediate' | 'advanced';
  };
  course: {
    courseId: string;
    title: string;
    slug: string;
    level: string;
    duration: string;
    price: number;
    discountPrice?: number;
  };
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled';
  payment: {
    method: 'bank_transfer' | 'easypaisa' | 'jazzcash' | 'other';
    status: 'pending' | 'verified' | 'rejected';
    amount: number;
    transactionId: string;
    receiptUrl: string; // Cloudinary URL
    paidAt?: Date;
    verifiedAt?: Date;
    verifiedBy?: string;
  };
  preferredBatch: 'morning' | 'evening' | 'weekend';
  message?: string;
  notificationsSent: {
    studentEmail: boolean;
    adminEmail: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const EnrollmentSchema: Schema = new Schema(
  {
    enrollmentId: {
      type: String,
      required: false,
      unique: true,
    },
    student: {
      userId: { type: String, required: false },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      cnic: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      education: { type: String, required: true },
      experience: { 
        type: String, 
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true 
      },
    },
    course: {
      courseId: { type: String, required: true },
      title: { type: String, required: true },
      slug: { type: String, required: true },
      level: { type: String, required: true },
      duration: { type: String, required: true },
      price: { type: Number, required: true },
      discountPrice: { type: Number, required: false },
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'],
      default: 'pending',
    },
    payment: {
      method: { 
        type: String, 
        enum: ['bank_transfer', 'easypaisa', 'jazzcash', 'other'],
        required: true 
      },
      status: {
        type: String,
        enum: ['pending', 'verified', 'rejected'],
        default: 'pending',
      },
      amount: { type: Number, required: true },
      transactionId: { type: String, required: true },
      receiptUrl: { type: String, required: true },
      paidAt: { type: Date, required: false },
      verifiedAt: { type: Date, required: false },
      verifiedBy: { type: String, required: false },
    },
    preferredBatch: {
      type: String,
      enum: ['morning', 'evening', 'weekend'],
      required: true,
    },
    message: { type: String, required: false },
    notificationsSent: {
      studentEmail: { type: Boolean, default: false },
      adminEmail: { type: Boolean, default: false },
    },
  },
  {
    timestamps: true,
  }
);

// Generate unique enrollment ID before saving
EnrollmentSchema.pre('save', async function(next) {
  if (!this.enrollmentId) {
    const date = new Date();
    const year = date.getFullYear();
    const count = await mongoose.model('Enrollment').countDocuments();
    this.enrollmentId = `CDE-${year}-${String(count + 1).padStart(4, '0')}`;
  }
});

export default mongoose.models.Enrollment || mongoose.model<IEnrollment>('Enrollment', EnrollmentSchema);