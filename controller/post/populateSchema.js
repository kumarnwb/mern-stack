const populateCreatePostSchema = (user, body) => {
  const post = {
    text: body.text,
    name: user.name,
    avatar: user.avatar,
    // eslint-disable-next-line no-underscore-dangle
    user: user._id

  };
  return post;
};

module.exports = { populateCreatePostSchema };
