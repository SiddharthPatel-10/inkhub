const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Contact = require("../models/Contact");
const authMiddleware = require('../middlewares/authMiddleware');

// Protect admin routes
router.use(authMiddleware);

//getAllUser
const { getAllUsers } = require("../controllers/adminController");
router.get("/users", getAllUsers);

// Admin create product
router.post("/create-product", async (req, res) => {
  const { name, price, description, category, discount, imageUrl } = req.body;
  let isAvailable = req.body.isAvailable;

  // Convert isAvailable to a boolean value
  isAvailable = isAvailable === "on";

  try {
    const product = new Product({
      name,
      price,
      description,
      category,
      isAvailable,
      discount,
      imageUrl,
    });
    await product.save();
    // Redirect to admin with success message
    res.redirect("/admin?success=true");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Admin panel
router.get("/", (req, res) => {
  const success = req.query.success === "true";
  res.render("admin", { success });
});

// getAllContacts
router.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find({});
    if (contacts.length === 0) {
      console.log("No contact submissions found.");
    } else {
      console.log("Contacts fetched:", contacts);
    }
    res.render("contacts", {
      title: "Contact Submissions",
      user: req.user,
      contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
