import {Request,Response} from 'express';

const loginController = (req:Request,res:Response) =>{

    res.send('usuario correcto');
}

export default loginController;