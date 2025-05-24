import mongoose, { Document, Schema } from 'mongoose';

export interface IContact extends Document {
    message: string;

}


const contactSchema = new Schema<IContact>(
    {
        message: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
    },
    {
        timestamps: true,
    }
);

// Create and export the model
export const Waitlist = mongoose.model<IContact>('Contact', contactSchema);

