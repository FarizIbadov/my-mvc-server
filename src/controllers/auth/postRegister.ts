import bcrypt from 'bcrypt';
import User from '../../models/User';
import { RequestHandler } from "express";

interface Body {
    username: string;
    password: string;
}

export const postRegister: RequestHandler = async (req, res, next) => {
    try {

        const { password, username } = req.body as Body;
        const newUser = new User({
            username,
            password: await bcrypt.hash(password, 12)
        })
        await newUser.save();
        res.redirect('/account/login');
    } catch (err) {
        next(err);
    }
}