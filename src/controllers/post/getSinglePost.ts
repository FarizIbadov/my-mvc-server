import { RequestHandler } from "express";
import Post from '../../models/Post';
import Comment from '../../models/Comment';
import { UserSchema } from '../../models/User';
import throwError from "../../utils/throwError";

const isInvalid = {
    comment: ''
}

export const getSinglePost: RequestHandler = async (req, res, next) => {
    try {
        let myPost = false;
        const user = req.session!.user as UserSchema;

        const postId = req.params.postId;
        const post = await Post.findById(postId);
        const comments = await Comment.find({ post: postId }).populate('commentedBy').sort('-createdAt');

        if (!post) {
            throwError(404, 'Not Found');
        }

        if (req.session!.isLoggedIn && post!.author.toString() === user._id.toString()) {
            myPost = true;
        }


        res.status(200).render('pages/single-post', { title: post!.title, path: '/posts', post, myPost, isInvalid, comments });
    } catch (err) {
        next(err);
    }
}