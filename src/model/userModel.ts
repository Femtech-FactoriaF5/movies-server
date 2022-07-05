import users from "../data/users";
import { connection } from "../services/database.service";
import {iUser,  iUserLogin } from "./interfaces/iUser";

class User {
    async saveUser(user:iUser){
        const queryStr = 'INSERT INTO "user"(email,password,name) VALUES($1,$2,$3) RETURNING *'
        const values = [user.email,user.password,user.name ||null]
        const client = await connection();
        const result = await client.query(queryStr, values);
        return result.rows[0];


    }

    async getUser(user:iUserLogin){

        const queryStr = 'SELECT * FROM "user" WHERE email = $1'
        const values = [user.email]
        const client = await connection();
        const result = await client.query(queryStr, values);
        return result.rows[0];
    }

}

export default new User();