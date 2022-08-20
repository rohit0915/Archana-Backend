const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    images: [String]
})

module.exports = mongoose.model('Banner',bannerSchema);
