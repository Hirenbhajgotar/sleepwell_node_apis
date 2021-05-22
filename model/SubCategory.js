const mongoose = require('mongoose');

const SubCategorySchema = mongoose.Schema({
    sub_category: {
        type: String,
        required: true,
        unique: true
    },
    category_id: {
        type: String,
        required: true
    },
    is_featured: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('SubCategory', SubCategorySchema);

