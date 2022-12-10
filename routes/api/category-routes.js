const router = require('express').Router();
const { Category, Product } = require('../../models');

 // Find all categories
router.get('/', async (req, res) => {
  try{
    const categoryData = await Category.findAll({
      include: [{model: Product}],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Find category by Id
router.get('/:id', async (req, res) => {
  try{
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if(!categoryData) {
      res.status(404).json({ message: 'No Category with that id found!'});
      return
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  }catch (err){
    res.status(400).json(err);
  }
});


// Update a category by its `id` value
router.put('/:id', async (req, res) => {
  try{
    const updatedCategory = await Category.update(req.body, {
      where: {id: req.params.id,
      },
    })
    if (!updatedCategory) {
      res.status(404).json({ message: 'Category not updated!' });
      return
    }
    res.status(200).json(updatedCategory)
  }catch(err){
      res.status(400).json(err);
  };
})

  // Delete category by Id
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(categoryData);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;