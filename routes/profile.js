
const router = require('express').Router();
const {} = require('../controller/auth/authController');
const { getCurrentUser } = require('../controller/profile/profileController');
const asyncHandler = require('../middleware/asyncErrorHandler');


router
    .route('/me')
    .get(asyncHandler(getCurrentUser));



module.exports = router;