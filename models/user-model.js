const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    Name: String,
    email: String,
    password: String,
    cart: {
        type: Array,
        default: []
    },
    orders: {
        type: Array,
        default: []
    },
    Contact: Number,
    picture: String,
}) 

module.exports = mongoose.model('user', userSchema);