const express = require('express');
const Product = require("../models/productModel");
const router = express.Router();

router.get('/', async (req, res) => {
  const query = req.query.q;

  try {
    const products = await Product.find({
      name: { $regex: query, $options: 'i' }
    }).limit(3);
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
