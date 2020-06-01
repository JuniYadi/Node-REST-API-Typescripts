import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import web from './routes/web'
import cookieSession from './routes/middleware/CookieSession'
import * as dotenv from 'dotenv';

// Setup Envroitment From .env
dotenv.config()

// Setup Instance Express
const app = express()

// Use Helmet
app.use(helmet())
app.disable('x-powered-by')

// Middleware Body Parser
app.use(express.json())

// Middleware Cookie Session
app.use(cookieSession)

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