const router = require('express').Router();

const { User, ShortStack, Artwork } = require('../models');
const { requireCookie } = require('../middlewares/auth');

// Landing Page (Where users choose to login/signup as artist or go to the homepage as a visitor)
router.get('/', (req, res) => {
  res.render('index');
});

// Home Page (Where all of the users and their newest shortstack is displayed)
router.get('/homepage', async (req, res) => {
  try {
    // Get all users with their newest shortstack.
    const userData = await User.findAll({
      order: [
        // Order Gallery page by user's name descending
        ['name', 'DESC']
      ],
      include: [
        // Get the newest shortstack (which also includes the artworks associated with the shortstack) connected to the user
        { model: ShortStack, include: [{ model: Artwork }], limit: 1, order: [['createdAt', 'DESC']] },
      ],
    });
    // Convert userData into a more readable format
    const users = userData.map((user) => user.get({ plain: true }));
    // Render the page via Handlebars
    res.render('homepage', { users });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Upload Page (Where users submit their short stack) Requires user to be logged in
router.get('/upload', requireCookie, (req, res) => {
  res.render('upload');
});

module.exports = router;