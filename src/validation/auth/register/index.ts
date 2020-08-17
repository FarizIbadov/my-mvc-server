import { RequestHandler } from "express";
import validator from 'validator';
import User from '../../../models/User';
import failedRegister from "./registerFailed";

interface Body {
    username: string;
    password: string;
    confirmPassword: string;
}

const registerValidation: RequestHandler = async (req, res, next) => {
    try {
        const body = req.body as Body;
        body.username = validator.escape(body.username);
        const user = await User.findOne({ username: body.username })

        if (!body.username)
            return failedRegister(res, 'Username is required', "username");
        if (user)
            return failedRegister(res, 'Username already exists', 'username');
        if (!body.password.trim() || !validator.isLength(body.password.trim(), { min: 8 }))
            return failedRegister(res, 'Password should be at least 8 charecter long', 'password');
        if (body.confirmPassword !== body.password)
            return failedRegister(res, 'Password should match', 'password', "confirmPassword");

        next();
    } catch (err) {
        next(err);
    }

}

export default registerValidation;