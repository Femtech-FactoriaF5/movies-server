import bcrypt from 'bcrypt';
import { NextFunction,Request,Response } from 'express';
import { User, userDAO } from '../../model/user/index';

export const hashingPassword = (password:string)  => {

    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

const encryptPassword = async (req:Request, res:Response, next:NextFunction) => {
    try {

        if(req.body.password){
        const passwordHash = await hashingPassword(req.body.password);
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
                const user:any = await userDAO.getUser(email);

                const passwordCorrect = await bcrypt.compare(req.body.password, user.password);

                passwordCorrect? next(): res.status(400).send('password incorrect')

            }
            }
            catch(error){
                res.status(400).send('user or password invalid')
            }
        }




export default {
    encryptPassword,
    validateUser
}