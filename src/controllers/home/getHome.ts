import { RequestHandler } from "express";

export const getHome: RequestHandler = (req, res) => {
    res.render("pages", {
        title: 'Home',
        path: '/'
    });
}