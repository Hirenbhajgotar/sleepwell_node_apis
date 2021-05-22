const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true
    },
    is_featured: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Category', CategorySchema);

