import { RequestHandler } from "express";
import validator from 'validator';
import Post from '../../../models/Post';
import addCommentFailed from "./addCommentFailed";
import throwError from "../../../utils/throwError";

interface Body {
    postId: string;
    comment: string;
}

export const addCommentValidation: RequestHandler = async (req, res, next) => {
    try {
        const body = req.body as Body;
        const post = await Post.findById(body.postId);

        if (!post) {
            throwError(404, 'Not Found');
        }

        if (validator.isEmpty(body.comment)) {
            const myPost = post!.author.toString() === req.session!.user._id.toString();

            return addCommentFailed({
                comment: body.comment,
            }, post!, post!.title, myPost, res, "Don't provide an  empty comment", 'comment');
        }
        body.comment = validator.escape(body.comment);

        next();
    } catch (err) {
        next(err)
    }
}