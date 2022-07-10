import { ErrorRequestHandler, NextFunction,Request,Response } from 'express';
import HTTPErrors from 'http-errors';
import {MongoError} from 'mongodb';

export default {

    logError(err:any, req:Request, res:Response, next:NextFunction){
        req.body.error = err;
        console.log(err.message);
        next(err);
    },

    clientError(err:any, req:Request, res:Response, next:NextFunction){

        if(err instanceof HTTPErrors.HttpError)
            res.status(err.statusCode).send({'error': err.message});
        if(err instanceof MongoError)
            res.status(400).send({'error': err.message});
        if(err.name === "JsonWebTokenError")
            res.status(400).send({'error': err.message});

        next(err);

    },

    genericError(err:any, req:Request, res:Response, next:NextFunction){
        if (res.headersSent) {
            return next(err);
          }

        res.status(err.statusCode).json ({'error':'se ha producido un error',
                               'name':err.name});

    }
}