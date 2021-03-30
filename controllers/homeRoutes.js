const router = require('express').Router();

const { User, Exhibit } = require('../models');
const { requireCookie } = require('../middlewares/auth');

// Landing Page (Where users choose to login/signup as artist or go to the homepage as a visitor)
router.get('/', (req, res) => {
  res.render('index');
});

// Home Page (Where all of the users and their newest shortstack is displayed)
router.get('/homepage', async (req, res) => {
  try {
    // Get all exhibits with their artist's name.
    const exhibitData = await Exhibit.findAll({
      // Randomly sort the artwork
      order: sequelize.random(),
      include: [
        // Get the exhibit's artist.
        { model: User, attributes: ['name'] },
      ],
    });
    // Convert exhibitData into a more readable format
    const exhibits = exhibitData.map((exhibit) => exhibit.get({ plain: true }));
    // Render the page via Handlebars
    res.render('homepage', { exhibits });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Upload Page (Where users submit their short stack) Requires user to be logged in
router.get('/upload', requireCookie, (req, res) => {
  res.render('upload');
});

module.exports = router;