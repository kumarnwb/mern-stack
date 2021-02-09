const router = require('express').Router();
const { verifyToken } = require('../middleware/jwtToken');
const {
  getCurrentUser, createPosts, allProfiles, getUserById, deleteUserProfile
} = require('../controller/profile/profileController');
const {
  deleteExperiences, profileExperiences, addEducation, deleteEducation,
  getUserGithubProfile
} = require('../controller/profile/experiencesController');
const { postsValidator, experienceValidator, addEducationValidator } = require('../validation/validator');
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

router
  .route('/education')
  .put(verifyToken, addEducationValidator, asyncHandler(addEducation));

router
  .route('/education/:eduId')
  .delete(verifyToken, asyncHandler(deleteEducation));

router
  .route('/github/:githubusername')
  .get(asyncHandler(getUserGithubProfile));

module.exports = router;
