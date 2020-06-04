import mongoose from 'mongoose';

// Table Name
const table = 'blog'

// Table Types
export type BlogDocument = mongoose.Document & {
    title: string,
    body: string,
    user_id: string,
    categories: string,
    tags: string
}

// Table Schema Collection
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    categories: {
        type: String
    },
    tags: {
        type: String
    }
})

// Export Model
export const Blog = mongoose.model<BlogDocument>(table, schema)