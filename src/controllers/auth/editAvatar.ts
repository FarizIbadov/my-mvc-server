import { RequestHandler } from "express";
import User, { UserSchema } from "../../models/User";
import imageCompressor from "../../utils/imageCompressor";
import deleteFile from "../../utils/deleteFile";

export const editAvatar: RequestHandler = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).render('pages/my-account', { title: 'Account', path: '/account', invalidAvatar: true, message: 'Provide an image' })
        }

        const imageUrl = await imageCompressor(req.file.path, { width: 150 });
        const user = req.session!.user as UserSchema;
        const currentUser = await User.findById(user._id);


        if (currentUser!.avatar) {
            const url = currentUser!.avatar;
            await deleteFile(url);
        }
        currentUser!.avatar = imageUrl;
        req.session!.user = await currentUser!.save();

        res.redirect('/account');

    } catch (err) {
        next(err);
    }
}