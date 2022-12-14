const mongoose = require('mongoose');
const exampleSchema = require('./example.schema');

const explanationSchema = new mongoose.Schema({
    theory :{
        type: String,
        default: ''
    },
    examples:{
        type: exampleSchema
    }
},{
    _id: false
})

module.exports = explanationSchema;
