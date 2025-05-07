import mongoose, { Schema, Document } from 'mongoose';

interface Role {
    User: 'User';
    Investor: 'Investor';
    Partner: 'Partner';
}

export interface IWaitlist extends Document {
    email: string;
    name: string;
    phone: string;
    company: string;
    role: Role;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
}

const WaitlistSchema: Schema = new Schema(
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
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        company: {
            type: String,
        },
        role: {
            type: String,
            enum: ['User', 'Investor', 'Partner'],
            default: 'User',
        },
        status: {
            type: String,
            enum: ['Pending', 'Approved', 'Rejected'],
            default: 'Pending',
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IWaitlist>('Waitlist', WaitlistSchema); 