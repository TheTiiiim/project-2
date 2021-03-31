const router = require('express').Router();
const { requireCookie } = require('../../middlewares/auth');

// "/user" endpoint

router.get('/', requireCookie, async (req, res) => {
  try {
    const user = req.userData.get({ plain: true });
    delete user.password;
    res.status(200).json({ ...user });
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
