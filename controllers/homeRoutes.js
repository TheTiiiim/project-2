const router = require('express').Router();

const { User, ShortStack, Artwork } = require('../models');
const { requireCookie } = require('../middlewares/auth');

router.get('/', async (req, res) => {
  const dbUserData = await User.findAll();

  const users = dbUserData.map((user) =>
    user.get({ plain: true }),
  );

  res.render('home', { users });
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
        { model: ShortStack, include: [{ model: Artwork }], limit: 1, order: [ ['createdAt', 'DESC'] ] },
      ],
    });
    // Convert userData into a more readable format
    const users = userData.get({ plain: true });
    // Render the page via Handlebars
    res.render('homepage', { ...users, });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;