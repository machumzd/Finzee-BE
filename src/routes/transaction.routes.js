const express = require("express");
const router = express.Router();

const {
  getTransactions,
  addTransaction,
  deleteTransaction,
  getAnalysis,
} = require("../controllers/transaction.controller");

router.get("/", getTransactions);
router.get("/analysis", getAnalysis);
router.post("/add", addTransaction);
router.delete("/:id", deleteTransaction);

module.exports = router;
