const mongoose = require('mongoose');

const situationSchema = new mongoose.Schema({

    // item:{
    // type: [situationItemSchema]
    // }

    distortionId: {
        type: mongoose.Types.ObjectId,
        ref: 'CognitiveDistortion',
        required: true
    },
    title: {
        type: String
    },
    points: {
        type: [String]
    }

},{
    timestamps: true
})

module.exports = mongoose.model('Situation', situationSchema);
