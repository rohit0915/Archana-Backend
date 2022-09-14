const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    videos: [String]
})

module.exports = mongoose.model('Banner',bannerSchema);
