import { Response } from "express";
import { IsInvalid, validationFailed } from "../../validationFailed";

type Field = 'username' | 'password' | 'confirmPassword'

const failedRegister = (
    res: Response,
    message: string,
    ...invalidFields: Field[]
) => {
    const isInvalid: IsInvalid = {
        username: "",
        password: "",
        confirmPassword: ""
    };
    return validationFailed<Field>(
        false,
        'pages/register',
        'Register',
        res,
        "/account/register",
        message,
        {},
        {},
        { ...isInvalid },
        false,
        ...invalidFields
    );
}

export default failedRegister;