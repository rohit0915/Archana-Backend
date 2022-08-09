const mongoose = require('mongoose');
const aboutSchema = new mongoose.Schema({
    aboutUs:{
        type : String
    }
})

module.exports = mongoose.model('About',aboutSchema);
