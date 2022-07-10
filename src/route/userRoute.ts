import Router from 'express';
import {userController} from '../controller/userController';
import auth from '../middleware/authentication/authHandler';
import jwt from '../middleware/jwtHandler';

const {saveUser,getAllUsers} = userController;
const {encryptPassword} = auth;
const {validateToken} = jwt;

// ROUTES
const router = Router();

router.route('/user')
        .post(encryptPassword,saveUser)
        .get (validateToken,getAllUsers);



export default router;