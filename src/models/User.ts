import mongoose from 'mongoose';

export interface UserSchema extends mongoose.Document {
    username: string;
    password: string;
    avatar?: string;
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: false
    }
})

export default mongoose.model<UserSchema>('User', userSchema);