const router = require('express').Router();
const { registerUser } = require('../controller/users/registerUser');
const { registerationValidation } = require('../validation/validator');
const asyncHandler = require('../middleware/asyncErrorHandler');


router
    .route('/')
    .post(registerationValidation, asyncHandler(registerUser));




module.exports = router;