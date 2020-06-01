import express, {Request, Response, NextFunction} from 'express'
import Blog from './v1/Blog'
import Auth from './v1/Auth'

const web = express.Router()

// routes
web.use('/blog', Blog)
web.use('/auth', Auth)

// Error Handling
interface Error {
    status?: number;
    message?: string;
}

web.use(( error: Error , req: Request, res: Response, next: NextFunction) => {
	res.status(422).json({
        code: 422,
        success: false,
        message: error.message
    });
});

export default web