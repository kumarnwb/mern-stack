const router = require('express').Router();
const { createUser } = require('../controller/users/registerUser');
const { registerationValidation } = require('../validation/validator');
const asyncHandler = require('../middleware/asyncErrorHandler');


router
    .route('/')
    .post(registerationValidation, asyncHandler(createUser));




module.exports = router;