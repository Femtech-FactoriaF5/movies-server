import Router from 'express';
import userController from '../controller/userController';
import authHandler from '../middlewares/authHandler';
import { validateToken } from '../middlewares/jwtHandler';
const router = Router();

router.post('/user/login',authHandler.validateUser,userController.login);
router.post('/user',authHandler.encryptPassword,userController.saveUser);
router.get('/user',validateToken,userController.getAllUsers);

export default router;