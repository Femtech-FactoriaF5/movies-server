import { PassportStatic } from "passport";
import {Strategy} from "passport-google-oauth2";
import { googleConfig } from "../config";
import { getAccessFromGoogle } from "../middleware/googleAuth";


export const initGooglePassport= (passport:PassportStatic)=> passport.use(new Strategy(googleConfig,getAccessFromGoogle))