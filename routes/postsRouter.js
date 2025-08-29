const express = require("express");
const authController = require('../controllers/authController');
const { identifier } = require("../middlewares/identification");
const router = express.Router();
const postController = require('../controllers/postsController')

router.get('/all-posts', postController.getPosts)
router.get('/single-post', postController.singlePost )
router.post('/create-post', identifier,  postController.createPost )

router.put('/update-post', identifier, postController.updatePost)
router.delete('/delete-post', identifier, postController.deletePost)


module.exports = router