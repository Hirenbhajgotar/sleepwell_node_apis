var express = require('express');
var router = express.Router();
const User = require('../model/User');
const { registerValidation, loginValidation } = require('../validation.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a user');
});

// register user
router.post('/register', async (req, res, next) => {
    // validate
    const { error, value } = registerValidation(req.body);
    if (error) return res.json(error.details[0].message);
    
    // check email exist
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).json({errorMessage: "Email allready in use"});

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    // store data
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
    })
    try {
        const savedUser = await user.save();
        res.json(savedUser);
    } catch (err) {
        res.json({errorMessage: err});
    }
});

// user login
router.post('/login', async (req, res) => {
    // validation
    const { error, value } = loginValidation(req.body);
    if (error) return res.status(400).json({errorMessage: error.details[0].message});

    // check user
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ errorMessage: "Email not exist!" });

    // validate password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({errorMessage: "Password not match!"});

    var token = jwt.sign({ _id: user._id, email: user.email, name: user.name }, process.env.JWT_TOKEN_SECRET);
    return res.header('auth-token', token).json({ token, user});

})

module.exports = router;
