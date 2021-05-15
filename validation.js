const Joi = require('joi');


const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(4).required()
    });
    return schema.validate(data);
}
// login validataion
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().min(4).required().email(),
        password: Joi.string().min(4).required()
    });
    return schema.validate(data);
}

// category validation
const categoryValidation = (data) => {
    const schema = Joi.object({
        category: Joi.string().trim().required(),
    });
    return schema.validate(data);
}
// sub category validation
const subCategoryValidation = (data) => {
    const schema = Joi.object({
        sub_category: Joi.string().required(),
        category_id: Joi.string().required(),
        is_featured: Joi.boolean()
    })
    return schema.validate(data);
}

module.exports.registerValidation    = registerValidation;
module.exports.loginValidation       = loginValidation;
module.exports.categoryValidation    = categoryValidation;
module.exports.subCategoryValidation = subCategoryValidation;