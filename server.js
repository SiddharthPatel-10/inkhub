// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const database = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const Product = require("./models/Product");
const userRoutes = require("./routes/userRoutes");
const nodemailer = require("nodemailer");
require("dotenv").config();
// const indexRoutes = require("./routes/index");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//database connection
database.connect();

// Set EJS as the template engine
app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));

// Render the product page
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.render("products", { products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Mount the admin routes
const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);

const contactRoutes = require("./routes/contactRoutes");
app.use(contactRoutes);

app.get("/login-signup", (req, res) => {
  res.render("login-signup");
});

// Mock user data
const user = {
  isAuthenticated: true,
  username: "Sid",
};

app.get("/", (req, res) => {
  res.render("index", { user });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

