import express from 'express'
import web from './routes/web'

// Setup Instance Express
const app = express()

// Middleware Body Parser
app.use(express.json())

// Setup Global Routes
app.use(web)

// Setup Port Running For This Application
app.listen(process.env.PORT, () => {
    console.log(
        'App running in port ' + process.env.PORT
    )
})