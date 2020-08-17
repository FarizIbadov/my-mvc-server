import { RequestHandler } from "express";

export const getAccountPage: RequestHandler = (req, res, next) => {
    try {
        res.status(200).render('pages/my-account', { title: 'Account', path: '/account', invalidAvatar: false, message: null })
    } catch (err) {
        next(err);
    }
}