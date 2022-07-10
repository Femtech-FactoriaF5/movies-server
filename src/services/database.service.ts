import * as mongoDB from "mongodb";
import { uri, db } from '../config';



class Database {
    client: mongoDB.MongoClient;
    db: string;
    constructor(uri: string, db: string) {
        this.db = db;
        this.client = new mongoDB.MongoClient(uri);
        console.log('Connecting to MongoDB Atlas cluster...');
    }
    async connect() {
        try {
            this.client.connect();
            // console.log('Successfully connected to MongoDB Atlas!');
        } catch (error) {
            console.error('Connection to MongoDB Atlas failed!', error);
            process.exit();
        }
    }
    async getDb() {
        await this.connect();
        return this.client.db(this.db);
    }
    async getCollection(collectionName: string) {
        const db = await this.getDb();
        return db.collection(collectionName);
    }
}

export default new Database(uri, db);