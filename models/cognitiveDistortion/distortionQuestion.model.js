const mongoose = require('mongoose');
const distortionQuestionSchema = new mongoose.Schema({
    distortion: {
        type: mongoose.Types.ObjectId,
        ref: 'CognitiveDistortion',
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

module.exports = mongoose.model('DistortionQuestion',distortionQuestionSchema);
