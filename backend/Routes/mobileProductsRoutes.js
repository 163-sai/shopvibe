const express = require('express');
const router = express.Router();
const mobileProductsController = require('../controllers/mobileProductsController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


router.delete('/api/mobile-products/:id', mobileProductsController.deletemobileProduct) ;
router.delete('/api/laptop-products/:id', mobileProductsController.deletelaptopProduct) ;
router.delete('/api/smartwatch-products/:id', mobileProductsController.deletesmartwatchProduct) ;
router.delete('/api/men-products/:id', mobileProductsController.deletemenProduct) ;
router.delete('/api/women-products/:id', mobileProductsController.deletemenProduct) ;
router.delete('/api/kid-products/:id', mobileProductsController.deletemenProduct) ;

router.post('/added-mobile-products', upload.single('image'),mobileProductsController.addmobileProduct); 
router.post('/added-laptop-products', upload.single('image'),mobileProductsController.addlaptopProduct); 
router.post('/added-smartwatch-products', upload.single('image'),mobileProductsController.addsmartwatchProduct); 
router.post('/added-men-products', upload.single('image'),mobileProductsController.addmenProduct); 
router.post('/added-women-products', upload.single('image'),mobileProductsController.addmenProduct); 
router.post('/added-kid-products', upload.single('image'),mobileProductsController.addmenProduct); 

module.exports = router;
