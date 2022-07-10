import { User, userDAO } from "../model/user";
import auth from './jwtHandler';
import {VerifyCallback } from "passport-google-oauth2";

export const getAccessFromGoogle = async (accessToken:string, refreshToken:string, profile:any, done:VerifyCallback) => {
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
                const user:User = {
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    password: ''
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