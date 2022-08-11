const mongoose = require('mongoose');

const CognitiveDistortionRatingSchema = new mongoose.Schema({
    distortionId: {
        type: mongoose.Types.ObjectId,
        ref: 'CognitiveDistortion',
        required: true
    },
    ratingBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    tags :{
        type: [String]
    },
    rating:{
        type: Number ,
        max: 5
    },
    body: {
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('CognitiveDistortionRating',CognitiveDistortionRatingSchema);
