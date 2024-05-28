const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    // Destructure fields from the request body
    const { name, email, password, confirmPassword } = req.body;

    // Check if all required details are provided
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required",
      });
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create a JWT payload containing the user's ID
    const payload = { user: { id: user.id } };

    // Sign the JWT with a secret key and set an expiration time
    const token = jwt.sign(payload, "secret", { expiresIn: "24h" });

    // Respond with the JWT and user details
    res.status(200).json({
      success: true,
      token,
      user,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
});

// Login Controller for Authenticating User
router.post("/login", async (req, res) => {
  try {
    // Destructure email and password from the request body
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find user with provided email
    const user = await User.findOne({ email });

    // Debug: Print the user object
    console.log("User found:", user);

    // If user not found, respond with error
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered. Please sign up to continue.",
      });
    }

     // Debug: Check stored password hash
     console.log('Stored password hash:', user.password);
     
    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // Debug: Print the result of the password comparison
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    // Create a JWT payload containing the user's ID
    const payload = { user: { id: user.id } };

    // Sign the JWT with a secret key and set an expiration time
    const token = jwt.sign(payload, "secret", { expiresIn: "24h" });

    // Respond with the JWT and user details
    res.status(200).json({
      success: true,
      token,
      user,
      message: "User logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login failed. Please try again.",
    });
  }
});

module.exports = router;
