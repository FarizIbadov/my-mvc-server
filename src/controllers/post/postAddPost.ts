import { RequestHandler } from "express";
import { UserSchema } from '../../models/User';
import Post from '../../models/Post';

interface Body {
    'post-title': string;
    description: string;
}

export const postAddPost: RequestHandler = async (req, res, next) => {
    try {
        const imageUrl = req.file.path;
        const user = req.session!.user as UserSchema;
        const author = user._id;
        const { description, "post-title": title } = req.body as Body;
        const post = new Post({
            title,
            description,
            imageUrl,
            author
        })
        await post.save();

        res.redirect('/posts');
    } catch (err) {
        next(err);
    }
}