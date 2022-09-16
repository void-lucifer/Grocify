const mongoose = require('mongoose')
const User = require('./Users')

const CartSchema = new mongoose.Schema({
    u_id: {
        type: String,
        required: true
    },
    p_data: {
        type: Object
    }
},
{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

CartSchema.statics.calcTotalPrice = async function(userId){
    const stats = await this.aggregate([
        {
            $match: {u_id: userId}
        },
        {
            $group: {
                _id: "$u_id",
                totalPrice: {$sum: "$p_data.p_price"}
            }
        }
    ])
    
    if(stats.length > 0){
        await User.findByIdAndUpdate(userId, {
            cartTotal: stats[0].totalPrice
        })
    }
    else{
        await User.findByIdAndUpdate(userId, {
            cartTotal: 0
        })
    }
}

CartSchema.post('save', function(){
    this.constructor.calcTotalPrice(this.u_id)
})

CartSchema.pre(/^deleteOne/, async function(next){
    this.r = await this.clone().findOne()
    next()
})

CartSchema.post(/^deleteOne/, async function(){
    this.r.constructor.calcTotalPrice(this.r.u_id)
})

const Cart = mongoose.model("cart", CartSchema)

module.exports = Cart