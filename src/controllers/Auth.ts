import { Request, Response, NextFunction } from 'express'
import { check, sanitize, validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User, UserDocument } from '../model/User'
import dotenv from 'dotenv'
dotenv.config()

export const jsonGenerate = (id: string) => {
    // get secret keys
    const jsonSecret = process.env.JSON_SECRET || 'secret-keys-default'

    return jwt.sign({
        id: id
    }, jsonSecret, { expiresIn: '1h' });
}

export const register = async (req: Request, res: Response, next: NextFunction) => {

    // Input Validation
    await check('name').isString().run(req);
    await check('email').isEmail().run(req);
    await check('password').isLength({ min: 8 }).run(req);
    await sanitize("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {

        // get form input
        const { name, email, password } = req.body

        // encrypt password
        const salt = await bcrypt.genSaltSync(10)
        const hash = await bcrypt.hashSync(password, salt)

        // save to database
        const user = new User({
            name: name,
            email: email,
            password: hash,
        })

        const query = await user.save()
        res.send({
            _id: query._id,
            name: name,
            email: email,
            token: jsonGenerate(query._id)
        })
    } catch (e) {
        next(e)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {

    // Input Validation
    await check('email').isEmail().run(req);
    await check('password').isLength({ min: 8 }).run(req);

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }


    try {
        // get form input
        const { email, password } = req.body

        // find data by email in database
        const query = await User.findOne({ email: email }, async (err: any, data: UserDocument) => {
            // compare password in login
            const checkPassword = await bcrypt.compare(password, data.password)

            if (checkPassword) {
                res.send({
                    _id: data._id,
                    email: email,
                    token: jsonGenerate(data._id)
                })
            }

            next(new Error('Login Failed'))
        })
    } catch (e) {
        next(e)
    }
}