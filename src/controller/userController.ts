import {Request,Response} from 'express';
import {iUser} from '../model/interfaces/iUser';
import userModel from '../model/userModel';

const userController = async (req:Request,res:Response)=>{

    const {email,password}:iUser = req.body;
    if(!email){
        res.status(400).json({message:'email or password missing'});
    }
    const result = await userModel.saveUser({email,password});

    res.json(result);

}

export default userController;