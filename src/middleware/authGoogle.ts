import passport from 'passport';
import GooglePlusTokenStrategy from "passport-google-plus-token";
import userDAO from "../model/user/dao"
import { googleConfig } from "../config";
import { User } from "../model/user";
// Google Plus Strategy

//VERSIÓN PARA TRABAJAR CON UN TOKEN GENERADO POR EL CLIENTE

const { clientID, clientSecret } = googleConfig; // Your client secret

const googleStrategy = new GooglePlusTokenStrategy(
    { clientID, clientSecret,passReqToCallback: true },
    async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await userDAO.getUser(profile.emails[0].value);
            if (!user) {
                const newUser = await userDAO.saveUser({
                    email: profile.emails[0].value,
                    password: null,
                    name: profile.displayName,
                });
                return done(null, newUser);
            }
            return done(null, user);
        } catch (e) {
            return done(e, false);
        }
    }
);
passport.use(googleStrategy);
export const authGoogle = passport.authenticate("google-plus-token", { session: false });