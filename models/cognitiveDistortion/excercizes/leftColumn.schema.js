const mongoose = require('mongoose');

const leftColumnSchema = new mongoose.Schema({
    situation:{
        type: String
    },
    answer:{
        type: String
    }
},{
    _id:false
})

module.exports = leftColumnSchema;
