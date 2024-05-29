const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup Controller for Registering Users
exports.signup = async (req, res) => {
  try {
    // Destructure fields from the request body
    const { name, email, password, confirmPassword } = req.body;

    // Check if all details are present
    if (!name || !email || !password || !confirmPassword) {
      return res.status(403).json({
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

    // Generate JWT token
    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({
          success: true,
          token,
          user,
          message: "User registered successfully",
        });
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

// Login controller for authenticating users
exports.login = async (req, res) => {
  try {
    // Get email and password from request body
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please Fill up All the Required Fields",
      });
    }

    // Find user with provided email
    const user = await User.findOne({ email });

    // Debug: Print the user object
    console.log("User found:", user);

    // If user not found with provided email
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not Registered with Us. Please Sign Up to Continue",
      });
    }

    // Debug: Check stored password hash
    console.log("Stored password hash:", user.password);

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    // Generate JWT token
    const payload = { user: { id: user.id, email: user.email } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    // Return success response
    res.status(200).json({
      success: true,
      token,
      user,
      message: "User Login Success",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure Please Try Again",
    });
  }
};
