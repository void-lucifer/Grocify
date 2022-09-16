const express = require('express')
const router = express.Router();
const orderController = require('../Controllers/orderController')

router.get('/checkout/:userId', orderController.getCheckout);
router.get('/clear-cart/:userId', orderController.deleteAllCartItems);
module.exports = router