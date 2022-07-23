const userIsLoggedIn =(req,res,next)=>{
    console.log("userIsLoggedIn middleware");
    if(req.session.username){
        res.locals.username = req.session.username;
    }else{
        res.locals.username = '';
        return res.redirect('/login'); 
    }
    next();
};
const userIsLoggedOut =(req,res,next)=>{
    console.log("userISloggedOut middleware");
    if(req.session.username){
        return res.redirect('/');
    }
    next();
}

module.exports = {userIsLoggedIn,userIsLoggedOut};