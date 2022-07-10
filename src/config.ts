import { config } from 'dotenv';

config();


export const PORT = process.env.PORT ||3001;
export const uri = process.env.DB_CONN_STRING || 'http://localhost:27017';
export const db = process.env.DB_NAME || 'movies';
export const secret = process.env.SECRET || '';
export const audience = process.env.GOOGLE_CLIENT_ID || '';


