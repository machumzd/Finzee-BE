const express = require("express");
const router = express.Router();

const {
  getCategory,
  addCategory,
  deleteCategory,
} = require("../controllers/category.controller");

router.get("/", getCategory);
router.post("/add", addCategory);
router.delete("/:id", deleteCategory);

module.exports = router;