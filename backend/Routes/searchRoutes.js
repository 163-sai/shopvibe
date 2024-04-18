const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController')

// Route for searching products
router.get('/api/search', searchController.searchproducts);



module.exports = router;
