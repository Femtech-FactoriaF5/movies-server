import Router from 'express';
import userController from '../controller/userController';
import auth from '../middleware/authHandler';
import jwt from '../middleware/jwtHandler';
import passport from 'passport';


// ROUTES
const router = Router();
router.use(passport.initialize());

router.post('/user',auth.encryptPassword,userController.saveUser);
router.post('/user/login',auth.validateUser,userController.login);
router.get('/user/google', passport.authenticate("google", {
    scope: ["profile", "email"]
  }));
router.get('/auth/google', passport.authenticate("google", {
    session:false}), userController.Auth);

// router.get('/user/google/callback', passport.authenticate("google", {
//     session:false}), userController.Auth);
router.get('/user/all',jwt.validateToken,userController.getAllUsers);

export default router;