const PostController = require('./postController');
const User = require('../models/User');
const bcrypt = require('bcrypt');
class HomeController {
    static indexPage = async (req, res) => {
        // console.log(`username session ${req.session.username}`);
        if (!req.session.username) {
            res.locals.username = '';
        }
        const getAllPosts = await PostController.getAllPosts();
        res.locals.username = req.session.username;
        res.render('index', { 'posts': getAllPosts.reverse() });

    };

    static postPage = (req, res) => {
        // console.log("post page");;
        res.render('post');
    };

    static loginPage = (req, res) => {
        // console.log("login Page");
        res.locals.username = '';
        res.render('login', { 'message': '' });
    };

    static loginUser = async (req, res) => {
        try {
            // console.log("login user post method");
            const { email, password } = req.body;


            if (email && password) {
                const user = await User.findOne({ 'email': email });
                if (user) {
                    const isValid = await bcrypt.compare(password, user.password);
                    if (isValid) {
                        // console.log("username and password matched");
                        req.session.clientId = user._id;
                        req.session.username = user.username;
                        res.locals.username = req.session.username;
                        // res.render('login',{'message': 'sucessfully logged in'});
                        res.redirect('/');
                    }
                    else {
                        // console.log("username or password is invalid");
                        res.locals.username = '';
                        res.render('login', { 'message': 'invalid credentials' });
                    }
                } else {
                    // console.log("user not found");
                    res.locals.username = '';
                    res.render('login', { 'message': 'invalid credentials' });
                }
            } else {
                // console.log("email or user name not found");
                res.locals.username = '';
                res.render('login', { 'message': 'all fields are required' });
            }
        } catch (error) {
            console.log(error.message);
        }

    };

    static registerPage = (req, res) => {
        // console.log("registerPage");
        res.locals.username = '';
        res.render('register', { 'message': '' });
    };

    static registerUser = async (req, res) => {
        try {
            // console.log("registe user from post method");
            const { username, email, password, password1 } = req.body;
            // console.log(req.body);
            if (username || email || password || password1) {

                const existingUser = await User.findOne({ 'email': email });
                // console.log(`existeingUser : ${existingUser}`);
                if (!existingUser) {
                    if (password === password1) {
                        const user = User({ 'username': username, 'email': email, 'password': password });
                        await user.save();
                        res.locals.username = '';
                        res.render('register', { 'message': "User Created Sucessfully" });
                    }
                    else {
                        // console.log("password and confirm password Incorrect");
                        res.render('register', { 'message': "password and confirm password incorrect" });
                    }
                }
                else {
                    // console.log("Email already registered.Cannot create User");
                    res.render('register', { 'message': 'email already registered.cannot create user' });

                }
            } else {
                // console.log("Please enter all the Fields");
                res.render("register", { 'message': "please enter all the fileds" });
            }
        }

        catch (error) {
            console.log(error.message);
        }
    };

    static logoutUser = async (req, res) => {
        // console.log("logout user page");
        if (req.session.username) {
            req.session.destroy();
            res.locals.username = '';
            res.redirect('/');
        }else{
        res.locals.username
    res.redirect('/');
    
    }
    }
};

module.exports = HomeController;
