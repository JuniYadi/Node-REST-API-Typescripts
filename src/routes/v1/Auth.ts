import express from 'express'
import { validate, register } from '../../controllers/Auth'

// make express routes
const auth = express.Router()

auth.post('/register', validate('register'), register)

export default auth