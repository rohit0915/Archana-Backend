const mongoose = require('mongoose');

const startJourneyTogetherSchema = new mongoose.Schema({

    heading1: {
        type: String
    },
    content1:{
        type: String
    },
    heading2: {
        type: String
    },
    content2:{
        type: String
    }
})

module.exports = mongoose.model('StartJourney',startJourneyTogetherSchema);
