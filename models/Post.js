const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: {
            type: String,
            required: true
        }
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

}, {
    timestamps: true
});

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;

