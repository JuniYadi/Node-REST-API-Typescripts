import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config()

export default class Database {
    private _host: string = process.env.DB_HOST || 'localhost';
    private _port: string = process.env.DB_PORT || '27017';
    private _database: string = process.env.DB_DATABASE || 'nodetsapi';
    private _username?: string = process.env.DB_USERNAME;
    private _password?: string = process.env.DB_PASSWORD;

    constructor() {
        // connect to database
        this.connect();
    }

    /**
     * Generate Connection Instance to Database
     */
    connect() {
        let monggoUrl: string;

        if (this._username) {
            monggoUrl = `mongodb://${this._username}:${this._password}@${this._host}:${this._port}/${this._database}`;
        } else {
            monggoUrl = `mongodb://${this._host}:${this._port}/${this._database}`;
        }

        mongoose.connect(monggoUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true
        })

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            console.log(`we're connected!`)
        });
    }
}