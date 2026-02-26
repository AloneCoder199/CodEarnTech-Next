import mongoose, { Schema, Document } from 'mongoose';

export interface ISubscriber extends Document {
  email: string;
  token: string;
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
}

const SubscriberSchema: Schema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  token: { 
    type: String, 
    required: true, 
    unique: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  subscribedAt: { 
    type: Date, 
    default: Date.now 
  },
  unsubscribedAt: { 
    type: Date, 
    default: null 
  }
});

export default mongoose.models.Subscriber || mongoose.model<ISubscriber>('Subscriber', SubscriberSchema);