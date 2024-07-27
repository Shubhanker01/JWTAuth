const mongoose = require('mongoose')
const { Schema } = mongoose

const posts = new Schema({
    "user_id": String,
    "caption": String,
    "description": String,
    "likes": Number,
    "comments": Array
})

module.exports = mongoose.model('posts', posts)