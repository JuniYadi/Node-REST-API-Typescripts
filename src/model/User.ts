import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

// Table Name
const table = 'user'

// Table Types
export type UserDocument = mongoose.Document & {
    name: string;
    email: string;
    password: string;
    passwordResetToken: string;
    passwordResetExpires: Date;

    comparePassword: comparePasswordFunction;
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

// Compare Password Type
type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

// Compare Password Function
const comparePassword: comparePasswordFunction = function (this: any, candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error, isMatch: boolean) => {
        cb(err, isMatch);
    });
};

// Inject Compare password to Mongoose Schema
schema.methods.comparePassword = comparePassword;

// Export Model
export const User = mongoose.model<UserDocument>(table, schema)