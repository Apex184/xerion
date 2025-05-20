import { Request, Response } from 'express';
import Waitlist, { IWaitlist } from '../models/waitlist.model';
import { sendWaitlistConfirmation } from '../services/email.service';
import { sendAdminConfirmation } from '../services/admin-notification.service';

export const joinWaitlist = async (req: Request, res: Response) => {
    try {
        const { email, name, country, role, userType } = req.body as IWaitlist;

        const existingUser = await Waitlist.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const waitlistEntry = new Waitlist({ email, name, country, role, userType });
        await waitlistEntry.save();

        // Send confirmation to user
        try {
            await sendWaitlistConfirmation(email, name);
        } catch (emailError) {
            console.error('User confirmation failed:', emailError);
        }

        // 📩 Send notification to admin (you)
        try {
            await sendAdminConfirmation({ email, name, country, role, userType });
        } catch (adminEmailError) {
            console.error('Failed to notify admin:', adminEmailError);
        }

        res.status(201).json(waitlistEntry);
    } catch (error) {
        res.status(500).json({ message: 'Error joining waitlist', error });
    }
};


export const getWaitlist = async (req: Request, res: Response) => {
    try {
        const waitlist = await Waitlist.find().sort({ createdAt: -1 });
        res.status(200).json(waitlist);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching waitlist', error });
    }
};

export const updateWaitlistStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedEntry = await Waitlist.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedEntry) {
            return res.status(404).json({ message: 'Waitlist entry not found' });
        }

        res.status(200).json(updatedEntry);
    } catch (error) {
        res.status(500).json({ message: 'Error updating waitlist status', error });
    }
};

export const deleteWaitlistEntry = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedEntry = await Waitlist.findByIdAndDelete(id);

        if (!deletedEntry) {
            return res.status(404).json({ message: 'Waitlist entry not found' });
        }

        res.status(200).json({ message: 'Waitlist entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting waitlist entry', error });
    }
}; 