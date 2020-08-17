import { RequestHandler } from "express";
import validator from 'validator';
import addPostFailed from "./addPostFailed";
import deleteFile from "../../../utils/deleteFile";
import imageCompressor from "../../../utils/imageCompressor";

interface Body {
    'post-title': string;
    description: string;
}

const addPostValidation: RequestHandler = async (req, res, next) => {
    try {
        const body = req.body as Body;
        if (!req.file) {
            return addPostFailed({
                "post-title": body['post-title'],
                description: body.description
            }, res, 'Image is not provided', "image")
        }
        req.file.path = await imageCompressor(req.file.path, { height: 625 });
        if (!body['post-title']) {
            await deleteFile(req.file.path);
            return addPostFailed({
                "post-title": body['post-title'],
                description: body.description
            }, res, 'Title is required!', "post-title")
        }

        if (!body.description) {
            await deleteFile(req.file.path);
            return addPostFailed({
                "post-title": body['post-title'],
                description: body.description
            }, res, 'Description is required!', "description")
        }

        body['post-title'] = validator.escape(body['post-title']);
        body.description = validator.escape(body.description);

        next();
    } catch (err) {
        next(err);
    }
}

export default addPostValidation;