const populateProfileSchema = ({ user, body }) => {

    const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin } = body;

    const profile = {};
    profile.user = user;
    if (company) profile.company = company;
    if (website) profile.website = website;
    if (location) profile.location = location;
    if (bio) profile.bio = bio;
    if (status) profile.status = status;
    if (githubusername) profile.githubusername = githubusername;
    if (skills) {

        profile.skills = skills.split(',').map(skill => skill.trim());
    }
    profile.social = {};
    if (youtube) profile.social.youtube = youtube;
    if (facebook) profile.social.facebook = facebook;
    if (twitter) profile.social.twitter = twitter;
    if (instagram) profile.social.instagram = instagram;
    if (linkedin) profile.social.linkedin = linkedin;

    return profile;

}




module.exports = { populateProfileSchema };