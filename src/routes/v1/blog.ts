import express from 'express'
import { index } from '../../controllers/blog'

const blog = express()

blog.get('/', index)

export default blog