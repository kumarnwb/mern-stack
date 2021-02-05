const router = require('express').Router();
const { verifyToken } = require('../middleware/jwtToken');
const asyncHandler = require('../middleware/asyncErrorHandler');
const { loginValidator } = require('../validation/validator');
const { getUser, loginUser } = require('../controller/auth/authController');

router
    .route('/')
    .post(verifyToken, getUser)

router
    .route('/login')
    .post(loginValidator, asyncHandler(loginUser))



module.exports = router;