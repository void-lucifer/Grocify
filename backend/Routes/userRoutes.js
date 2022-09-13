const express = require('express')
const router = express.Router();
const userController = require('../Controllers/userController')

router.post('/register', userController.regUser)
router.post('/login', userController.loginUser)
router.post('/add-to-cart', userController.addToCart)
router.get('/get-cart-items', userController.getCartItems)
router.get('/del-cart-item', userController.removeCartItem)

module.exports = router