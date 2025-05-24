import { getContactTemplate } from '../templates';
import { Resend } from 'resend';

import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);
export const contactUsNotification = async (message: string
) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Xerion <support@zerastake.com>',
            to: 'xerionautocal@gmail.com',
            subject: '📥 New Contact Us Message',
            html: getContactTemplate(message),
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
