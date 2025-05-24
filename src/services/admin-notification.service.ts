import { getAdminNotificationTemplate } from '../templates';
import { Resend } from 'resend';

import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendAdminConfirmation = async (
    details: {
        email: string;
        name: string;
        country: string;
        role?: string;
        userType?: string;
    }
) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Xerion <waitlist@x-autocal.store>',
            to: 'xerionautocal@gmail.com',
            subject: '📥 New Xerion Waitlist Signup',
            html: getAdminNotificationTemplate(details),
        });

        if (error) {
            console.error('Error sending admin email:', error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Failed to send admin email:', error);
        throw error;
    }
};
