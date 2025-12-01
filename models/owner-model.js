const mongoose = require('mongoose');

const ownerSchema = mongoose.Schema({
    FullName: String,
    email: String,
    password: String,
  
    products: {
        type: Array,
        default: []
    },
    picture: String,
}) 

module.exports = mongoose.model('owner', ownerSchema);