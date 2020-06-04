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
        this._connect();
    }

    /**
     * Generate Connection Instance to Database
     */
    _connect() {
        let monggoUrl: string;

        if (this._username) {
            monggoUrl = `mongodb://${this._username}:${this._password}@${this._host}:${this._port}/${this._database}`;
        } else {
            monggoUrl = `mongodb://${this._host}:${this._port}/${this._database}`;
        }

        const connect = () => {
            mongoose.connect(
                monggoUrl,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                }
            )
                .then(() => {
                    console.info(`Successfully re-connected to database`);
                })
                .catch(error => {
                    console.error('Error connecting to database: ', error);
                    process.exit(1);
                });
        }

        mongoose.connect(
            monggoUrl,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        )

        // Allow Index
        mongoose.set('useCreateIndex', true)

        // Allow Use Function findOneAndUpdate
        // https://mongoosejs.com/docs/deprecations.html#findandmodify
        mongoose.set('useFindAndModify', false);

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            // console.log(`connected to database`)
        });
        db.on('disconnected', connect);

    }
}