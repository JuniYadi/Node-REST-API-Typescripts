import express from 'express'
import ErrorHandling from './middleware/ErrorHandling'
import Blog from './v1/Blog'
import Auth from './v1/Auth'

// Extend Express Route
const web = express.Router()

// REST API Routes
web.use('/blog', Blog)
web.use('/auth', Auth)

// REST API Error Handling Middleware
web.use(ErrorHandling);

// Export all route
export default web