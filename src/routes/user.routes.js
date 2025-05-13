const express = require("express");
const router = express.Router();

const {
  getUsers,
  addUser,
  deleteUser,
  loginUser,
} = require("../controllers/user.controller");

router.get("/", getUsers);
router.post("/add", addUser);
router.post("/login", loginUser);
router.delete("/:id", deleteUser);

module.exports = router;