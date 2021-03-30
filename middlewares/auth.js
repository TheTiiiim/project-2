const { verify } = require('jsonwebtoken');
const { User } = require('../models');

const isAuth = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next();
  }

  try {
    const token = authorization.split(' ')[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);

    // get user
    const userData = await User.findByPk(payload.userId);
    if (!userData) {
      throw Error('no user');
    }

    // attach to req
    req.authUserData = userData;
    return next();
  } catch (err) {
    return next();
  }
};

const requireAuth = (req, res, next) => {
  if (req.authUserData) {
    return next();
  } else {
    res.sendStatus(403);
  }
};

const isCookie = async (req, res, next) => {
  // get token
  const token = req.cookies.jid;

  if (!token) {
    return next();
  }

  try {
    // get payload
    const payload = verify(token, process.env.REFRESH_TOKEN_SECRET);

    // get user
    const userData = await User.findByPk(payload.userId);
    if (!userData) {
      throw Error('no user');
    }

    // attach to req
    req.cookieUserData = userData;

    // pass user to handlebars
    res.locals.userSignIn = userData.get({ plain: true });
    return next();
  } catch (err) {
    return next();
  }
};

const requireCookie = (req, res, next) => {
  if (req.cookieUserData) {
    return next();
  } else {
    res.redirect('/login');
  }
};

module.exports = { isAuth, requireAuth, requireCookie, isCookie };
