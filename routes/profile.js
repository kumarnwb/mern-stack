
const router = require('express').Router();
const { verifyToken } = require('../middleware/jwtToken');
const { getCurrentUser,
    createPosts,
    allProfiles,
    getUserById,
    deleteUserProfile, profileExperiences, deleteExperiences } = require('../controller/profile/profileController');
const { postsValidator, experienceValidator } = require('../validation/validator');
const asyncHandler = require('../middleware/asyncErrorHandler');


router
    .route('/me')
    .get(verifyToken, asyncHandler(getCurrentUser));


router
    .route('/')
    .post(verifyToken, postsValidator, asyncHandler(createPosts))
    .get(asyncHandler(allProfiles))
    .delete(verifyToken, asyncHandler(deleteUserProfile));


router
    .route('/experience')
    .put(verifyToken, experienceValidator, asyncHandler(profileExperiences));


router
    .route('/experience/:id')
    .delete(verifyToken, asyncHandler(deleteExperiences));

router
    .route('/user/:id')
    .get(asyncHandler(getUserById));

module.exports = router;