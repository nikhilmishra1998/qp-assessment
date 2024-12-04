import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import { PassportStatic } from 'passport';
import User from '../models/user';
import dotenv from 'dotenv';

dotenv.config();

const jwtOptions: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string,
};

const strategy = new JwtStrategy(jwtOptions, async (jwtPayload: any, done: VerifiedCallback) => {
    try {
        const user = await User.findByPk(jwtPayload.id);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
});

const applyJwtStrategy = (passport: PassportStatic) => {
    passport.use(strategy);
};

export default applyJwtStrategy;
