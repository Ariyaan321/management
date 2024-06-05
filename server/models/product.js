const mongoose = require('mongoose')
const { Schema } = mongoose

const ProductSchema = new Schema(
    {
        ProductName: {
            type: String,
            required: true
        },
        Price: {
            type: Number,
            required: true
        }
    },
    {
        versionKey: false
    }
)

const Product = new mongoose.model('product', ProductSchema)
module.exports = Product