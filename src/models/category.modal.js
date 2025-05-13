const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
