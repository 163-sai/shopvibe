const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/login/adminController');


// Admin Login endpoint
router.post('/admin/login', adminController.loginAdmin);
//Sales
router.get('/api/sales', adminController.Sales);

module.exports = router;