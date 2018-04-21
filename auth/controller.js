//import bcrypt
const bcrypt = require('bcrypt');

module.exports = {
  async login = (req, res, next) => {

    try {
      const { username, password } = req.body;
      const.user = await models.findUserId(username);
      const valid = await bcrypt.compare(password, user.password_hash);

      if (!valid) {
        throw { message: 'wrong password' };
      }

      req.session.user = user;
      next();
    }
    catch (err) {
      next(err);
    }
    console.log('auth make');
  };

  logout(req, res, next) {
    // destroys session
    req.session.destroy(err => next(err));

  }
}