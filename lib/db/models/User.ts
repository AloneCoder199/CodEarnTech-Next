// /lib/db/models/User.ts

import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  role: 'student' | 'admin';
  studentId: string; // Auto-generated e.g. CET-482931
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
  violationCount: number;
  isBanned: boolean;

  // Methods
  comparePassword(candidatePassword: string): Promise<boolean>;
  incLoginAttempts(): Promise<void>;
  trackViolation(): Promise<number>;
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
      enum: ['student', 'admin'],
      default: 'student',
    },
    studentId: {
      type: String,
      unique: true,
      index: true,
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
    violationCount: { type: Number, default: 0 },
    lockUntil: Date,
    isBanned: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
UserSchema.index({ role: 1 });

// ── Corrected Student ID Generator Hook ───────────────────────────────────────
// FIX: Generics removed from signature. Explicit this: IUser defined inside. No next() parameter.
UserSchema.pre('save', async function (this: IUser) {
  if (this.isNew && !this.studentId) {
    try {
      const Model = this.constructor as mongoose.Model<IUser>;
      let isUnique = false;
      let generatedId = '';

      while (!isUnique) {
        const randomDigits = Math.floor(100000 + Math.random() * 900000); // 6-digit
        generatedId = `CET-${randomDigits}`;
        const existing = await Model.findOne({ studentId: generatedId });
        if (!existing) isUnique = true;
      }

      this.studentId = generatedId;
    } catch (error: any) {
      throw error; // Standard Mongoose behavior for async pre hooks
    }
  }
});

// ── Corrected Password Hashing Hook ─────────────────────────────────────────
// FIX: No redundant next() parameter.
UserSchema.pre('save', async function (this: IUser) {
  if (!this.isModified('password')) return;
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (error: any) {
    throw error;
  }
});

// ── Compare Password ──────────────────────────────────────────────────────────
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// ── Handle Login Attempts & Auto-Lock ────────────────────────────────────────
UserSchema.methods.incLoginAttempts = async function (): Promise<void> {
  if (this.lockUntil && this.lockUntil.getTime() < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 },
    });
  }
  const updates: any = { $inc: { loginAttempts: 1 } };
  if (this.loginAttempts + 1 >= 5) {
    updates.$set = { lockUntil: new Date(Date.now() + 30 * 60 * 1000) }; // 30 min lock
  }
  return this.updateOne(updates);
};

// ── Punishment System: Track Unauthorised Private Route Hits ─────────────────
UserSchema.methods.trackViolation = async function (): Promise<number> {
  const newCount = this.violationCount + 1;
  const updates: any = { $inc: { violationCount: 1 } };

  // 3 violations → 24 ghante ke liye lock
  if (newCount >= 3) {
    updates.$set = {
      lockUntil: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 Hours lock
      violationCount: 0, // Reset after punishment
    };
  }

  await this.updateOne(updates);
  return newCount;
};

// ── Virtuals ──────────────────────────────────────────────────────────────────
UserSchema.virtual('isLocked').get(function (this: IUser) {
  return !!((this.lockUntil && this.lockUntil.getTime() > Date.now()) || this.isBanned);
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;