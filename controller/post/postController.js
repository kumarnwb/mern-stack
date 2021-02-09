const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const { populateCreatePostSchema } = require('./populateSchema');
const ErrorResponse = require('../../util/ErrorResponse');

/**
 * @route       POST /api/post
 * @description Create a post
 * @access      Private
 */

const createUserPost = async (req, res, next) => {
  const { user, body } = req;

  const foundUser = await User.findById(user).select('-password');

  if (!foundUser || foundUser instanceof Error) {
    return next(foundUser);
  }

  const newPost = populateCreatePostSchema(foundUser, body);

  const post = new Post(newPost);

  const createdPost = await post.save();
  if (!createdPost || createdPost instanceof Error) {
    return next(createdPost);
  }

  return res.status(200).send({ createdPost });
};

/**
 * @route        GET api/post
 * @description  Get all posts
 * @access       Private
 */
const getAllPost = async (req, res, next) => {
  const { user } = req;
  if (!user) {
    return next(new ErrorResponse(`This is not a valid Id : ${user}.`, 400));
  }
  const post = await Post.find({}).sort({ date: -1 });

  if (!post || post instanceof Error) {
    return next(post);
  }

  return res.status(200).send({ post });
};

/**
 * @route        GET api/posts/:id
 * @description  Get Post by ID
 * @access       Private
 */
const getPostById = async (req, res, next) => {
  const { params: { id } } = req;
  if (!id) {
    return next(new ErrorResponse(`This is not a valid Id : ${id}.`, 400));
  }
  const post = await Post.findById(id);

  if (!post || post instanceof Error) {
    return next(post);
  }

  return res.status(200).send({ post });
};

/**
 * @route        DELETE api/posts/:id
 * @description  Delete post via id
 * @access       Private
 */
const deletePostViaID = async (req, res, next) => {
  const { params: { id }, user } = req;
  if (!id) {
    return next(new ErrorResponse(`This is not a valid Id : ${id}.`, 400));
  }
  const post = await Post.findById(id);

  if (!post || post instanceof Error) {
    return next(post);
  }

  // Check if User matches to the user who created it.
  if (post.user.toString() !== user) {
    return next(new ErrorResponse('You are not authorized to delete the post', 401));
  }

  const removedPost = await post.remove();

  if (!removedPost || removedPost instanceof ErrorResponse) {
    return next(removedPost);
  }

  return res.status(200).send({ removedPost });
};
/**
 * @route       PUT api/posts/like/:post_id
 * @description Adding user to like array in post once they like the post
 * @access      Private
 */

const addLikeToPost = async (req, res, next) => {
  const { user, params: { postId } } = req;

  const post = await Post.findById(postId);

  if (!post || post instanceof Error) {
    return next(post);
  }

  // Check if User already liked the post
  if (post.likes.filter((like) => like.user.toString() === user).length > 0) {
    return res.status(200).send({ message: 'you have already like the post' });
  }
  post.likes.unshift({ user });

  const savedLike = await post.save();

  if (!savedLike || savedLike instanceof ErrorResponse) {
    return next(savedLike);
  }

  return res.status(200).send({ savedLike });
};

module.exports = {
  createUserPost, getAllPost, getPostById, deletePostViaID, addLikeToPost
};
