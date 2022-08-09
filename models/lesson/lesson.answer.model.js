const mongoose = require('mongoose');
const lessonAnswerSchema = new mongoose.Schema({
    answeredBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    question:{
        type: mongoose.Types.ObjectId,
        ref: 'LessonQuestion'
    },
    answer: {
        type: String
    },
    lessonId:{
        type: mongoose.Types.ObjectId,
        ref: 'Lesson'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('LessonAnswer',lessonAnswerSchema);
