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
        const { email, password }: UserDocument = req.body

        // Set Filter
        const filter: Object = {
            email: email
        }

        // find data by email in database
        await User.findOne(filter, async (e: any, data: UserDocument) => {
            // check if query error
            if (e) {
                next(e)

            // check if data found
            } else if(data) {
                // compare password in login
                const checkPassword = await bcrypt.compare(password, data.password)
                if (checkPassword) {
                    res.send({
                        _id: data._id,
                        email: email,
                        token: jsonGenerate(data._id)
                    })
                } else {
                    next(new Error('Login Failed'))
                }

            // if all null, then return account not found
            } else {
                next(new Error('Account Not Found.'))
            }
        })
    } catch (e) {
        next(e)
    }
}

export const me = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // get userID
        const userId: string = req.body.id

        // Set Query Filter
        const filter: Object = {
            _id: userId
        }

        // Set Output Filter (Hidden = 0, Show = 1)
        const outputFilter: Object = {
            password: 0,
            __v: 0
        }

        // find data by email in database
        const query: any = await User.findOne(filter, outputFilter)

        res.send(query)
    } catch (e) {
        next(e)
    }
}