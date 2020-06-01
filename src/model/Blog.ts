import mongoose, { Schema, Document } from 'mongoose';

// Table Name
const table = 'blog'

// Interfaces Schema
export interface IBlog extends Document {
    title: string,
    body: string,
    user_id: string,
    categories: string,
    tags: string
}

// Table Schema Collection
const schema = new Schema({
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
export default mongoose.model<IBlog>(table, schema)