import { IsInvalid, validationFailed, Values } from "../../validationFailed";
import { Response } from "express";

type Field = 'comment';

const addCommentFailed = (
    values: Values,
    post: Values,
    title: string,
    myPost: boolean,
    res: Response,
    message: string,
    ...invalidFields: Field[]
) => {
    const isInvalid: IsInvalid = {
        comment: "",
    };

    return validationFailed(
        true,
        'pages/single-post',
        title,
        res,
        '/posts',
        message,
        values,
        post,
        isInvalid,
        myPost,
        ...invalidFields
    )
}

export default addCommentFailed;