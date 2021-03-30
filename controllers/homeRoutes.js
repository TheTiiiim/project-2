const router = require('express').Router();

const { User } = require('../models');
const { requireCookie } = require('../middlewares/auth');

router.get('/', async (req, res) => {
  const dbUserData = await User.findAll();

  const users = dbUserData.map((user) =>
    user.get({ plain: true }),
  );

  res.render('home', { users });
});

router.get('/dashboard', requireCookie, (req, res) => {
  res.redirect(`/user/${req.cookiePayload.userId}`);
});

router.get('/user/:id', async (req, res) => {
  try {
    let privatePage = false;
    if (req.cookiePayload) {
      if (req.cookiePayload.userId === parseInt(req.params.id)) {
        // true if signed in as user being viewed
        privatePage = true;
      }
    }

    const userData = await User.findByPk(req.params.id);
    if (!userData) {
      throw Error('no user');
    }
    const user = userData.get({ plain: true });

    let modifiedUser = {
      name: user.name,
      email: user.email,
      date_created: user.date_created
    };

    res.render('profile', { user: modifiedUser, privatePage });
  } catch {
    res.send('user does not exist');
  }
});

module.exports = router;