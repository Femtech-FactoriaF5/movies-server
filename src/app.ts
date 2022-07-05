import express, {Request,Response} from 'express';
import {movieRoute, userRoute, loginRoute} from './route';

const app = express();

app.use(express.json());
app.use(userRoute);
app.use(movieRoute);
app.use(loginRoute);
app.get('/',(req:Request,res:Response)=>{
    res.json('hello world');
})




export default app;

