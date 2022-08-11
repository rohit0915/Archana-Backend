const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema({
    ratingBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lessonId: {
        type: mongoose.Types.ObjectId,
        ref: 'Lesson',
        required: true
    },
    tags: {
        type: [String]
    },
    rating: {
        type: Number,
        max: 5
    },
    body: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Rating', ratingSchema);
