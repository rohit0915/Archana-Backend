const mongoose = require('mongoose');
const schoolStoryAnswerSchema = new mongoose.Schema({
    answeredBy: {
        type : mongoose.Types.ObjectId,
        ref: 'User'
    },
    question:{
        type: mongoose.Types.ObjectId,
        ref: 'SchoolTimeStoryQuestion'
    },
    answer:{
        type: String
    },
    schoolTimeStory:{
        type: mongoose.Types.ObjectId,
        ref: 'SchoolStory'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('SchoolTimeStoryAnswer',schoolStoryAnswerSchema);
