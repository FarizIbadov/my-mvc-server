import express from 'express';
import * as postController from '../controllers/post';
import { isAuth } from '../middleware/isAuth';
import * as postsValidation from '../validation/posts';
import * as commentValidation from '../validation/comment';

const router = express.Router();

router.get('/', postController.getPosts);
router.get('/my-posts', isAuth, postController.getPosts)

router.get('/add-post', isAuth, postController.getAddPost);
router.post('/add-post', isAuth, postsValidation.addPostValidation, postController.postAddPost);

router.get('/edit-post/:postId', isAuth, postController.getEditPost);
router.post('/edit-post', isAuth, postsValidation.editPostValidation, postController.postEditPost);

router.get('/:postId', postController.getSinglePost);

router.post('/post-comment', commentValidation.addCommentValidation, postController.postComment);

router.post('/delete', postController.deletePost);

export default router;