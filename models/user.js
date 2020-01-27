var mongoose = require('mongoose')
var Post = require('./models/post')
// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
module.exports= mongoose.model("User", userSchema);