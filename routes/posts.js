var express = require('express');
var router = express.Router();
const Post = require('../model/Post');
const verify = require('./verifyToken');

router.get('/user', verify, (req, res, next) => {
    res.json(req.user);
});
// get all posts
router.get('/', async (req, res, next) => {
    // res.send('listing posts');
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({message: err});
    }
});

// get single post
router.get('/:postId', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (err) {
        res.json({message: err});
    }
})

// send post
router.post('/', function(req, res, next) {
    // res.send(req.body);
    const post = new Post({
        title: req.body.title,
        name: req.body.name,
        description: req.body.description,
    });
    post.save()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.json({message: err});
    })
});

// delete post
router.delete('/:postId', async (req, res, next) => {
    try {
        const removedPost = await Post.remove({_id: req.params.postId});
        res.json({message: "post removed successfully"});
    } catch (err) {
        res.json({message: err});
    }
});

// update post
router.patch('/:postId', async (req, res, next) => {
    try {
        const updatePost = await Post.updateOne(
            {_id: req.params.postId},
            {$set: { title: req.body.title}}
        );
        res.json(updatePost);
    } catch (err) {
        res.json({ message: err, type: 'error'});
    }
});

module.exports = router;