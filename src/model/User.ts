import mongoose from 'mongoose';

// Table Name
const table = 'user'

// Table Types
export type UserDocument = mongoose.Document & {
    name: string;
    email: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;
}

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
    },
    passwordResetToken: String,
    passwordResetExpires: Date
}, {
    timestamps: true
})

// Export Model
export const User = mongoose.model<UserDocument>(table, schema)