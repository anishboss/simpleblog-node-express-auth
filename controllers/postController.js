const Post = require('../models/Post');
class PostController {

    static getAllPosts = async (req, res) => {
        console.log("getAllPosts");
        const posts = await Post.find();
        return posts
    };

    static addPost = (req,res)=>{
        console.log("getpost page");
        res.render("createpost");
    }

    static createPost = async (req, res) => {
        console.log(req.body);
        const {title, description } = req.body
        console.log("creatPost Page");
        const post = Post({ 'author': "admin", 'title': title, 'description': description });
        await post.save();
        res.redirect('/post');
    };

    static getPostById = async (req, res) => {
        try {
            const id = req.params.id;
            console.log(`your id is ${id}`);
            const post = await Post.findById({ _id: id });
            console.log(post);
            // res.json(post);
            res.render('post',{'post':post});

        }catch(error){
            console.log(error.message);
            res.json(error.message);
        }
    }
};

module.exports = PostController;