const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
    paragraph :{
        type: String,
        default: ''
    },
    examples:{
        type: [String]
    }
},{
    _id: false
})

module.exports = introSchema;
