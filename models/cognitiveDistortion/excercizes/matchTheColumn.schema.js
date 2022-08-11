const mongoose = require('mongoose');

const leftColumnSchema = require('./leftColumn.schema');

const matchTheColumnSchema = new mongoose.Schema({
    leftColumn:{
        type: [leftColumnSchema]
    },
    rightColumn:{
        type: [String]
    }
},{
    _id: false
})

module.exports = matchTheColumnSchema;
