const userModel = require('../Models/Users')
const cartModel = require('../Models/Cart')
const productModel = require('../Models/Products')
const bcrypt = require('bcrypt')
const { isObjectIdOrHexString, default: mongoose } = require('mongoose')


// User Registration to database
exports.regUser = (req, res) => {
  // Password hashing
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { res.status(403).send({ msg: "Something went wrong. Try again later." }) }
    else {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) { res.status(403).send({ msg: "Something went wrong. Try again later." }) }
        else {
          userModel.find({ "email": req.body.email }).then((result) => {
            if (result.length !== 0) { res.status(403).send({ msg: "User already registered." }) }
            else {
              userModel.create({ name: req.body.name, email: req.body.email, password: hash }).then((result) => {
                res.status(200).send({ msg: "User registered successfully." })
              }).catch((err) => {
                res.status(403).send({ msg: "Something went wrong." })
              })
            }
          })
        }
      })
    }
  })
}

// User login
exports.loginUser = (req, res) => {
  userModel.find({ "email": req.body.email }).then((result) => {
    if (result.length === 0) { res.status(403).send({ msg: "User not found." }) }
    else {
      bcrypt.compare(req.body.password, result[0].password, (err, status) => {
        if (err) { res.status(403).send({ msg: "Something went wrong." }) }
        else {
          if (status === true) { res.status(200).send({ msg: "User logged in successfully.", id: result[0]._id, name: result[0].name }) }
          else { res.status(403).send({ msg: "Incorrect password." }) }
        }
      })
    }
  }).catch((err) => {
    res.status(400).send({ msg: "Something went wrong." })
  })
}

// add to cart
exports.addToCart = (req, res) => {
  if (req.body.u_id === null || typeof (req.body.u_id) === "undefined") {
    res.status(403).send({ msg: "User must be logged in to access cart feature." })
  }
  else {
    cartModel.create({ u_id: req.body.u_id, p_data: req.body.p_data }).then((result) => {
      res.status(200).send({ msg: "Item added to cart." })
    }).catch((err) => {
      res.status(400).send({ msg: "Something went wrong." })
    })
  }

}

// get cart items
exports.getCartItems = (req, res) => {
  if (req.query.u_id === null || typeof (req.query.u_id) === "undefined") {
    res.status(403).send({ msg: "User must be logged in to access cart feature." })
  }
  else {
    cartModel.find({ u_id: req.query.u_id }).then((result) => {
    // console.log(result)
      userModel.findById(req.query.u_id).then((user) => {
        res.status(200).send({ data: result, count: result.length, cartTotal: user.cartTotal })
      })
    }).catch((err) => {
      res.status(400).send({ msg: "Something went wrong." })
    })
  }
}

// remove cart items
exports.removeCartItem = (req,res) => {
  cartModel.deleteOne({_id: req.query.item_id}).then((result) => {
    res.status(200).send({msg: "Item removed from cart."})
  }).catch((err) => {
    res.status(400).send({msg : "Something went wrong."})
  })
}