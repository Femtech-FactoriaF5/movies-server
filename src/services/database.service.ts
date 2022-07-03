import { Client } from 'pg';
import { config } from './config';



class Database {

    client: Client;
    db: string;
    constructor(config: any) {
        this.db = config.db;

        this.client = new Client(config.uri);
        console.log('Connecting to PostgreSQL...');
    }
    async connect() {
        try {
            this.client.connect();
            // console.log('Successfully connected to MongoDB Atlas!');
        } catch (error) {
            console.error('Connection to Postgres failed!', error);
            process.exit();
        }
    }
    async end() {
        this.client.end();
    }

    async query(query: string, values?: any) {
        try {
            await this.connect();
            const result = await this.client.query(query, values)
            await this.end();
            return result;

        } catch (error) {
            console.log(error);
        }
    }
}

export default new Database(config());