import express from 'express';
import * as authValidation from '../validation/auth';
import * as authControllers from '../controllers/auth'
import { isAuth } from '../middleware/isAuth';

const router = express.Router();

router.get('/', isAuth, authControllers.getAccountPage);
router.post('/', isAuth, authControllers.editAvatar)

router.get('/login', authControllers.getLogin);
router.post('/login', authControllers.postLogin);

router.get('/register', authControllers.getRegister);
router.post('/register', authValidation.registerValidation, authControllers.postRegister);

router.post('/logout', authControllers.postLogout);

export default router;


