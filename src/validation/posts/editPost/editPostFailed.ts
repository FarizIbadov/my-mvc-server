import { IsInvalid, validationFailed, Values } from "../../validationFailed";
import { Response } from "express";

type Field = 'post-title' | 'description';

const editPostFailed = (
    values: Values,
    res: Response,
    message: string,
    ...invalidFields: Field[]
) => {
    const isInvalid: IsInvalid = {
        title: "",
        description: ""
    };

    return validationFailed(
        true,
        'pages/add-edit-post',
        'Edit Post',
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

export default editPostFailed;