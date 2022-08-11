const mongoose = require('mongoose');

const excercizePatternSchema = new mongoose.Schema({

    title: {
        type: String,
        default: ''
    },
    paragraph:{
        type: String,
        default: ''
    },
    examples:{
        type: [String]
    }

},{
    _id: false
})

module.exports = excercizePatternSchema;
