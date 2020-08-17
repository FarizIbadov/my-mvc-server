import { RequestHandler } from "express";
import Post from '../../models/Post';

export const getEditPost: RequestHandler = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId);

        if (!post) {
            return res.render('404', { title: 'Not found' })
        }

        const isInvalid = {
            'post-title': "",
            image: "",
            description: ""
        }

        const values = {
            postId: post._id,
            'post-title': post.title,
            imageUrl: post.imageUrl,
            description: post.description
        }

        res.render('pages/add-edit-post', { edit: true, title: "Add Post", path: "/posts", isInvalid, message: null, values })
    } catch (err) {
        next(err);
    }
}