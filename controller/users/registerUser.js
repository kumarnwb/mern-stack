const gravatar = require('gravatar');
const User = require('../../models/User');
const { generateToken } = require('../../middleware/jwtToken');

/**
 * @route  POST api/users
 * @desc   Register users
 * @access Public
 */

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  // console.log(req.body)
  try {
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }
    const avatar = gravatar.url(email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    });

    const user = new User({
      name,
      email,
      avatar,
      password
    });

    const userResponse = await user.save();

    const token = generateToken(userResponse.id);

    if (token instanceof Error) {
      return;
    }

    return res.send({ token });
  }
  catch (e) {
    return res.send(e);
  }
};

module.exports = {
  createUser
};
