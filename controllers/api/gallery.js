// Dependencies
// =============================================================
const router = require('express').Router();
const { Gallery } = require('../../models');

// Get (Read)
// =============================================================
router.get('/:id', async (req, res) => {
  try {
    // Get the specific gallery's data
    const galleryData = await Gallery.findByPk(req.params.id);
    // Convert galleryData into a more readable format
    const gallerys = galleryData.get({ plain: true });
    res.status(200).json(gallerys);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Post (Create)
// =============================================================
router.post('/', async (req, res) => {
  try {
    // Create a new gallery
    const newGallery = await Gallery.create(req.body);
    res.status(200).json(newGallery);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Put (Update)
// =============================================================
router.put('/:id', async (req, res) => {
  try {
    const galleryData = await Gallery.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!galleryData) {
      res.status(404).json({ message: 'Gallery not found!' });
      return;
    }
    res.status(200).json(galleryData ? 'Gallery updated!' : 'Failed to update gallery');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete (Delete)
// =============================================================
router.delete('/:id', async (req, res) => {
  try {
    const galleryData = await Gallery.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!galleryData) {
      res.status(404).json({ message: 'Gallery not found!' });
      return;
    }
    res.status(200).json(galleryData ? 'Gallery deleted!' : 'Failed to delete gallery');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Exports
// =============================================================
module.exports = router;