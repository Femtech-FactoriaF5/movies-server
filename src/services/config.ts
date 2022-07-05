import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const config = ():any =>{
    const uri:string = process.env.DB_CONN_STRING ||"postgresql://postgres:123456@localhost:5432/movies";
    const db:string = process.env.DB_NAME || "movies";
    const secret:string = process.env.SECRET;
    return {
        uri,
        db,
        secret
      }
}