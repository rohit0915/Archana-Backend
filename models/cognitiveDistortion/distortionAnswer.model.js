const mongoose = require('mongoose');

const distortionAnswerSchema = new mongoose.Schema({

    answerBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    distortionQuestionId:{
        type: mongoose.Types.ObjectId,
        ref: 'DistortionQuestion',
        required: true
    },
    distortionId:{
        type: mongoose.Types.ObjectId,
        ref: 'CognitiveDistortion',
        required: true
    },
    answer:{
        type: String,
        required: true
    }

},{
    timestamps: true
})

module.exports = mongoose.model('DistortionAnswer',distortionAnswerSchema);
