import { Response,Request,NextFunction, request } from "express";
import bcrypt from 'bcrypt';

const encryptPassword = async (req:Request,res:Response,next:NextFunction)=>{

    try {
        if(req.body.password!==undefined){
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

const validateUser = (req, res, next)=>{
    obtiene email y password de la request.
    llama a la bbdd recupera email y password
    compara la password de la request con la password de la bbdd
    si todo va bien llama a next()
    si va mal respuesta código 400 las passwords no coinciden
}

export default encryptPassword;