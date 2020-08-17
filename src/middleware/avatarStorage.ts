import path from 'path';
import multer from 'multer';
import { v4 } from 'uuid';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('images', 'avatars'));
    },
    filename: (req, file, cb) => {
        cb(null, v4() + path.extname(file.originalname))
    }
})

const imageMimeTypes = [
    'image/png',
    'image/jpg',
    'image/jpeg'
]

const avatarStorage = multer({
    storage, fileFilter: (req, file, cb) => {
        if (imageMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
})

export default avatarStorage;

