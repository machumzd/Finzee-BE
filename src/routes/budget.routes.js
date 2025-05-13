const express = require("express");
const router = express.Router();
const { getBudget, addBudget } = require("../controllers/budget.controller");

router.get("/", getBudget);
router.post("/add", addBudget);

module.exports = router;