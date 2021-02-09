const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User id is Required']
  },
  text: {
    type: String,
    required: [true, 'Post text is required']
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      }
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },

      text: {
        type: String,
        required: true
      },
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
