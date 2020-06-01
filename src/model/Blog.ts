import mongoose from 'mongoose';
import Database from '../config/database'

// Make Connection to Database
const connection = new Database()

// Table Name
const table = 'blog'

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
export default mongoose.model(table, schema)