const mongoose = require('mongoose');
const questionTypesSchema = new mongoose.Schema({
    storyQuestions: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'LessonQuestion'
        }
    ],
    testUnderstandingQuestions: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'LessonQuestion'
        }
    ],
    practiceQuestions: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'LessonQuestion'
        }
    ]

},{
    _id: false
})

module.exports = questionTypesSchema;
