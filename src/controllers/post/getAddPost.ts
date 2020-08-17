import { RequestHandler } from "express";

export const getAddPost: RequestHandler = (req, res, next) => {
    const isInvalid = {
        'post-title': "",
        image: "",
        description: ""
    }

    const values = {
        'post-title': "",
        description: "",
    }

    try {
        res.render('pages/add-edit-post', { edit: false, title: "Add Post", path: "/posts", isInvalid, message: null, values })
    } catch (err) {
        next(err);
    }
}