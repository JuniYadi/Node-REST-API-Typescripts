import express from 'express'
import { index, store, show, update, destroy } from '../../controllers/Blog'
import AuthMiddleware from '../middleware/Auth'

// make express routes
const blog = express.Router()

blog.get('/', AuthMiddleware, index)
blog.post('/', AuthMiddleware, store)
blog.get('/:id', AuthMiddleware, show)
blog.put('/:id', AuthMiddleware, update)
blog.delete('/:id', AuthMiddleware, destroy)

export default blog