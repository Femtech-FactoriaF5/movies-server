import express, {Request,Response} from 'express';
import {movieRoute, userRoute} from './route';

const app = express();

app.use(express.json());
app.use(userRoute);
app.use(movieRoute);

app.get('/',(req:Request,res:Response)=>{
    res.json('hello world');
})




export default app;
