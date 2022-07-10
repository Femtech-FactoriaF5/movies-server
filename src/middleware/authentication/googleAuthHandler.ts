import { User, userDAO } from "../../model/user";

import { OAuth2Client } from 'google-auth-library';
import { NextFunction, Request, Response } from "express";
import { audience, secret } from '../../config'

import { hashingPassword } from "./authHandler";

const client = new OAuth2Client(audience);

export const getAccessFromGoogle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let user: any;

        const { token } = req.body;
        // console.log('token',token);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience
        })

        // console.log('ticket',ticket);

        if (ticket.getPayload() && ticket.getPayload()?.email_verified) {
            const email = ticket.getPayload()?.email || '';
            const name = ticket.getPayload()?.name || '';

            user = await userDAO.getUser(email);
            if (!user) {
                const password = await hashingPassword(`${email}${secret}`)

                user = await userDAO.saveUser({
                    email,
                    name,
                    password
                });
            }
            console.log(user)
            req.body=user;
            next();
        }
        else {
            throw new Error('error validación google token')
        }

    } catch (error: any) {
        res.json(error.message);
    }
}

//     loginMiddleware: passport.authenticate('google', {
//                 scope: ['email','profile'],
//                 session: false,
//             })


// }