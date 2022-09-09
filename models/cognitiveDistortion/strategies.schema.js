const mongoose = require('mongoose');

const exampleSchema = require('./example.schema');

const strategySchema = new mongoose.Schema({
    intro: {
        type: String,
        default: ''
    },
    differentStrategies: {
        type: [exampleSchema]
    }

}, {
    _id: false
})

module.exports = strategySchema;
