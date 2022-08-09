const mongoose = require('mongoose');
const lessonProgressSchema = new mongoose.Schema({
    
    lessonId: {
        type: mongoose.Types.ObjectId,
        ref: 'Lesson',
    
    },
    percentCompleted: {
        type: Number,
        default: 0
    }

},{
_id: false
})

module.exports = lessonProgressSchema;
