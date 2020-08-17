import { RequestHandler } from "express";
import Post from '../../models/Post';
import { UserSchema } from '../../models/User';
import deleteFile from "../../utils/deleteFile";
import throwError from "../../utils/throwError";
import Comment from "../../models/Comment";

interface Body {
    postId: string;
}

export const deletePost: RequestHandler = async (req, res, next) => {
    try {
        const { postId } = req.body as Body;
        const user = req.session!.user as UserSchema;
        const post = await Post.findById(postId);

        if (!post) {
            throwError(404, 'Not Found');
        }

        if (post!.author.toString() !== user._id.toString()) {
            throwError(403, 'Forbidden')
        }

        const deletedPost = await Post.findByIdAndDelete(postId);
        await deleteFile(deletedPost!.imageUrl);
        await Comment.deleteMany({ post: deletedPost!._id })
        res.redirect('/posts/my-posts');

    } catch (err) {
        next(err);
    }
}