import passport from "passport";
import {Request,Response} from 'express';
import { userDAO } from "../model/user";
import { config } from "../config";
import {hashingPassword} from "./authHandler";
import auth from './jwtHandler';

export const getAccessFromGoogle = async (accessToken, refreshToken, profile, done) => {
try{
            const response = await userDAO.getUser(profile.emails[0].value)
            // const response = emails.includes(profile.emails[0].value);
            // IF EXITS IN DATABASE
            console.log(response);
            if (response) {

                done(null,  auth.generateToken(profile.emails[0].value));
            } else {
                // SAVE IN DATABASE
                //   emails.push(profile.emails[0].value);
                const user = {
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    password: null
                }

                const response:any = await userDAO.saveUser(user)
                done(null,  auth.generateToken(profile.emails[0].value));
            }
}catch(error){
    done(error,null)
}
       }

//     loginMiddleware: passport.authenticate('google', {
//                 scope: ['email','profile'],
//                 session: false,
//             })


// }