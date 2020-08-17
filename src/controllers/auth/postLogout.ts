import { RequestHandler } from "express";

export const postLogout: RequestHandler = (req, res, next) => {
    try {
        req.session!.destroy((err) => {
            if (err) {
                throw err
            }
            return res.redirect('/');
        })

    } catch (err) {
        next(err);
    }
} 