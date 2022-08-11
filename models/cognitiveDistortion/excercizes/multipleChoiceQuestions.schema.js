const mongoose = require('mongoose');

const multipleChoiceQuestionsSchema = new mongoose.Schema({
    question: {
        type: String
    },
    options:{
        type: [String]
    },
    answers:{
        type: [String]
    }
},{
    _id: false
})

module.exports = multipleChoiceQuestionsSchema;
