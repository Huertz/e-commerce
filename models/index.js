// Import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// Categories many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// Products belongToMany Tags
Product.belongsToMany(Tag, {
  foreignKey: 'product_id',
  through: {
    model: ProductTag
  }
});

// Tags belongToMany Products
Tag.belongsToMany(Product , {
  foreignKey: 'tag_id',
  through: {
    model: ProductTag
  }
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};