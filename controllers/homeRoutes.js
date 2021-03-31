const router = require('express').Router();
const sequelize = require('sequelize');

const { User, Exhibit, UserInfo } = require('../models');
const { requireCookie } = require('../middlewares/auth');

// Landing Page (Where users choose to login/signup as artist or go to the homepage as a visitor)
router.get('/', (req, res) => {
  // Check if user is logged in
  let loggedIn;
  req.cookieUserData ? loggedIn = true : loggedIn = false;

  res.render('home', { loggedIn });
});

// Home Page (Where all of the users and their newest shortstack is displayed)
<<<<<<< HEAD
router.get('/home', async (req, res) => {
=======
router.get('/gallery', async (req, res) => {
  // Check if user is logged in
  let loggedIn;
  req.cookieUserData ? loggedIn = true : loggedIn = false;
>>>>>>> f4788bb33f892b866855e37e37ad31b3999a22b2
  try {
    // Get all exhibits with their artist's name.
    const exhibitData = await Exhibit.findAll({
      // Randomly sort the artwork
      order: sequelize.fn('RAND'),
      include: [
        // Get the exhibit's artist.
        { model: User, attributes: ['name'] },
      ],
    });
    // Convert exhibitData into a more readable format
    const exhibits = exhibitData.map((exhibit) => exhibit.get({ plain: true }));
    // Render the page via Handlebars
<<<<<<< HEAD
    res.render('home', { exhibits });
=======
    res.render('gallery', { exhibits, loggedIn });
>>>>>>> f4788bb33f892b866855e37e37ad31b3999a22b2
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', requireCookie, (req, res) => {
  res.redirect(`/user/${req.cookieUserData.id}`);
});

router.get('/user/:id', async (req, res) => {
  // Check if user is logged in
  let loggedIn;
  req.cookieUserData ? loggedIn = true : loggedIn = false;
  try {
    let privatePage = false;
    if (req.cookieUserData) {
      if (req.cookieUserData.id === parseInt(req.params.id)) {
        // true if signed in as user being viewed
        privatePage = true;
      }
    }

    const userData = await User.findByPk(req.params.id, {
      attributes: ['name', 'email', 'date_created'],
      include: [{ model: UserInfo }]
    });
    if (!userData) {
      throw Error('no user');
    }
    const user = userData.get({ plain: true });

    res.render('artist', { user, privatePage, loggedIn });
  } catch {
    res.send('user does not exist');
  }
});

// Upload Page (Where users submit their short stack) Requires user to be logged in
router.get('/submit', requireCookie, async (req, res) => {
  // Check if user is logged in
  let loggedIn;
  req.cookieUserData ? loggedIn = true : loggedIn = false;
  res.render('submit', { loggedIn });
});

module.exports = router;
