import express from 'express'
import { index } from '../../controllers/Blog'

const blog = express.Router()

blog.get('/', index)

export default blog