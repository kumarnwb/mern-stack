const { check, validationResult } = require('express-validator');
const ErrorResponse = require('../util/ErrorResponse');


module.exports.registerationValidation = [

    check('name')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Name cannot be empty')
        .bail()
        .isLength({ min: 3 })
        .withMessage('Minimum three charecters required')
        .bail(),

    check('email')
        .trim()
        .normalizeEmail()
        .not()
        .isEmpty()
        .withMessage('Invalid email address')
        .bail(),

    check('password')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Password cannot be blank')
        .bail()
        .isLength({ min: 6 })
        .withMessage('Password length should be grater than 6 ')
        .bail(),
    (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ meesage: errors.array() })
        }
        next();
    }


]

module.exports.loginValidator = [

    check('email')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Email cannot be blank')
        .bail()
        .isEmail()
        .not()
        .withMessage('Email address is not proper')
        .bail(),

    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password cannot be blank')
        .bail(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ meesage: errors.array() })
        }
        next();
    }

]


module.exports.postsValidator = [

    check('status')
        .not()
        .isEmpty()
        .withMessage('Status cannot be blank')
        .bail(),
    check('skills')
        .not()
        .isEmpty()
        .withMessage('Skills cannot be blank')
        .bail(),

    (req, res, next) => {

        const errors = validationResult(req);

        if (!errors.isEmpty) {
            return next(new ErrorResponse({ message: errors.array() }, 400));
        }
        next();
    }


]


module.exports.experienceValidator = [

    check('title')
        .not()
        .isEmpty()
        .withMessage('title cannot be empty')
        .bail(),

    check('company')
        .not()
        .isEmpty()
        .withMessage('Name of the Company is required')
        .bail(),

    check('from')
        .not()
        .isEmpty()
        .withMessage('From cannot be blank')
        .bail(),

    async (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {

            return next(new ErrorResponse({ error: errors.array() }, 400));

        }
        next();
    }


]


module.exports.addEducationValidator = [

    check('school', 'School is Required')
        .not()
        .isEmpty(),

    check('degree', 'Degree is Required')
        .not()
        .isEmpty(),
    check('fieldofstudy', 'Field of Study is Required')
        .not()
        .isEmpty(),
    check('from', 'From Date is Required')
        .not()
        .isEmpty(),
    (req, res, next) => {

        const errors = validationResult(req);
        console.log(`Errors from addEducationValidator : ${JSON.stringify(errors)}`)
        if (!errors.isEmpty()) {
            const message = {
                "message": "Not a valid request",
                error: errors.array()
            }
            return next(new ErrorResponse(message, 400));
        }
        next()
    }

]