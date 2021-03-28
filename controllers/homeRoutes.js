const router = require('express').Router();

const { User } = require('../models');
const { requireSession } = require('../middlewares/auth');

router.get('/', async (req, res) => {
  const dbUserData = await User.findAll();

  const users = dbUserData.map((user) =>
    user.get({ plain: true }),
  );

  res.render('home', { users });
});

router.get('/dashboard', requireSession, async (req, res) => {
  try {
    const userData = await User.findByPk(req.sessionPayload.userId);
    if (!userData) {
      throw Error('no user');
    }
    const user = userData.get({ plain: true });
    delete user.password;
    res.render('dashboard', { user });
  } catch {
    res.redirect('/login');
  }
});

module.exports = router;