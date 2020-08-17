import { RequestHandler } from "express";

const isInvalid = {
    username: "",
    password: "",
}

export const getLogin: RequestHandler = async (req, res, next) => {

    try {
        res.render('pages/login', {
            title: 'Login',
            path: "/account/login",
            isInvalid,
            message: null
        })
    } catch (err) {
        next(err);
    }

}