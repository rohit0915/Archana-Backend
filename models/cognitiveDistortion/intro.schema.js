const mongoose = require('mongoose');

const introSchema = new mongoose.Schema({
    paragraph :{
        type: String
    },
    examples:{
        type: [String]
    }
},{
    _id: false
})

module.exports = introSchema;
