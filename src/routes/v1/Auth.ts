import express from 'express'
import { register, login, me } from '../../controllers/Auth'
import AuthMiddleware from '../middleware/Auth'

// make express routes
const auth = express.Router()

auth.post('/register', register)
auth.post('/login', login)
auth.get('/me', AuthMiddleware, me)

export default auth