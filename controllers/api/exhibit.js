const router = require('express').Router();
const { Exhibit } = require('../../models');

router.get('/:id', async (req, res) => {
  try {
    // Get the specific exhibit's data
    const exhibitData = await Exhibit.findByPk(req.params.id);
    // Convert exhibitData into a more readable format
    const exhibits = exhibitData.get({ plain: true });
    res.status(200).json(exhibits);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    // Create a new exhibit
    const newExhibit = await Exhibit.create(req.body);
    res.status(200).json(newExhibit);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const exhibitData = await Exhibit.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!exhibitData) {
      res.status(404).json({ message: 'Exhibit not found!' });
      return;
    }
    res.status(200).json(exhibitData ? 'Exhibit updated!' : 'Failed to update exhibit');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const exhibitData = await Exhibit.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!exhibitData) {
      res.status(404).json({ message: 'Exhibit not found!' });
      return;
    }
    res.status(200).json(exhibitData ? 'Exhibit deleted!' : 'Failed to delete exhibit');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
