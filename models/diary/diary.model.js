const mongoose = require('mongoose');

const diarySchema = new mongoose.Schema({
    diaryIsOfUser:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    date:{
        type: String,
        default: new Date().toLocaleDateString()
    },
    situation:{
        type: [String]
    },
    thoughts:{
        type: [String]
    },
    feelings:{
        type: [String]
    },
    behaviours:{
        type: [String]
    },
    thoughtsHelpful:{
        type: Boolean
    },
    thoughtsWholesome:{
        type: Boolean
    },
    distortion:{
        type: [String]
    }
},{
    timestamps: true
})



module.exports = mongoose.model('Diary',diarySchema);
