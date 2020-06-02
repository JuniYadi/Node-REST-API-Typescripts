import express from 'express'
import { register, login } from '../../controllers/Auth'

// make express routes
const auth = express.Router()

auth.post('/register', register)
auth.post('/login', login)

export default auth