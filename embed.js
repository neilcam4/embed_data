var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/embed_data", { useNewUrlParser: true });

//USER
var userSchema = new mongoose.Schema({
    email:String,
    name:String,
    posts:[postSchema]
})

var User = mongoose.model("User", userSchema)
//POST

var postSchema = new mongoose.Schema({
    title: String,
    content: String
})
var Post = mongoose.model("Post", postSchema)

// var newUser = new User({
//     email:"Charlie@brown.edu",
//     name:"Charlie Brown"
// })

// newUser.save(function(err, user){
//     if(err){
//         console.log(err)
//     } else {
//         console.log(user)
//     }
// })

var newPost = new Post({
    title:"Greatest Goals",
    content:"Top Champions League moments"
})

newPost.save(function(err, post){
    if(err){
        console.log(err)
    } else {
        console.log(post)
    }
})