import { RequestHandler } from "express";
import { UserSchema } from "../models/User";

export const resLocals: RequestHandler = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    res.locals.isAuthenticated = req.session!.isLoggedIn;

    if (req.session!.isLoggedIn) {
        const user = req.session!.user as UserSchema;
        res.locals.user = {
            avatar: user.avatar || null,
            username: user.username
        }
    }
    next();
}