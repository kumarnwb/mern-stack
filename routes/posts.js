const router = require('express').Router();
const { createPostValidator } = require('../validation/validator');
const {
  createUserPost, getAllPost, getPostById, deletePostViaID, addLikeToPost
} = require('../controller/post/postController');
const asyncHandler = require('../middleware/asyncErrorHandler');
const { verifyToken } = require('../middleware/jwtToken');

router
  .route('/')
  .post(verifyToken, createPostValidator, asyncHandler(createUserPost))
  .get(verifyToken, asyncHandler(getAllPost));

router
  .route('/:id')
  .get(verifyToken, asyncHandler(getPostById))
  .delete(verifyToken, asyncHandler(deletePostViaID));

router
  .route('/like/:postId')
  .put(verifyToken, asyncHandler(addLikeToPost));

module.exports = router;
