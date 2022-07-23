const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author : {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    }

},{
    timestamps: true
});

const postModel = mongoose.model('Post',postSchema);

module.exports = postModel;

