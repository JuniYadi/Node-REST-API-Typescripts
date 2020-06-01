import mongoose, { Schema, Document } from 'mongoose';

// Table Name
const table = 'table-name'

// Interfaces Schema
export interface IModel extends Document {
    title: string,
    body: string,
    user_id: string,
    categories: string,
    tags: string
}

// Table Schema Collection
const schema = new mongoose.Schema(
{
    //
},
{
    timestamps: true
})

// Export Model
export default mongoose.model<IModel>(table, schema)