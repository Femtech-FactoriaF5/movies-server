import Router from 'express';
import userController from '../controller/userController';
import auth from '../middleware/authHandler';
import jwt from '../middleware/jwtHandler';
const router = Router();

router.post('/user',userController.saveUser);
router.post('/user/login',auth.validateUser,userController.login);
router.get('/user/all',jwt.validateToken,userController.getAllUsers);
export default router;