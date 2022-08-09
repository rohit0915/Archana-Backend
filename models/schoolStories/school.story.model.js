const mongoose = require('mongoose');
const schoolStorySchema = new mongoose.Schema({
    title: String,
    description: String,
    story: String,
    media: String,  /// file type will be audio
    questions:[
        {
            type: mongoose.Types.ObjectId,
            ref: 'SchoolTimeStoryQuestion'
        }
    ]
})

module.exports = mongoose.model('SchoolStory',schoolStorySchema);
