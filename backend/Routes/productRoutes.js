const express = require('express');
const router = express.Router();
//const MobileProducts = require('../models/MobileProducts');

router.get('/mobile-products', async (req, res) => {
  try {
    const products = await MobileProducts.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/api/admin-mobile-products', async (req, res) => {
  const product = new MobileProducts({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/api/mobile-products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await MobileProducts.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/api/mobile-products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await MobileProducts.findByIdAndDelete(id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
