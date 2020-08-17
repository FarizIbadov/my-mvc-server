import { Response } from "express";

export interface IsInvalid {
    [key: string]: "" | 'is-invalid';
}

export interface Values {
    [key: string]: any;
}

export const validationFailed = <T extends string>(
    edit: boolean,
    file: string,
    title: string,
    res: Response,
    path: string,
    message: string,
    values: Values,
    post: Values,
    isInvalid: IsInvalid,
    myPost: boolean,
    ...invalidFields: T[]
) => {
    for (const field of invalidFields) {
        isInvalid[field] = 'is-invalid'
    }

    return res.status(400).render(file, {
        title, message, isInvalid, path, values, edit, myPost, post
    })
}

