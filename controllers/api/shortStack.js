// Dependencies
// =============================================================
const router = require('express').Router();
const { ShortStack } = require('../../models');

// Get (Read)
// =============================================================
router.get('/:id', async (req, res) => {
  try {
    // Get the specific shortStack's data
    const shortStackData = await ShortStack.findByPk(req.params.id);
    // Convert shortStackData into a more readable format
    const shortStacks = shortStackData.get({ plain: true });
    res.status(200).json(shortStacks);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Post (Create)
// =============================================================
router.post('/', async (req, res) => {
  try {
    // Create a new shortStack
    const newShortStack = await ShortStack.create(req.body);
    res.status(200).json(newShortStack);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Put (Update)
// =============================================================
router.put('/:id', async (req, res) => {
  try {
    const shortStackData = await ShortStack.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!shortStackData) {
      res.status(404).json({ message: 'ShortStack not found!' });
      return;
    }
    res.status(200).json(shortStackData ? 'ShortStack updated!' : 'Failed to update shortStack');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete (Delete)
// =============================================================
router.delete('/:id', async (req, res) => {
  try {
    const shortStackData = await ShortStack.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!shortStackData) {
      res.status(404).json({ message: 'ShortStack not found!' });
      return;
    }
    res.status(200).json(shortStackData ? 'ShortStack deleted!' : 'Failed to delete shortStack');
  } catch (err) {
    res.status(500).json(err);
  }
});

// Exports
// =============================================================
module.exports = router;