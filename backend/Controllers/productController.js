const productModel = require('../Models/Products')

// Add Product
exports.addProduct = (req,res) => {
    productModel.create({
      p_name : req.body.p_name,
      p_price : req.body.p_price,
      p_image : req.body.p_image,
      p_stock : req.body.p_stock,
      p_category : req.body.p_category
    }).then((result) => {
      console.log(result)
      res.status(200).send({msg : "Product added successfully."})
    }).catch((err) => {
      console.log(err)
      res.status(400).send({msg : "Something went wrong."})
    })
}

// Retrieve Products from database
exports.getAllProducts = (req,res) => {
    productModel.find({}).then((data) => {
        res.status(200).send(data)
    }).catch((err) => {
        res.status(400).send({msg:"Error loading data."})
    })
}