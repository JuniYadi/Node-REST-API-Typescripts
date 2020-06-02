import {Request, Response, NextFunction} from 'express'

// Interfaces Error Handling
interface Error {
    status?: number;
    message?: string;
}

// Middleware Default Error Handling
export default ( error: Error , req: Request, res: Response, next: NextFunction) => {
	res.status(422).json({
        code: 422,
        success: false,
        message: error.message
    });
}