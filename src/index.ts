import express from 'express'

const app = express()

app.listen(process.env.PORT, () => {
    console.log(
        'App running in port ' + process.env.PORT
    )
})