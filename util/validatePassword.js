const bcrypt = require('bcryptjs');

/**
 * 
 * @param {String} provided - Password provided for login
 * @param {String } stored -  Password stored in database
 */
const validatePasswordForLogin =  async (provided, stored) => {

    return bcrypt.compare(provided, stored);

}


module.exports = { validatePasswordForLogin }