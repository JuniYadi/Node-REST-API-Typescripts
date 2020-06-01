import mongoose from 'mongoose';
import Database from '../config/database'

// Make Connection to Database
new Database()

// Table Name
const table = 'table-name'

// Table Schema Collection
const schema = new mongoose.Schema({})

// Export Model
export default mongoose.model(table, schema)