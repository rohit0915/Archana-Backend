const mongoose = require('mongoose');
const lessonQuestionSchema = new mongoose.Schema({
    lesson: {
        type: mongoose.Types.ObjectId,
        ref: 'Lesson',
        required: true
    },
    question:{
        type: String,
        // required: true
    },
    options:{
        type: [String]
    },
    answer:{
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('LessonQuestion',lessonQuestionSchema);
