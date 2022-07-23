const express = require('express');
const route = express.Router();
const HomeController = require('../controllers/homeController');
const PostController = require('../controllers/postController');
route.get('/',HomeController.indexPage);
// route.get('/post',HomeController.postPage);
route.get('/login',HomeController.loginPage);



route.get('/post',PostController.addPost);
route.post('/post',PostController.createPost);
route.get('/post/:id',PostController.getPostById);

module.exports = route;