const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const fs = require("fs");
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

//swagger for Documentation
const swaggerDocumentation = JSON.parse(
  fs.readFileSync("./src/utils/finzee.openAPI.json", "utf8")
);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));


module.exports = app;
