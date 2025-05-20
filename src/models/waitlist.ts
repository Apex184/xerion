import mongoose, { Document, Schema } from 'mongoose';

export interface IWaitlist extends Document {
    email: string;
    name: string;
    country: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}


const waitlistSchema = new Schema<IWaitlist>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        country: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

// Create and export the model
export const Waitlist = mongoose.model<IWaitlist>('Waitlist', waitlistSchema);

