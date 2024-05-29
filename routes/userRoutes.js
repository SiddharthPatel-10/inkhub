const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/userController");

// Register user
router.post("/signup", signup);

// Login user
router.post("/login", login);

module.exports = router;
