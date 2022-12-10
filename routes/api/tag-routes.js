const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

  // Find all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // Find tag by its Id
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk (req.params.id , { 
      include: [{ model: Product }], 
    });
    if(!tagData) {
      res.status(404).json({Message: 'No tag found with that id!'})
      return
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err)
  } 
});

// Create new tag
router.post('/', async (req, res) => {
try {
  const newTag = await Tag.create(reqs.body);
  res.status(200).json(newTag);
} catch (err) {
  res.status(400).json(err);
}
});

 // Update tags byIdvalue
router.put('/:id', (req, res) => {
  Tag.update(
    {
      name: req.body.name,
      id: req.body.id,
    },
    {
      where: {
        tag_id: req.params.tag_id,
      },
    }
  ).then((updatedTag) => {
    res.json(updatedTag);
  }).catch ((err) => {
    console.log(err);
    res.json(err);
  });
});

// Delete tag by its Idvalue
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if(!tagData) {
      res.status(404).json({message: 'No tag found with this id!'});
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;