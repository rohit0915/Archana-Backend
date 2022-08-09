const mongoose = require('mongoose');
const storyExplainationSchema = new mongoose.Schema({
    beleif:{
        type: String ,
    },
    evidence:{
        type: String
    }
},{
    _id: false
})

module.exports = storyExplainationSchema;
