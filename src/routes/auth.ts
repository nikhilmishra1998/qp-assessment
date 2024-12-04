import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import dotenv from 'dotenv';
import { JwtPayload } from '../types/jwtPayload';
import User from '../models/user';

dotenv.config();

const router = Router();

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', { session: false }, (err: Error | null, user: User | false, info: any) => {
        if (err) {
            console.error('Error during authentication:', err);
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }
        if (!user) {
            console.error('User not found or invalid password:', info);
            return res.status(400).json({
                message: 'Something is not right',
                user: user
            });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                console.error('Error during login:', err);
                res.send(err);
            }

            // Generate a signed JWT token
            const payload: JwtPayload = {
                id: user.id,
                username: user.username,
                role: user.role
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET as string);

            return res.json({ user, token });
        });
    })(req, res, next);
});

export default router;
