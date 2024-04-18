const express = require('express');
const router = express.Router();
const mobileProductsController = require('../controllers/mobileProductsController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


router.delete('/api/mobile-products/:id', mobileProductsController.deletemobileProduct) ;
router.delete('/api/laptop-products/:id', mobileProductsController.deletelaptopProduct) ;
router.delete('/api/smartwatch-products/:id', mobileProductsController.deletesmartwatchProduct) ;

router.post('/added-mobile-products', upload.single('image'),mobileProductsController.addmobileProduct); 
router.post('/added-laptop-products', upload.single('image'),mobileProductsController.addlaptopProduct); 
router.post('/added-smartwatch-products', upload.single('image'),mobileProductsController.addsmartwatchProduct); 

module.exports = router;
