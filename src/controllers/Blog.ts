import { Request, Response, NextFunction } from 'express'
import { check, validationResult } from 'express-validator'
import { Blog } from '../model/Blog'


export const index = async (req: Request, res: Response, next: NextFunction) => {    
    try {
        const query = await Blog.find({})

        res.send(query)
    } catch (e) {
        next(e)
    }
}

export const store = async (req: Request, res: Response, next: NextFunction) => {
    // Input Validation
    await check('title').exists().isString().run(req);
    await check('body').exists().isString().run(req);
    await check('user_id').exists().isString().run(req);
    await check('categories').exists().isString().run(req);
    await check('tags').exists().isString().run(req);

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const { title, body, user_id, categories, tags } = req.body

        // set object data
        const blog = new Blog({
            title: title,
            body: body,
            user_id: user_id,
            categories: categories,
            tags: tags
        })

        // save to database
        const query = await blog.save()

        res.send(query)
    } catch (e) {
        next(e)
    }
}

export const show = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // Get Data ID
        const { id } = req.params

        // Set Filter
        const filter : Object = {
            _id: id
        }

        // find data
        const query = await Blog.findOne(filter)

        // return result if have data
        if(query) {
            res.send(query)
        } else {
            next(new Error('Data Not Found'))
        }

    } catch (e) {
        next(e)
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // Get Data ID
        const { id } = req.params

        // find data and update
        const query = await Blog.findByIdAndUpdate(id, req.body)

        // return result if have data
        if(!query) {
            next(new Error('Update Data Failed.!'))
        }

        // get new data and result to client
        const newData = await Blog.findById(id, { __v: 0})

        res.send(newData)

    } catch (e) {
        next(e)
    }
}

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // Get Data ID
        const { id } = req.params

        // find data and update
        const query = await Blog.findByIdAndDelete(id)

        // return result if have data
        if(query) {
            res.send(query)
        } else {
            next(new Error('Delete Data Failed.!'))
        }

    } catch (e) {
        next(e)
    }
}