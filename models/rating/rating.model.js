const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema({
    ratingBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    lessonId: {
        type: mongoose.Types.ObjectId,
        ref: 'Lesson'
    },
    tags: {
        type: [String]
    },
    rating: {
        type: Number
    },
    body: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Rating', ratingSchema);
