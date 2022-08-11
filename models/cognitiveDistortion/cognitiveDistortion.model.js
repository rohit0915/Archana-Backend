const mongoose = require('mongoose');

const introSchema = require('./intro.schema');
const explanationSchema = require('./explanation.schema');
const strategySchema = require('./strategies.schema');

const distortionSchema = new mongoose.Schema({

    title: {
        type: String,
        default: ''
    },

    media :{
        type: String
    },

    description: {
        type: String,
        default: ''
    },

    introduction: {
        type: introSchema
    },

    story: {
        type: String,
        default:''
    },

    questions: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'DistortionQuestion'
        }
    ],

    explanation: {
        type: explanationSchema
    },

    strategies:{
        type: strategySchema
    }

},{
    timestamps: true
})

module.exports = mongoose.model('CognitiveDistortion', distortionSchema);
