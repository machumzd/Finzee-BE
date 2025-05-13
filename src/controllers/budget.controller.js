const Budget = require("../models/budget.model.js");
const Transaction = require("../models/transaction.model.js");

exports.getBudget = async (req, res) => {
  try {
    const userId = req.user.userId;
    const monthName = req.query.month;
    
    if (!monthName) {
      return res
        .status(400)
        .json({ status: false, message: "Month is required" });
    }

    const year = new Date().getFullYear();
    const startOfMonth = new Date(`${monthName} 1, ${year}`);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    const budget = await Budget.findOne({ userId, month: monthName });

    if (!budget) {
      return res
        .status(404)
        .json({ status: false, message: "Budget not found" });
    }

    const currentExpense = await Transaction.aggregate([
      {
        $match: {
          userId: userId,
          createdAt: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
          type: "Expense",
        },
      },
      {
        $group: {
          _id: null,
          totalExpense: { $sum: "$amount" },
        },
      },
    ]);

    res.status(200).json({
      status: true,
      budget,
      currentExpense: currentExpense[0]?.totalExpense || 0,
    });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};

exports.addBudget = async (req, res) => {
  try {
    const userId = req.user.userId;
    const month = req.body.month;

    const existingBudget = await Budget.findOne({ userId, month });
    if (existingBudget) {
      return res
        .status(400)
        .json({ status: false, message: "Budget already exists" });
    }
    const budget = new Budget({
      userId,
      month,
      amount: req.body.amount,
    });
    await budget.save();
    res
      .status(201)
      .json({ status: true, message: "Budget added successfully" });
  } catch (err) {
    res.status(500).json({ status: false, message: err.message });
  }
};
