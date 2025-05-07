import { Resend } from 'resend';
import { getWaitlistEmailTemplate } from '../templates/waitlist-email';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWaitlistConfirmation = async (email: string, name: string) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Xerion <support@zerastake.com>',
            to: email,
            subject: 'Welcome to Xerion Waitlist! 🎉',
            html: getWaitlistEmailTemplate(name),
        });

        if (error) {
            console.error('Error sending email:', error);
            throw error;
        }

        return data;
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
}; 