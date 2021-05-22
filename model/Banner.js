const mongoose = require('mongoose');

const BannerSchema = mongoose.Schema({
    bannerImage: {
        type: String,
        required: true
    },
    shortOrder: {
        type: String,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Banner', BannerSchema);

