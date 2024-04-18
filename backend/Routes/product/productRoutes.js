const express = require('express');
const router = express.Router();
const productController = require('../../controllers/product/productController');

//Electronics
router.get('/api/mobile-products', productController.getAllMobileProducts);
router.get('/api/mobile-products/:productId', productController.getMobileProductById);

router.get('/api/laptop-products', productController.getAllLaptopProducts);
router.get('/api/laptop-products/:productId', productController.getLaptopProductById);

router.get('/api/smartwatch-products', productController.getAllSmartwatchProducts);
router.get('/api/smartwatch-products/:productId', productController.getSmartwatchProductById);

//Fashion
router.get('/api/menfashion', productController.getAllMenFashion);
router.get('/api/menfashion/:productId', productController.getAllMenFashionById);

router.get('/api/womenfashion', productController.getAllWomenFashion);
router.get('/api/womenfashion/:productId', productController.getAllWomenFashionById);

router.get('/api/kidfashion', productController.getAllKidFashion);
router.get('/api/kidfashion/:productId', productController.getAllKidFashionById);

//Top Selling Producta
router.get('/api/top-selling-products', productController.getTopSellingProducts);
router.get('/api/top-selling-products/:productId', productController.getTopSellingProductsById);

//Offer Products
router.get('/api/offerproducts', productController.getOfferProducts);

module.exports = router;


