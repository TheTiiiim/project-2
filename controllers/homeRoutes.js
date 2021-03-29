const router = require('express').Router();
// const { User } = require('../models');

router.get('/', async (req, res) => {
  try {
    res.render('home');
  } catch (err) {
    res.status(500).json(err);
  }
});