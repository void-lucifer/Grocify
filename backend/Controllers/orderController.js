const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const userModel = require('../Models/Users')
const cartModel = require('../Models/Cart')

exports.getCheckout = async (req, res, next) => {
  const order = await userModel.findById(req.params.userId)
  const product = await stripe.products.create({
    name: `${order.name}'s cart`
  });
  const price = await stripe.prices.create({
    product: product.id,
    unit_amount: order.cartTotal * 100,
    currency: 'inr',
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `http://localhost:3000/payment-success`,
    cancel_url: `http://localhost:3000/payment-failed`,
    customer_email: order.email, 
    client_reference_id: order._id,

    line_items: [
      {
        price: price.id,
        quantity: 1
      }
    ]
  })
  res.status(200).json({
    status: 'success',
    session
  })
}

exports.deleteAllCartItems = async (req, res) => {
  const deleteCart = await cartModel.deleteMany({u_id: req.params.userId})
  const cartTotal = await userModel.updateOne({_id: Object(req.params.userId)},{$set: {cartTotal: 0}})
  res.status(200).send({msg: "cart cleared"})
}
