import express from 'express'
import morgan from 'morgan'
import web from './routes/web'
import * as dotenv from 'dotenv';

// Setup Envroitment From .env
dotenv.config()

// Setup Instance Express
const app = express()

// Middleware Body Parser
app.use(express.json())

// Debug With Morgan If Not In Production
if(process.env.NODE_ENV !== 'production') {
    app.use(morgan('dev'))
}

// Setup Global Routes
app.use(web)

// Setup Port Running For This Application
app.listen(process.env.PORT, () => {
    console.log(
        'App running in port ' + process.env.PORT
    )
})