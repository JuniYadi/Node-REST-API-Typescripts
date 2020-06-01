import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserModel from '../model/User'
import dotenv from 'dotenv'
dotenv.config()

export const validate = (method: string): any => {
    if(method == 'register') {
        return [
            check('email').isEmail(),
            check('password').isLength({ min: 8 })
        ]
    }
}

export const jsonGenerate = (id: string) => {
    // get secret keys
    const jsonSecret = process.env.JSON_SECRET || 'secret-keys-default'

    return jwt.sign({
        id: id
    }, jsonSecret, { expiresIn: '1h' });
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // get form input
    const { name, email, password } = req.body

    // encrypt password
    const salt = await bcrypt.genSaltSync(10)
    const hash = await bcrypt.hashSync(password, salt)

    // save to database
    const user = new UserModel({
        name: name,
        email: email,
        password: hash,
    })

    user.save()
    .then(result => {
        res.send({
            _id: result._id,
            name: name,
            email: email,
            token: jsonGenerate(result._id)
        })
    })
    .catch(err => {
        next(err)
    })
}