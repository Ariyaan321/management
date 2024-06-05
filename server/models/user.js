const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        Username: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true
        },
        Phone: {
            type: Number,
            required: true
        },
    },
    {
        versionKey: false,
    }
)

const User = mongoose.model('user', userSchema)
module.exports = User