import bcrypt from 'bcrypt';
import { NextFunction,Request,Response } from 'express';
import { User, userDAO } from '../model/user/index';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from './../services/config';


const encryptPassword = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const saltRounds = 10;

        if(req.body.password){
        const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = passwordHash;
        // console.log(passwordHash);
        next();
    }else{
        throw new Error();
    }
    } catch (error) {
       res.status(500).send('internal error');
    }
}

const validateUser =  async (req:Request, res:Response, next:NextFunction) => {

            try {
                const {email, password} = req.body;
                if (!email || !password) {
                    res.status(400).send('missing some data');
                } else {
                const user:User = await userDAO.getUser(req.body);

                const passwordCorrect = await bcrypt.compare(req.body.password, user.password);

                passwordCorrect? next(): res.status(400).send('password incorrect')

            }
            }
            catch(error){
                res.status(400).send('user or password invalid')
            }
        }

const generateToken = (payload:JwtPayload) =>{
        return jwt.sign(payload,config().secret)
     }


export default {
    encryptPassword,
    validateUser,
    generateToken
}