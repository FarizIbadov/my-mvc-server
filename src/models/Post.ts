import mongoose from 'mongoose';
import { UserSchema } from './User';

export interface PostSchema extends mongoose.Document {
    title: string;
    imageUrl: string;
    description: string;
    author: string | UserSchema;
}

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

export default mongoose.model<PostSchema>('Post', postSchema)