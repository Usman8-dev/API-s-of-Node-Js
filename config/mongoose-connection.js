const mongoose = require('mongoose');
const dbgr = require('debug')('development : mongoose');
const config = require('config');

mongoose.connect(`${config.get("MONGODB_URI")}/ProjectPractice`)
.then(function(){
    dbgr("Connected SuccessFully!!!");
})
.catch(function(){
    dbgr(err);
})

module.exports = mongoose.connection;