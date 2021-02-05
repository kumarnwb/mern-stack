const User = require('../../models/User');
const ErrorResponse = require('../../util/ErrorResponse');
const { validatePasswordForLogin } = require('../../util/validatePassword');
const { generateToken } = require('../../middleware/jwtToken');



/**
 * 
 * @route          GET /api/auth
 * @description    get user information based on token
 * @access         Public
 */
const getUser = async (req, res, next) => {

    console.log(req.user)
    const user = await User.findById(req.user).select('-password')
    console.log(user)  
    return res.send(user);
}



const loginUser = async (req, res, next) => {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

        return next(new ErrorResponse(`No  registered user found`, 404));
    }

    const isPasswordAMatch = await validatePasswordForLogin(password, user.password);

    if (!isPasswordAMatch) {

        return next(new ErrorResponse(`Credentials does not match `, 401));
    }


    const token = generateToken(user.id);
    if (token instanceof Error) {

        return next(new ErrorResponse(`Service down`, 500));
    }

    return res.send({ token })


}





module.exports = { getUser, loginUser }