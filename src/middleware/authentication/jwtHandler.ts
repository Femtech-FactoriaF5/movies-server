import { NextFunction, Request, Response } from "express";
import {secret}  from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const generateToken = (payload: JwtPayload) => {
    return jwt.sign(payload, secret)
}

const getTokenFrom = (request: Request) => {
    const authorization = request.get('authorization');

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {

        return authorization.substring(7);

    } else {
        return null;
    }
}

const tokenVerify = (token: string) => jwt.verify(token, secret);


const validateToken = (req: Request, res: Response, next: NextFunction) => {
    try {

        const token: string | null = getTokenFrom(req);
        console.log(token);
        let payload: JwtPayload;
        if (token) {
            payload = tokenVerify(token) as JwtPayload;
            next();
        }
         else {
            throw new Error('token invalid or missing')

        }
    } catch (error:any) {
        res.status(400).send(error.message)
    }

}

export default {
    generateToken,
    validateToken
}