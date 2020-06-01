import express from 'express'
import { index } from '../../controllers/blog'

const blog = express.Router()

blog.get('/', index)

export default blog