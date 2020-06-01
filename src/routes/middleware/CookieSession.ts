import session from 'cookie-session'
import dotenv from 'dotenv'

dotenv.config()

export default session({
    name: 'session',
    secret: process.env.COOKIE_SECRET || 'default',
    keys: [
        process.env.COOKIE_KEY1 || 'secret_key_1',
        process.env.COOKIE_KEY2 || 'secret_key_2',
    ],
    httpOnly: true,
    maxAge: 86400000,
    overwrite: true,
    signed: false
})