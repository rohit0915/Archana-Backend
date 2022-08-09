const mongoose = require('mongoose');

const privacyPolicySchema = new mongoose.Schema({

    heading: {
        type: String
    },
    content:{
        type: String
    }
})

module.exports = mongoose.model('PrivacyPolicy',privacyPolicySchema);
