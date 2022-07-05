import Router from 'express';
import userController from '../controller/userController';
import auth from '../middleware/auth';
const router = Router();

router.post('/user',auth.encryptPassword,userController);


export default router;