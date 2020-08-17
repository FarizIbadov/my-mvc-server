import User from '../../models/User';
import bcrypt from 'bcrypt';
import { RequestHandler, Response } from "express";

interface Body {
    username: string;
    password: string;
}

export const postLogin: RequestHandler = async (req, res, next) => {
    try {

        const { username, password } = req.body as Body;
        const user = await User.findOne({ username }).exec();
        if (!user) return invalidLogin(res);
        const isVaild = await bcrypt.compare(password, user.password);
        if (!isVaild) return invalidLogin(res);
        req.session!.isLoggedIn = true;
        req.session!.user = user;

        if (req.session!.nextPath) {
            const nextPath = req.session!.nextPath;
            req.session!.nextPath = undefined;
            return res.redirect(nextPath);
        }
        res.redirect('/');
    } catch (err) {
        next(err);
    }
}

const isInvalid = {
    username: "is-invalid",
    password: "is-invalid",
}

const invalidLogin = (res: Response) => res.status(401).render('pages/login', {
    title: 'Login',
    path: "/account/login",
    isInvalid,
    message: 'Invalid username or password'
})