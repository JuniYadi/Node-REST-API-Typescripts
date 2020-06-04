import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

// Middleware Default Error Handling
export default (req: Request, res: Response, next: NextFunction) => {
    // token data
    let token: any;
    // get secret keys
    const jsonSecret = process.env.JSON_SECRET || 'secret-keys-default'

    // check header token or get from query token
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        token = req.query.token;
    }

    // if token not null, then vaidate token
    if (token) {
        jwt.verify(token, jsonSecret, (e: any, data: any) => {
            // check if error result
            if (e) {
                return next(e)
            }

            // inject userID to Request
            req.body["userID"] = data.id
            
            // continue
            next()
        })
    } else {
        return res.status(401).send({
            "code": 401,
            "success": false,
            "message": "Unauthorized."
        });
    }
}