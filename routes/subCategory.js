var express = require('express');
var router = express.Router();
const verify = require('./verifyToken');
const SubCategory = require('../model/SubCategory');
const { subCategoryValidation } = require('../validation.js');
const { body } = require('express-validator');


// get all category
router.get('/', verify, async (req, res, next) => {
    try {
        const category = await SubCategory.find();
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// get single category
router.get('/:subSategoryId', async (req, res, next) => {
    try {
        const category = await SubCategory.findById(req.params.subSategoryId);
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json({ message: err });
    }
})


// post category
router.post('/', async (req, res, next) => {
    // validate
    const { error, value } = subCategoryValidation(req.body);
    if (error) return res.status(400).json(error.details[0].message);
   
    // 609a7512f4e5c02564928fe4
    // check sub category exist or not
    const checkSubCate = await SubCategory.findOne({ sub_category: req.body.sub_category });
    if (checkSubCate) {
        return res.status(400).json({ errorMessage: "Sub category allready exist!" });
    }

    const category = new SubCategory({
        sub_category: req.body.sub_category,
        category_id: req.body.category_id,
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

// 609a5e707a38e111e84b9f1d
// delete category
router.delete('/:subCategoryId', async (req, res, next) => {
    try {
        const removedCategory = await SubCategory.remove({ _id: req.params.subCategoryId });
        res.status(200).json({ message: "Category removed successfully" });
    } catch (err) {
        res.status(400).json({ message: err });
    }
});

// 609a7512f4e5c02564928fe4
// update category
router.patch('/:subCategoryId', async (req, res, next) => {
    try {
        // validate
        const { error, value } = subCategoryValidation(req.body);
        if (error) return res.status(400).json(error.details[0].message);

        const updateCategory = await SubCategory.updateOne(
            { _id: req.params.subCategoryId },
            { $set: { 
                sub_category: req.body.sub_category, 
                category_id: req.body.category_id, 
                is_featured: req.body.is_featured 
            } }
        );
        res.status(200).json(updateCategory);
    } catch (err) {
        res.status(400).json({ message: err, type: 'error' });
    }
});

module.exports = router;