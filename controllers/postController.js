const Post = require('../models/Post');
class PostController {

    static getAllPosts = async (req, res) => {
        console.log("getAllPosts");
        const posts = await Post.find();
        return posts
    };

    static addPost = (req, res) => {
        console.log("getpost page");
        res.render("createpost", { 'message': '' });
    }

    static createPost = async (req, res) => {
        try {
            console.log(req.body);
            const { title, description } = req.body
            console.log("creatPost Page");
            if (title && description) {
                const author = {
                    id: req.session.clientId,
                    username: req.session.username
                }
                const post = Post({ 'author': author, 'title': title, 'description': description });
                await post.save();
                res.render('createpost', { 'message': 'post added sucessfully' });
            }
            else {
                console.log("please enter all fields");
                res.render("createpost", { 'message': 'please enter all fileds' });
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    static getPostById = async (req, res) => {
        try {
            const id = req.params.id;
            console.log(`your id is ${id}`);
            const post = await Post.findById({ _id: id });
            console.log(post);
            // res.json(post);
            res.locals.username = '';
            if(req.session.username){
                res.locals.username = req.session.username;
            }
            res.render('post', { 'post': post });

        } catch (error) {
            console.log(error.message);
            res.json(error.message);
        }
    }
};

module.exports = PostController;