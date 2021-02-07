const jwtToken = require('jsonwebtoken');
const env = require('../config/config');

env.get();

const generateToken = (id) => {
  const payload = {
    id
  };

  try {
    const token = jwtToken.sign({
      data: payload
    }, process.env.JWT_SECRET, {
      expiresIn: '3h'

    });
    return token;
  }
  catch (e) {
    console.log(e);
    throw new Error('Error while getting jwt Token ');
  }
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');

    console.log(token);

    const decode = jwtToken.verify(token, process.env.JWT_SECRET);
    console.log('decoded value ', decode);
    req.user = decode.data.id;
    next();
  }
  catch (e) {
    console.log('Error while verifying JWT token ', e);
    return res.status(401).json({ message: 'No Token , Auth denied' });
  }
};

module.exports = { generateToken, verifyToken };
