import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  studentId: mongoose.Types.ObjectId;
  courseId: mongoose.Types.ObjectId;
  amount: number;
  discountApplied: number;
  finalAmount: number;
  couponCode?: string;
  paymentMethod: 'jazzcash' | 'easypaisa';
  transactionId: string;
  screenshotUrl: string; // Cloudinary
  status: 'pending' | 'verified' | 'rejected';
  verifiedBy?: mongoose.Types.ObjectId;
  verifiedAt?: Date;
  rejectionReason?: string;
  enrolledAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    discountApplied: {
      type: Number,
      default: 0,
    },
    finalAmount: {
      type: Number,
      required: true,
    },
    couponCode: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ['jazzcash', 'easypaisa'],
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      trim: true,
    },
    screenshotUrl: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending',
    },
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    verifiedAt: {
      type: Date,
    },
    rejectionReason: {
      type: String,
    },
    enrolledAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
PaymentSchema.index({ studentId: 1, courseId: 1 }, { unique: true }); // One payment per course
PaymentSchema.index({ status: 1 });
PaymentSchema.index({ transactionId: 1 });

export default mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);