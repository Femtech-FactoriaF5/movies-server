import { Response,Request,NextFunction, request } from "express";
import bcrypt from 'bcrypt';
import userModel from "../model/userModel";

const encryptPassword = async (req:Request,res:Response,next:NextFunction)=>{

    try {
        if(req.body.password===undefined){
            res.send('password missing');
        } else {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(req.body.password,saltRounds);
        req.body.password = passwordHash;
        next();}

    } catch (error) {
        res.status(500).send('internal error');
    }
}

const validateUser = async (req, res, next)=>{


    try {
        // obtiene email y password de la request.
        const {email,password} =req.body;

        if(!email || !password){
           throw new Error(' email or password not exist');
        }

        // llama a la bbdd recupera email y password
        const result = await userModel.getUser({email,password});
        // compara la password de la request con la password de la bbdd
        const comparePassword = await bcrypt.compare(password, result.password);

        if(comparePassword){
            // si todo va bien llama a next()
            next();
        } else {
            // si va mal respuesta código 400 las passwords no coinciden
            throw new Error('password not valid');
        }


    } catch (error) {
        res.status(400).send(error.message);
    }

}

export default {encryptPassword, validateUser};