import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden: Invalid token' });
            }
            req.user = user;
            if ((req.user as any).role === 'admin') {
                return next();
            } else {
                return res.status(403).json({ message: 'Forbidden: Admins only' });
            }
        });
    } else {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
};

export const isUser = (req: Request, res: Response, next: NextFunction) => {
    if (req.user && (req.user as any).role ===  'user') {
        return next();
    }
    return res.status(403).json({ message: 'Forbidden: Only users can place orders' });
};
