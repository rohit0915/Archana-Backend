const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
    heading: {
        type: String,
        default: ''
    },
    points:{
        type: [String]
    }
},{
    _id: false
})

module.exports = exampleSchema;
