import express from 'express';
import cors from 'cors';
import {errorRoute, movieRoute, userRoute,authRoute} from './route';
import handleError from './middleware/handleError';

const app = express();

app.use(cors())
app.use(express.json());

app.use(movieRoute);
app.use(userRoute);
app.use(authRoute);
app.use(errorRoute);

app.use(handleError.logError);
app.use(handleError.clientError);
app.use(handleError.genericError);




export default app;
