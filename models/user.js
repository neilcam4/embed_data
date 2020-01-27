var mongoose = require('mongoose')
var postSchema = require('./post')
// USER - email, name
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);
module.exports = User;