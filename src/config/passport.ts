// src/config/passport.ts
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user';
import applyJwtStrategy from './jwt';

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ where: { username } });
            if (!user) {
                console.error('User not found');
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            console.log('User found:', user);
            if (!user.validPassword(password)) {
                console.error('Invalid password');
                console.log('Input Password:', password);
                console.log('Stored Password:', user.password);
                return done(null, false, { message: 'Incorrect username or password.' });
            }
            return done(null, user);
        } catch (error) {
            console.error('Error during authentication:', error);
            return done(error);
        }
    }
));

passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

applyJwtStrategy(passport);

export default passport;
