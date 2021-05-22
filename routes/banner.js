var express = require('express');
var router = express.Router();
const Banner = require('../model/Banner');
const verify = require('./verifyToken');


// get all posts
router.get('/', async (req, res, next) => {
    res.send('listing banners');
    // try {
    //     const posts = await Post.find();
    //     res.json(posts);
    // } catch (err) {
    //     res.json({message: err});
    // }
});

// get single post
// router.get('/:postId', async (req, res, next) => {
//     try {
//         const post = await Post.findById(req.params.postId);
//         res.json(post);
//     } catch (err) {
//         res.json({message: err});
//     }
// })

// add banner
router.post('/', function(req, res, next) {
    if (req.files === null) {
        return res.status(400).json({errorMessage: 'No file uploaded'});
    }
    const file = req.files.bannerImage;
    let date = Date.now()
    let fileName = date+file.name
    // console.log(fileName);
    file.mv(`public/images/banners/${fileName}`, (err) => {
        // console.log(err);
        if(err) {
            return res.status(500).json(err);
        }
        // return res.json({fileName: file.name});
        const banner = new Banner({
            bannerImage: fileName,
            shortOrder: req.body.shortOrder,
        });
        banner.save()
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.json({message: err});
        })
    });
    // console.log(req.files);
    // console.log(req.body);

    
});

// // delete post
// router.delete('/:postId', async (req, res, next) => {
//     try {
//         const removedPost = await Post.remove({_id: req.params.postId});
//         res.json({message: "post removed successfully"});
//     } catch (err) {
//         res.json({message: err});
//     }
// });

// // update post
// router.patch('/:postId', async (req, res, next) => {
//     try {
//         const updatePost = await Post.updateOne(
//             {_id: req.params.postId},
//             {$set: { title: req.body.title}}
//         );
//         res.json(updatePost);
//     } catch (err) {
//         res.json({ message: err, type: 'error'});
//     }
// });

module.exports = router;