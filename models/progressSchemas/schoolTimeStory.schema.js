const mongoose = require('mongoose');
const schoolStoryProgressSchema = new mongoose.Schema({
    
    schoolStoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'SchoolStory',
    
    },
    percentCompleted: {
        type: Number,
        default: 0
    }

},{
_id: false
})

module.exports = schoolStoryProgressSchema;
