const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    mobile:{
        type: String,
        required: true
    },
    whatsapp:{
        type: String,
        required: true
    },
    mail:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('ContactUs',contactSchema);
