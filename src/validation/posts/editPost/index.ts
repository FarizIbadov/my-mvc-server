import { RequestHandler } from "express";
import validator from 'validator';
import editPostFailed from "./editPostFailed";
import deleteFile from "../../../utils/deleteFile";
import imageCompressor from "../../../utils/imageCompressor";

interface Body {
    postId: string;
    'post-title': string;
    imageUrl: string,
    description: string;
}

const editPostValidation: RequestHandler = async (req, res, next) => {
    try {
        const body = req.body as Body;
        if (req.file) {
            req.file.path = await imageCompressor(req.file.path, { height: 625 })
        }

        if (!body['post-title']) {
            if (req.file) {
                await deleteFile(req.file.path);
            }
            return editPostFailed({
                "post-title": body['post-title'],
                postId: body.postId,
                imageUrl: body.imageUrl,
                description: body.description
            }, res, 'Title is required!', "post-title")
        }

        if (!body.description) {
            if (req.file) {
                await deleteFile(req.file.path);
            }
            return editPostFailed({
                "post-title": body['post-title'],
                postId: body.postId,
                imageUrl: body.imageUrl,
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

export default editPostValidation;