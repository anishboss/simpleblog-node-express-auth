const PostController = require('./postController');
class HomeController{
    static indexPage = async (req,res)=>{
        // res.send("this is index page");
        console.log("index page");
        const getAllPosts = await PostController.getAllPosts();
        
        res.render('index',{'posts': getAllPosts.reverse()});
    };

    static postPage = (req,res)=>{
        console.log("post page");;
        res.render('post');
    };

    static loginPage = (req,res)=>{
        console.log("login Page");
        res.render('login');
    };

};

module.exports = HomeController;
