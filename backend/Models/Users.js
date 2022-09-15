const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
    },
    email: {
        type : String,
        required : true,
        unique : true,
        validate: [validator.isEmail, "Invalid Email"]
    },
    password: {
        type : String,
        required : true
    },
    cartTotal: {
        type: Number,
        required: true,
        default: 0
    }
})

const User = mongoose.model("users", UserSchema)

module.exports = User