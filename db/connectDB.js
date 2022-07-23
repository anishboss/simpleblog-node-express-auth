const mongoose = require("mongoose");

const connectDB = async (DB_URL)=>{
    try{
        const DB_OPTIONS = {
            dbName : 'simpleblog'
        };
        await mongoose.connect(DB_URL,DB_OPTIONS);
        console.log('connected to database');
    }catch(error){
        console.log(error.message);
    }

};

module.exports = connectDB;