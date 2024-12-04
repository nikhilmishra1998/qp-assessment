import { Request, Response } from 'express';
import User from '../models/user';
import crypto from 'crypto';

export const addUser = async (req: Request, res: Response): Promise<void> => {
    const { username, password, role } = req.body;
    try {
        const hash = crypto.createHash('sha256').update(password).digest('hex');
        const newUser = await User.create({ username, password: hash, role });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};
