import { RequestHandler } from "express";
import Post from '../../models/Post';
import { UserSchema } from '../../models/User';

interface Filter {
    author?: string;
}

export const getPosts: RequestHandler = async (req, res, next) => {
    try {
        let myPost: boolean = false;
        const filter: Filter = {}
        if (req.path === '/my-posts') {
            const user = req.session!.user as UserSchema;
            myPost = true;
            filter['author'] = user._id;
        }

        const posts = await Post.find(filter);
        res.status(200).render('pages/posts', {
            title: 'Posts', path: '/posts', posts, myPost
        })
    } catch (err) {
        next(err);
    }
}

//https://image.winudf.com/v2/image/Y29tLm5pZ2h0c2t5d2FsbHBhcGVyLmhkLm5pZ2h0c2t5cGljdHVyZXMucGhvdG9zLmJhY2tncm91bmQuY3V0ZS5jb29sLmFydC5uaWdodHNreWltYWdlcy5oZC5mcmVlX3NjcmVlbl8xM18xNTMzMjUwMTk1XzA2OA/screen-13.jpg?fakeurl=1&type=.jpg


//https://st.depositphotos.com/2049931/2126/i/450/depositphotos_21265999-stock-photo-baku.jpg

//https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg