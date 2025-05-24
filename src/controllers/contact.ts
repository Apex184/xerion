import { Request, Response } from 'express';

import { contactUsNotification } from '../services/contact';
import { IContact } from '../models/contact';


export const contactUs = async (req: Request, res: Response) => {
    try {
        const { message } = req.body as IContact;

        try {
            await contactUsNotification(message);
        } catch (emailError) {
            console.error('User confirmation failed:', emailError);
        }


        res.status(200).json('Thank you for your message');
    } catch (error) {
        res.status(500).json({ message: 'Error joining waitlist', error });
    }
};