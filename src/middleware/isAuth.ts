import { RequestHandler } from "express";
import path from 'path';

export const isAuth: RequestHandler = (req, res, next) => {
    if (!req.session!.isLoggedIn) {
        req.session!.nextPath = path.join(req.baseUrl, req.path)
        return res.redirect('/account/login');
    }
    next();
}