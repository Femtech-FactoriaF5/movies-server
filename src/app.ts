import express from 'express';
import passport from 'passport';
import cors from 'cors';
import {movieRoute, userRoute} from './route';
import { initGooglePassport } from './services/google.strategy';
const app = express();
app.use(cors())
app.use(express.json());

app.use(movieRoute);
app.use(userRoute);

app.use(passport.initialize());
app.use(passport.session());
initGooglePassport(passport);



export default app;
