import { RequestHandler } from "express";

const isInvalid = {
    username: "",
    password: "",
    confirmPassword: "",
}

export const getRegister: RequestHandler = async (req, res, next) => {
    try {
        res.render('pages/register', {
            title: 'Register',
            path: '/account/register',
            message: null,
            isInvalid
        })
    } catch (err) {
        next(err);
    }
}