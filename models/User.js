const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required: true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true   
    }
},{timestamps : true});

userSchema.pre('save',async function(next){
    this.password = await bcrypt.hash(this.password,10);
    next();
});

const User = mongoose.model('User',userSchema);

module.exports = User;