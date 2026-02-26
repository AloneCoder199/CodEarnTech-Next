import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  role: 'student' | 'admin'; // Role-based support
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    phone?: string;
  };
  isEmailVerified: boolean;
  verificationToken?: string;
  verificationTokenExpires?: Date;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  enrolledCourses: mongoose.Types.ObjectId[];
  
  // Security & Punishment System
  loginAttempts: number;
  lockUntil?: Date;
  violationCount: number; // For tracking private route hits
  isBanned: boolean;      // For permanent punishment
  
  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  incLoginAttempts(): Promise<void>;
  trackViolation(): Promise<number>; // New: Track illegal access
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters'],
      select: false,
    },
    role: {
      type: String,
      enum: ['student', 'admin'], // Admin added
      default: 'student',
    },
    profile: {
      firstName: { type: String, required: [true, 'First name is required'], trim: true },
      lastName: { type: String, required: [true, 'Last name is required'], trim: true },
      avatar: { type: String, default: '' },
      phone: { type: String, trim: true },
    },
    isEmailVerified: { type: Boolean, default: false },
    verificationToken: String,
    verificationTokenExpires: Date,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
    
    // Punishment Fields
    loginAttempts: { type: Number, default: 0 },
    violationCount: { type: Number, default: 0 }, // Unauthorised hits count
    lockUntil: Date,
    isBanned: { type: Boolean, default: false }, // Manual or auto ban
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes
// UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

// Password Hashing
UserSchema.pre<IUser>('save', async function () {
  if (!this.isModified('password')) return;
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error: any) {
    throw error;
  }
});

// Compare Password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Handle Login Attempts & Auto-Lock
UserSchema.methods.incLoginAttempts = async function (): Promise<void> {
  if (this.lockUntil && this.lockUntil.getTime() < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 },
    });
  }
  const updates: any = { $inc: { loginAttempts: 1 } };
  if (this.loginAttempts + 1 >= 5) {
    updates.$set = { lockUntil: new Date(Date.now() + 30 * 60 * 1000) }; // 30 mins lock
  }
  return this.updateOne(updates);
};

// PUNISHMENT SYSTEM: Track Unauthorised Private Route Hits
UserSchema.methods.trackViolation = async function (): Promise<number> {
  const newCount = this.violationCount + 1;
  const updates: any = { $inc: { violationCount: 1 } };

  // Agar 3 violations ho jayein to 24 ghante ke liye lock kar do
  if (newCount >= 3) {
    updates.$set = { 
      lockUntil: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 Hours Punishment
      violationCount: 0 // Reset after punishment applied
    };
  }
  
  await this.updateOne(updates);
  return newCount;
};

// Virtuals
UserSchema.virtual('isLocked').get(function (this: IUser) {
  return !!((this.lockUntil && this.lockUntil.getTime() > Date.now()) || this.isBanned);
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
