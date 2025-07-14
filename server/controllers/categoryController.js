const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  await category.save();
  res.json(category);
};

exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};
