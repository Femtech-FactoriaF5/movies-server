import { NextFunction, Request,Response } from "express";
import { config } from './../services/config';
import jwt, { JwtPayload } from 'jsonwebtoken';

const generateToken = (payload:JwtPayload) =>{
    return jwt.sign(payload,config().secret)
 }

 const getTokenFrom = request => {
    const authorization = request.get('authorization');

    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {

        return authorization.substring(7);
    } else {
        return null;
    }
}

const tokenVerify = token => jwt.verify(token, config().secret);


 const validateToken = (req:Request, res:Response, next:NextFunction) => {
    try {

        const token = getTokenFrom(req);
        console.log(token);

        const email:any = tokenVerify(token);




        if (!token || email!=='admin') {
            throw new Error ('token invalid or missing')
        } else {

                next();
        }
    } catch (error) {
        res.status(400).send(error.message)
    }

 }

 export default {
    generateToken,
    validateToken
 }