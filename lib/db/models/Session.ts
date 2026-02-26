import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  userId: mongoose.Types.ObjectId;
  refreshToken: string;
  deviceFingerprint: string;
  userAgent: string;
  ip: string;
  location?: {
    country?: string;
    city?: string;
  };
  isValid: boolean;
  lastActive: Date;
  expiresAt: Date;
  createdAt: Date;
}

const SessionSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true, // ✅ Correct for searching
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
  deviceFingerprint: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  location: {
    country: String,
    city: String,
  },
  isValid: {
    type: Boolean,
    default: true,
    index: true, // ✅ SaaS Tip: Add index for quickly filtering valid sessions
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
    // ❌ Yahan se 'index: true' hata diya hai kyunke niche custom TTL index lagaya hai
  },
}, {
  timestamps: true,
});

// ✅ Correct Way: Single TTL (Time To Live) Index
// Is se duplicate warning khatam ho jayegi aur sessions auto-delete honge
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0, name: "session_ttl_index" });

// Next.js Hot-Reload friendly export
const Session = mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema);
export default Session;
