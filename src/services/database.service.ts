import * as mongoDB from "mongodb";
import {config } from '../config';



class Database{
    client:mongoDB.MongoClient;
    db:string;
    constructor(config:any){
    this.db = config.db;
    this.client=new mongoDB.MongoClient(config.uri);
    console.log('Connecting to MongoDB Atlas cluster...');
}
    async connect(){
        try {
           this.client.connect();
            // console.log('Successfully connected to MongoDB Atlas!');
        } catch (error) {
            console.error('Connection to MongoDB Atlas failed!', error);
            process.exit();
        }
    }
    async getDb(){
         await this.connect();
         return this.client.db(this.db);
    }
    async getCollection(collectionName:string){
        const db = await this.getDb();
        return db.collection(collectionName);
    }
}

export default new Database(config);