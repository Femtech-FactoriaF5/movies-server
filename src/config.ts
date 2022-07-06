import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const {
    DB_CONN_STRING,
    DB_NAME,
    SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
} = process.env;

export const PORT = process.env.PORT;
export const config = {
    uri: DB_CONN_STRING || "mongodb://localhost:27017",
    db: DB_NAME || "movies",
    secret: SECRET || ""
}

export const googleConfig = {
    clientID: GOOGLE_CLIENT_ID || '',
    clientSecret: GOOGLE_CLIENT_SECRET || '',
    callbackURL: `http://localhost:3001/auth/google`,
    // passReqToCallback: true
}


