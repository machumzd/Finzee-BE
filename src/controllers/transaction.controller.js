const Transaction = require("../models/transaction.model");
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.userId });
    if (!transactions) {
      return res
        .status(404)
        .json({ status: false, message: "No transactions found" });
    }
    res.status(200).json({ status: true, transactions });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.getAnalysis = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.userId });
    if (!transactions) {
      return res
        .status(404)
        .json({ status: false, message: "No transactions found" });
    }
    const totalIncome = transactions
      .filter((transaction) => transaction.type === "Income")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const totalExpense = transactions
      .filter((transaction) => transaction.type === "Expense")
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const balance = totalIncome - totalExpense;
    res.status(200).json({
      status: true,
      analysis: { totalIncome, totalExpense, balance },
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const transaction = new Transaction({
      ...req.body,
      userId: req.user.userId,
    });
    transaction.save();
    res
      .status(201)
      .json({ status: true, message: "Transaction added successfully" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transactionId = req.params.id;
    await Transaction.findByIdAndDelete(transactionId);
    res.status(200).json({ status: true, message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
