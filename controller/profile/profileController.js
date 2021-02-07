const Profile = require('../../models/Profile');
const ErrorResponse = require('../../util/ErrorResponse');
const { populateProfileSchema } = require('./populateSchema');


/**
 * 
 * @route   GET api/profile/me
 * @desc    Get current user profile
 * @access  Private
 */

const getCurrentUser = async (req, res, next) => {

    const { user } = req;

    const profile = await Profile.findOne({ user }).populate('user', ['name', 'avatar']);

    if (!profile) {
        return next(new ErrorResponse('No User Found'), 404);

    }

    return res.status(200).send({ profile });

}

/**
 * 
 * @private      POST api/profile
 * @description  Create posts
 */

const createPosts = async (req, res, next) => {

    const { user } = req;
    let profile = await Profile.findOne({ user });

    const profileFields = populateProfileSchema(req);

    //If the user already exists
    if (profile) {

        profile = await Profile.findOneAndUpdate(
            { user },
            { $set: profileFields },
            { new: true });

        if (profile instanceof Error) {

            console.log(profile);
            return next(new ErrorResponse('finding : ' + profile, 500));
        }
        return res.status(200).send(profile);

    };

    //Create a new profile 

    profile = new Profile(profileFields);

    const createdProfile = await profile.save();
    if (createdProfile instanceof Error) {

        return next(new ErrorResponse('createdProfile:' + createdProfile, 500));

    }

    return res.status(200).send(profile)



}

/**
 * 
 * @route        GET /
 * @description  All profiles by User
 */

const allProfiles = async (req, res, next) => {

    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    if (profiles instanceof Error) {
        return next(new ErrorResponse(profiles, 500));
    }
    return res.status(200).send(profiles);

}

/**
 * 
 * @route       GET /user/:id
 * @desciption  Get a user by ID  
 */
const getUserById = async (req, res, next) => {

    const { id } = req.params;

    const profile = await Profile.findOne({ user: id }).populate('user', ['name', 'avatar']);

    if (!profile || profile instanceof Error) {
        return next(profile);
    }

    return res.status(200).send(profile);

}

/**
 * 
 * @route         DELETE api/profile/
 * @description   Deletes user profile
 * @access        Private 
 */
const deleteUserProfile = async (req, res, next) => {


    const { user } = req;

    const profile = await Profile.deleteOne({ user });


    if (profile instanceof Error) {

        return next(new ErrorResponse(profile, 500));

    }

    return res.status(200).send({ message: "Successfully deleted profile " });

}

module.exports = {
    getCurrentUser, createPosts, allProfiles, getUserById, deleteUserProfile
}