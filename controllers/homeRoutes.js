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

router.get('/dashboard', requireCookie, async (req, res) => {
  try {
    const userData = await User.findByPk(req.cookiePayload.userId);
    if (!userData) {
      throw Error('no user');
    }
    const user = userData.get({ plain: true });
    delete user.password;
    res.render('dashboard', { user });
  } catch (err) {
    res.redirect('/login');
  }
});

// Gallery Page
router.get('/gallery/:id', async (req, res) => {
  try {
    // Get the specific gallery's data
    const galleryData = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['name'] },
        { model: Exhibit, include: [{ model: User, attributes: ['name'] }] },
      ],
    });
    // Convert galleryData into a more readable format
    const gallerys = galleryData.get({ plain: true });
    // Render the page via Handlebars
    res.render('gallery', { ...gallerys });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;