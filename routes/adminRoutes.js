const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Admin create product
router.post('/create-product', async (req, res) => {
  const { name, price, description, category, discount, imageUrl } = req.body;
  let isAvailable = req.body.isAvailable;

  // Convert isAvailable to a boolean value
  isAvailable = isAvailable === 'on';

  try {
    const product = new Product({ name, price, description, category, isAvailable, discount, imageUrl });
    await product.save();
      // Redirect to admin with success message
      res.redirect('/admin?success=true');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Admin panel
router.get('/', (req, res) => {
    const success = req.query.success === 'true';
    res.render('admin', { success });
  });

module.exports = router;
