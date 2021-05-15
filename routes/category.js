var express = require('express');
var router = express.Router();
const verify = require('./verifyToken');
const Category = require('../model/Category');
const { categoryValidation } = require('../validation.js');


// get all category
router.get('/', verify, async (req, res, next) => {
    try {
        const category = await Category.find();
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// get single category
router.get('/:categoryId', async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.categoryId);
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json({ message: err });
    }
})

// post category
router.post('/', (req, res, next) => {
    // validate
    const { error, value } = categoryValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    // check sub category exist or not
    const checkCate = await SubCategory.Category({ category: req.body.category });
    if (checkCate) {
        return res.status(400).json({ errorMessage: "Category allready exist!" });
    }

    const category = new Category({
        category: req.body.category,
        is_featured: req.body.is_featured,
    });
    category.save()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).json({ message: err });
        })
});

// delete category
router.delete('/:categoryId', async (req, res, next) => {
    try {
        const removedCategory = await Category.remove({ _id: req.params.categoryId });
        res.status(200).json({ message: "Category removed successfully" });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// update category
router.patch('/:categoryId', async (req, res, next) => {
    try {
        // validate
        const { error, value } = categoryValidation(req.body);
        if (error) return res.status(400).json(error.details[0].message);
        
        const updateCategory = await Category.updateOne(
            { _id: req.params.categoryId },
            { $set: { category: req.body.category, is_featured: req.body.is_featured } }
        );
        res.status(200).json(updateCategory);
    } catch (err) {
        res.status(400).json({ message: err, type: 'error' });
    }
});

module.exports = router;