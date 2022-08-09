const mongoose = require('mongoose');
const questionSchema = new mongoose.Schema({
    schoolTimeStory: {
        type: mongoose.Types.ObjectId,
        ref: 'SchoolStory',
        required: true
    },
    question:{
        type: String,
        required: true
    },
     options:{
        type: [String]
    }
})

module.exports = mongoose.model('SchoolTimeStoryQuestion',questionSchema);
