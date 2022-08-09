const mongoose = require('mongoose');
const storyExplainationSchema = require('./storyExplaination.Schema');
const questionTypesSchema = require('./question.types.schema');

const lessonSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description:{
        type: String
    },
    media:{
        type: String
    },
    story:{
        type: String
    },
    storyExplaination:{
        type: storyExplainationSchema
    },
    summary:{
        type: String   ///bifercate it to take away 1 , 2, 3
    },
    questions:{
        type: questionTypesSchema
    }
   
})

module.exports = mongoose.model('Lesson',lessonSchema);
