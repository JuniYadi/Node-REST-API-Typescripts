import express from 'express'
import blog from './v1/blog'

const web = express()

web.use('/blog', blog)

export default web