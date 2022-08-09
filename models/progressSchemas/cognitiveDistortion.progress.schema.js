const mongoose = require('mongoose');
const cognitiveDistortionProgressSchema = new mongoose.Schema({
    
    distortionId: {
        type: mongoose.Types.ObjectId,
        ref: 'CognitiveDistortion',
    
    },
    percentCompleted: {
        type: Number,
        default: 0
    }

},{
_id: false
})

module.exports = cognitiveDistortionProgressSchema;
