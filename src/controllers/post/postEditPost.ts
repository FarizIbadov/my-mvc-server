import { RequestHandler } from "express";
import Post from '../../models/Post';
import { UserSchema } from '../../models/User';
import deleteFile from "../../utils/deleteFile";
import throwError from "../../utils/throwError";

interface Body {
    postId: string;
    'post-title': string;
    description: string;
}

export const postEditPost: RequestHandler = async (req, res, next) => {
    try {
        const body = req.body as Body;
        const user = req.session!.user as UserSchema;

        const post = await Post.findById(body.postId);

        if (!post) {
            throwError(404, 'Not found');
        }

        if (user._id.toString() !== post!.author.toString()) {
            throwError(403, 'Forbidden');
        }

        if (req.file) {
            const url = post!.imageUrl;
            await deleteFile(url);
            post!.imageUrl = req.file.path;
        }

        post!.title = body['post-title'];
        post!.description = body.description;

        await post!.save();

        res.redirect('/posts/my-posts');
    } catch (err) {
        next(err);
    }
}