import mongoose, { Schema, Document } from 'mongoose';

export interface IModule {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  order: number;
  isPreview: boolean; // Free module?
  topics: ITopic[];
}

export interface ITopic {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl?: string; // YouTube embed
  duration: number; // minutes
  order: number;
  isPreview: boolean;
  resources: IResource[];
}

export interface IResource {
  title: string;
  fileUrl: string;
  fileType: string;
}

export interface ILiveClass {
  title: string;
  description: string;
  meetingLink: string; // Zoom/Google Meet
  meetingId?: string;
  password?: string;
  scheduledAt: Date;
  duration: number; // minutes
  isCompleted: boolean;
  recordingUrl?: string;
}



export interface ICourse extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  thumbnail: string;
  price: number;
  discountPrice?: number;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  duration: number; // total hours
  totalModules: number;
  totalTopics: number;
  instructor: {
    name: string;
    bio: string;
    avatar?: string;
    email: string;
    phone: string;
  };
  modules: IModule[];
  liveClasses: ILiveClass[];
  requirements: string[];
  whatYouWillLearn: string[];
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  syllabusVisibility: {
    basic: 'public' | 'login';
    intermediate: 'public' | 'login';
    advanced: 'public' | 'login';
  };
  enrolledStudents: number;
  maxStudents?: number; // Limited seats?
  ratings: {
    average: number;
    count: number;
  };
  coupons: ICoupon[];
  referralDiscount: {
    enabled: boolean;
    discountPercent: number;
    maxUses?: number;
  };
  createdBy: mongoose.Types.ObjectId;
  updatedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface ICoupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  validFrom: Date;
  validUntil: Date;
  maxUses?: number;
  usedCount: number;
  isActive: boolean;
  assignedTo?: mongoose.Types.ObjectId; // Specific user
  description?: string;
}

const ResourceSchema = new Schema({
  title: { type: String, required: true },
  fileUrl: { type: String, required: true },
  fileType: { type: String, required: true },
});

const TopicSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoUrl: { type: String },
  duration: { type: Number, default: 0 },
  order: { type: Number, required: true },
  isPreview: { type: Boolean, default: false },
  resources: [ResourceSchema],
});

const ModuleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  order: { type: Number, required: true },
  isPreview: { type: Boolean, default: false },
  topics: [TopicSchema],
});

const LiveClassSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  meetingLink: { type: String, required: true },
  meetingId: { type: String },
  password: { type: String },
  scheduledAt: { type: Date, required: true },
  duration: { type: Number, required: true },
  isCompleted: { type: Boolean, default: false },
  recordingUrl: { type: String },
});

const CouponSchema = new Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  discountValue: { type: Number, required: true },
  validFrom: { type: Date, default: Date.now },
  validUntil: { type: Date, required: true },
  maxUses: { type: Number },
  usedCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  description: { type: String },
});

const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
      maxlength: [200, 'Short description cannot exceed 200 characters'],
    },
    thumbnail: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative'],
    },
    discountPrice: {
      type: Number,
      min: [0, 'Discount price cannot be negative'],
      validate: {
        validator: function (this: ICourse, value: number) {
          return !value || value < this.price;
        },
        message: 'Discount price must be less than regular price',
      },
    },
    category: {
      type: String,
      required: true,
      enum: ['Programming', 'Web Development', 'Mobile Development', 'Data Science', 'Design', 'Marketing', 'Other'],
    },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    language: {
      type: String,
      default: 'Urdu',
      enum: ['Urdu', 'English', 'Both'],
    },
    duration: {
      type: Number,
      default: 0,
    },
    totalModules: {
      type: Number,
      default: 0,
    },
    totalTopics: {
      type: Number,
      default: 0,
    },
    instructor: {
      name: { type: String, required: true },
      bio: { type: String, required: true },
      avatar: { type: String },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    modules: [ModuleSchema],
    liveClasses: [LiveClassSchema],
    requirements: [{ type: String }],
    whatYouWillLearn: [{ type: String }],
    tags: [{ type: String, index: true }],
    isPublished: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    syllabusVisibility: {
      basic: { type: String, enum: ['public', 'login'], default: 'public' },
      intermediate: { type: String, enum: ['public', 'login'], default: 'login' },
      advanced: { type: String, enum: ['public', 'login'], default: 'login' },
    },
    enrolledStudents: {
      type: Number,
      default: 0,
    },
    maxStudents: {
      type: Number,
    },
    ratings: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },
    coupons: [CouponSchema],
    referralDiscount: {
      enabled: { type: Boolean, default: false },
      discountPercent: { type: Number, default: 10, min: 0, max: 100 },
      maxUses: { type: Number },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for performance
CourseSchema.index({ category: 1, level: 1 });
CourseSchema.index({ isPublished: 1, isFeatured: 1 });
CourseSchema.index({ price: 1 });
CourseSchema.index({ tags: 1 });
CourseSchema.index({ createdAt: -1 });

// Virtual for final price
CourseSchema.virtual('finalPrice').get(function () {
  return this.discountPrice || this.price;
});

// Pre-save middleware to calculate totals
CourseSchema.pre('save', function () {
  // total modules
  this.totalModules = this.modules.length;

  // total topics
  this.totalTopics = this.modules.reduce(
    (acc, module) => acc + (module.topics?.length || 0),
    0
  );

  // total duration (minutes)
  this.duration = this.modules.reduce(
    (acc, module) =>
      acc +
      module.topics.reduce(
        (tAcc, topic) => tAcc + (topic.duration || 0),
        0
      ),
    0
  );
});

// Soft delete method
CourseSchema.methods.softDelete = async function () {
  this.deletedAt = new Date();
  this.isPublished = false;
  return this.save();
};

// Check if coupon is valid
CourseSchema.methods.validateCoupon = function (code: string, userId?: string) {
  const coupon = this.coupons.find(
    (c: ICoupon) => c.code === code && c.isActive && c.validUntil > new Date()
  );
  
  if (!coupon) return { valid: false, message: 'Invalid or expired coupon' };
  
  if (coupon.maxUses && coupon.usedCount >= coupon.maxUses) {
    return { valid: false, message: 'Coupon usage limit reached' };
  }
  
  if (coupon.assignedTo && coupon.assignedTo.toString() !== userId) {
    return { valid: false, message: 'This coupon is not assigned to you' };
  }
  
  return { valid: true, coupon };
};

export default mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);