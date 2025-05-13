const Category = require("../models/category.modal");
const jwt = require("jsonwebtoken");
exports.getCategory = async (req, res) => {
  try {
    const categoryList = await Category.find({ userId: req.user.userId });
    if (!categoryList) {
      return res
        .status(404)
        .json({ status: false, message: "No categories found" });
    }
    res.status(200).json({ status: true, category: categoryList });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name } = req.body;

    const existingBudget = await Category.findOne({
      userId,
      name,
    });
    if (existingBudget) {
      return res
        .status(400)
        .json({ status: false, message: "Category already exists" });
    }
    const category = new Category({
      userId,
      name,
    });
    await category.save();

    res
      .status(201)
      .json({ status: true, message: "Category added successfully" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    await Category.findByIdAndDelete(categoryId);
    res.status(200).json({ status: true, message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
