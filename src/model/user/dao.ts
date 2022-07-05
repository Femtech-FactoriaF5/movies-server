
import database from '../../services/database.service';
import User from "./model";

class UserDAO {


  async saveUser(user: User) {
    const queryStr = 'insert into "user" (email, password, name) values ($1,$2,$3) RETURNING *'
    const values = Object.values(user);
    return database.query(queryStr, values);
  }

  async getUser(user: User) {

    const queryStr = 'select * from "user" where email = $1';
    const values = [user.email];
    const result = await database.query(queryStr, values);
    return result.rows[0];
  }

  async getUsers(){
    const queryStr = 'select * from "user"';

    const result = await database.query(queryStr);
    return result.rows;

  }
}

export default new UserDAO();