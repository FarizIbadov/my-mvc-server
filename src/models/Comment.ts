import mongoose from 'mongoose';
import { UserSchema } from './User';
import { PostSchema } from './Post';

export interface CommentSchema extends mongoose.Document {
    commentedBy: string | UserSchema;
    post: string | PostSchema;
    content: string;
}

const commentSchema = new mongoose.Schema({
    commentedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    content: {
        type: String,
        required: true
    },
}, { timestamps: true })

export default mongoose.model<CommentSchema>('Comment', commentSchema);