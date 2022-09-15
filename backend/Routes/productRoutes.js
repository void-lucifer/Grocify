const express = require('express')
const router = express.Router();
const productController = require('../Controllers/productController')

router.post('/add-product',productController.addProduct)
router.get('/get-products', productController.getAllProducts)

module.exports = router