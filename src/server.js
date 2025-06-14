const app = require("./app");
const connectDb = require("./config/db");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

connectDb();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
