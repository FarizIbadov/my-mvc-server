import express from 'express';
import homeRouter from './routes/home.routes';
import postRouter from './routes/post.routes';
import authRouter from './routes/auth.routes';

const router = express.Router();

router.use("/", homeRouter);
router.use('/account', authRouter)
router.use('/posts', postRouter);

export default router;