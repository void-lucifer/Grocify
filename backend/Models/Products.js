const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    p_image: {
        type : String,
        required : true
    },
    p_name: {
        type : String,
        unique: true,
        required : true,
    },
    p_price: {
        type: Number,
        required: true
    },
    p_stock: {
        type : Number,
        required : true,
        default : 0
    },
    p_category: {
        type: String,
        required: true
    }
})

const Product = mongoose.model("products", ProductSchema)

module.exports = Product