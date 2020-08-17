import { ErrorRequestHandler, RequestHandler } from "express";
import deleteFile from "../../utils/deleteFile";
import { UserSchema } from "../../models/User";

export const getError: ErrorRequestHandler = async (error, req, res, _2) => {
    if (req.file) {
        await deleteFile(req.file.path);
    }
    if (req.session!.isLoggedIn) {
        const user = req.session!.user as UserSchema;
        res.locals.user = {
            avatar: user.avatar || null,
            username: user.username
        }
    }
    const { status, errorMessage, message } = error;
    console.log(message)
    res.status(status || 500).render('Error', {
        title: errorMessage || "ERROR!", errorMessage: errorMessage || "An Error", path: "", isAuthenticated: req.session!.isLoggedIn, csrfToken: req.csrfToken()
    })
}

export const get404Page: RequestHandler = (req, res) => {
    res.status(404).render('404', {
        title: 'Not Found', path: ''
    })
}