import { RequestHandler } from "express";
import Comment from '../../models/Comment';
import { UserSchema } from "../../models/User";

interface Body {
    postId: string;
    comment: string;
}

export const postComment: RequestHandler = async (req, res, next) => {
    try {
        const { comment, postId } = req.body as Body;
        const user = req.session!.user as UserSchema;

        const newComment = new Comment({
            post: postId,
            commentedBy: user._id,
            content: comment
        })

        await newComment.save();
        res.redirect(`/posts/${postId}`)
    } catch (err) {
        next(err);
    }
}