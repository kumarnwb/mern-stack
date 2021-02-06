
const router = require('express').Router();
const { verifyToken } = require('../middleware/jwtToken');
const { getCurrentUser, createPosts, allProfiles, getUserById } = require('../controller/profile/profileController');
const { postsValidator } = require('../validation/validator');
const asyncHandler = require('../middleware/asyncErrorHandler');


router
    .route('/me')
    .get(verifyToken, asyncHandler(getCurrentUser));


router
    .route('/')
    .post(verifyToken, postsValidator, asyncHandler(createPosts))
    .get(asyncHandler(allProfiles));



router
    .route('/user/:id')
    .get(asyncHandler(getUserById));

module.exports = router;