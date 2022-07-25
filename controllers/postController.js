const Post = require('../models/Post');
class PostController {

// get all posts 

    static getAllPosts = async (req, res) => {
        // console.log("getAllPosts");
        const posts = await Post.find();
        return posts
    };


    // create post page
    static addPost = (req, res) => {
        // console.log("getpost page");
        res.render("createpost", { 'message': '' });
    }


    //creating a post if user is authenticated
    static createPost = async (req, res) => {
        try {
            // console.log(req.body);
            const { title, description } = req.body
            // console.log("creatPost Page");
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
                // console.log("please enter all fields");
                res.render("createpost", { 'message': 'please enter all fileds' });
            }
        } catch (error) {
            console.log(error.message);
        }
    };


//showing the post by id 
    static getPostById = async (req, res) => {
        try {
            const id = req.params.id;
            // console.log(`your id is ${id}`);
            const post = await Post.findById({ _id: id });
            // console.log(post);
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

    // editing post page
    static editPost = async (req,res)=>{
        try{
            const id =req.params.id;
            if(id){
                const post = await Post.findOne({'_id':id});
                // console.log(post);
                // console.log(post.title);
                // console.log(post.description);
                if(req.session.username){
                    res.locals.username = req.session.username;
                }else{
                    res.locals.username = '';
                }
                
                res.render('edit',{'post':post,'message':''});
            }
            else{
            res.locals.username = '';
            res.render('edit',{'post':'','message':''});
        }
        }
        catch(error){
            console.log(error.message);
        }
    }

    //updating the post of a user
    static updatePost = async (req,res)=>{
        try{

            const id =req.params.id;
            const {title,description} = req.body;
            if(id){
                const post = await Post.findOneAndUpdate({'_id':id}, {title:title,description:description}, { new: true });
        
             
                res.render('edit',{'post':post,'message':'Updated Sucessfully'});
            }
            else{
               
            res.render('edit',{'post':'','message':''});
        }
        }
        catch(error){
            console.log(error.message);
        }
    }



//deleteing a post if a user  is authenticated
    static deletePost = async (req,res)=>{
        try{
            const id = req.params.id;
            const post = await Post.findByIdAndDelete({_id:id});
            // console.log(post);
            res.redirect('/');
        }catch(error){
            console.log(error.message);
        }

    };
};

module.exports = PostController;