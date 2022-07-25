const express = require('express');
const route = express.Router();
const HomeController = require('../controllers/homeController');
const PostController = require('../controllers/postController');
const auth = require('../middlewares/authMiddleware');

route.get('/',HomeController.indexPage);
route.get('/login',auth.userIsLoggedOut,HomeController.loginPage);
route.post('/login',auth.userIsLoggedOut,HomeController.loginUser);
route.get('/register',auth.userIsLoggedOut,HomeController.registerPage);
route.post('/register',auth.userIsLoggedOut,HomeController.registerUser);
route.get('/logout',HomeController.logoutUser);



route.get('/post',auth.userIsLoggedIn,PostController.addPost);
route.post('/post',auth.userIsLoggedIn,PostController.createPost);
route.get('/post/:id',PostController.getPostById);
route.get('/post/edit/:id',auth.userIsLoggedIn,PostController.editPost);
route.post('/post/edit/:id',auth.userIsLoggedIn,PostController.updatePost);
route.get('/post/delete/:id',auth.userIsLoggedIn,PostController.deletePost);

module.exports = route;