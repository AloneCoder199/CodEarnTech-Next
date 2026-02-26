import mongoose, { Schema, Document } from 'mongoose';

export interface INewsletter extends Document {
  subject: string;
  content: string;
  sentAt?: Date;
  recipientCount: number;
  status: 'draft' | 'sent';
  createdAt: Date;
}

const NewsletterSchema: Schema = new Schema({
  subject: { type: String, required: true },
  content: { type: String, required: true },
  sentAt: { type: Date, default: null },
  recipientCount: { type: Number, default: 0 },
  status: { type: String, enum: ['draft', 'sent'], default: 'draft' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Newsletter || mongoose.model<INewsletter>('Newsletter', NewsletterSchema);