const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      description:{type:String} ,
      price: {
        type: Number,
        required: true
      },
      category: {type:String},
},
    { versionKey: false }
)

const ProductModel = mongoose.model('product', productSchema)

module.exports = { ProductModel }