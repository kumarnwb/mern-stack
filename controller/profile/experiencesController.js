const axios = require('axios').default;
const Profile = require('../../models/Profile');
const { populateAddEducationSchema } = require('./populateSchema');
const ErrorResponse = require('../../util/ErrorResponse');
const env = require('../../config/config');

env.get();

/**
 *
 * @route         PUT /api/profile/experience
 * @description   Update user experiences
 * @access        Private
 */

const profileExperiences = async (req, res, next) => {
  const {
    user, body: {
      title, to, from, company, location, current, description
    }
  } = req;

  const newExp = {
    title,
    to,
    from,
    company,
    location,
    current,
    description
  };

  const profile = await Profile.findOne({ user });

  if (!profile) {
    return next(new ErrorResponse('No User found', 404));
  }

  profile.experience.unshift(newExp);

  const updatedProfile = await profile.save();

  if (updatedProfile instanceof Error) {
    return next(updatedProfile);
  }

  return res.status(200).send({ updatedProfile });
};

/**
 *
 * @route         DELETE api/profile/experience/:id
 * @description   Deletes users experices
 * @access        Private
 */

const deleteExperiences = async (req, res, next) => {
  const { user } = req;

  const profile = await Profile.findOne({ user });

  if (!profile) {
    return next(new ErrorResponse('No User Found ', 404));
  }

  if (profile instanceof Error) {
    return next(profile);
  }

  const index = profile.experience.map((item) => item.id).indexOf(req.params.id);

  profile.experience.splice(index, 1);

  const updatedProfile = await profile.save();

  if (updatedProfile instanceof Error) {
    return next(updatedProfile);
  }

  return res.status(200).send({ updatedProfile });
};

/**
 *
 * @route         PUT /api/profile/education/
 * @description   Adds education to the current logged in user
 * @route         Private
 */
const addEducation = async (req, res, next) => {
  const { user } = req;

  const profile = await Profile.findOne({ user });

  if (!profile || profile instanceof Error) {
    return next(profile);
  }

  const newEducation = populateAddEducationSchema(req);

  profile.education.unshift(newEducation);

  const updatedProfile = await profile.save();

  if (updatedProfile instanceof Error) {
    return next(updatedProfile);
  }

  return res.status(200).send({ updatedProfile });
};

/**
 *
 * @route        DELETE /api/profile/education/:eduId
 * @description  Remove education from User's profile
 * @access       Private
 */
const deleteEducation = async (req, res, next) => {
  const { user, params: { eduId } } = req;
  const profile = await Profile.findOne({ user });

  if (!profile || profile instanceof Error) {
    return next(profile);
  }

  const index = profile.education.map((item) => item.id).indexOf(eduId);
  profile.education.splice(index, 1);

  const updatedProfile = await profile.save();

  if (!updatedProfile || updatedProfile instanceof Error) {
    return next(updatedProfile);
  }

  return res.status(200).send({ updatedProfile });
};

/**
 * @route       GET /api/profile/githubprofile/:githubusername
 * @description Gets User's GITHUB Profile
 * @route       Public
 */

const getUserGithubProfile = async (req, res, next) => {
  const { params: { githubusername } } = req;
  if (!githubusername) {
    return next(new ErrorResponse(` ${githubusername} is not a valid username`, 400));
  }

  const githubResponse = await axios({
    method: 'GET',
    url: `https://api.github.com/users/${githubusername}/repos?per_page=1&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`,
    headers: { 'user-agent': 'node.js' }

  });

  // eslint-disable-next-line no-console
  console.log(githubResponse);
  return res.json(JSON.parse(githubResponse));
};

module.exports = {
  deleteExperiences, profileExperiences, addEducation, deleteEducation, getUserGithubProfile
};
