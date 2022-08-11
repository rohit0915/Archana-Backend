const mongoose = require('mongoose');

const excercizePatternSchema = require('./excercizePattern.schema');
const matchTheColumnSchema = require('./matchTheColumn.schema');
const multipleChoiceQuestionsSchema = require('./multipleChoiceQuestions.schema');

const excerciseSchema = new mongoose.Schema({
    pattern:{
        type: [excercizePatternSchema] 
    },
    matchTheColumn1:{
        type: matchTheColumnSchema
    },
    matchTheColumn2:{
        type: matchTheColumnSchema
    },
    multipleChoiceQuestions:{
        type: [multipleChoiceQuestionsSchema]
    }

})

module.exports = mongoose.model('ExcerciseCognitiveDistortion',excerciseSchema);
