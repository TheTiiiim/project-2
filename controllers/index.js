const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const authRoutes = require('./auth');
const apiRoutes = require('./api');

const { isSession } = require('../middlewares/auth');
router.use(isSession);

router.use('/', homeRoutes);
router.use('/', authRoutes);
router.use('/api', apiRoutes);

module.exports = router;