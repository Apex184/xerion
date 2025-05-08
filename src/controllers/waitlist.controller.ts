import { Request, Response } from 'express';
import Waitlist, { IWaitlist } from '../models/waitlist.model';
import { sendWaitlistConfirmation } from '../services/email.service';

export const joinWaitlist = async (req: Request, res: Response) => {
    try {
        const { email, name, company, role } = req.body;

        // Check if email already exists
        const existingUser = await Waitlist.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        const waitlistEntry = new Waitlist({
            email,
            name,
            company,
            role
        });

        await waitlistEntry.save();

        // Send confirmation email
        try {
            await sendWaitlistConfirmation(email, name);
        } catch (emailError) {
            console.error('Failed to send confirmation email:', emailError);
            // Continue with the response even if email fails
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