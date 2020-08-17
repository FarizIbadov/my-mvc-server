import { IsInvalid, validationFailed, Values } from "../../validationFailed";
import { Response } from "express";

type Field = 'post-title' | 'image' | 'description';

const addPostFailed = (
    values: Values,
    res: Response,
    message: string,
    ...invalidFields: Field[]
) => {
    const isInvalid: IsInvalid = {
        title: "",
        image: "",
        description: ""
    };

    return validationFailed(
        false,
        'pages/add-edit-post',
        'Add Post',
        res,
        '/posts',
        message,
        values,
        {},
        isInvalid,
        false,
        ...invalidFields
    )
}

export default addPostFailed;