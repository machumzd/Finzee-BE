const express = require("express");
const cors = require("cors");
const transactionRoutes = require("./routes/transaction.routes");
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const budgetRoutes = require("./routes/budget.routes");
const authenticateToken = require("./middlewares/authenticateToken");
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  res.send("Budget Tracker API is live");
});
app.use("/api/transaction", authenticateToken, transactionRoutes);
app.use("/api/category", authenticateToken, categoryRoutes);
app.use("/api/budget", authenticateToken, budgetRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
