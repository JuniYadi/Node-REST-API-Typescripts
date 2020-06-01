import mongoose from 'mongoose';

// Table Name
const table = 'user'

// Allow Index
mongoose.set('useCreateIndex', true)

// Table Schema Collection
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})
// Export Model
export default mongoose.model(table, schema)