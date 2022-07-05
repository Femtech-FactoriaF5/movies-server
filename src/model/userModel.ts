import { query } from "express";
import users from "../data/users";
import iUser from "./interfaces/iUser";

class User {
    saveUser(user:iUser){
        users.push(user);
        // console.log(users);
        return user;
    }

}

export default new User();