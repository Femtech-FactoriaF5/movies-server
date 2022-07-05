import {Client} from 'pg';
import { config } from './config';

const url =config();

const client = new Client(url);


export const connection = async () =>{
try {
    await client.connect();
    console.log('Connected successfully to server');
  return client;
} catch (error) {
    console.log(error);
}

}


