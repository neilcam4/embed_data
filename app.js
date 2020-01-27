var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = 3000,
    methodOverride = require('method-override'),
    Blog = require('./models/blog');
    

var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/embed_data", { useNewUrlParser: true }, function(err, db){
    if(err){
        console.log(err)
    } else {
        console.log("Database is connected")
    }
});
mongoose.set('useFindAndModify', false);
app.set('view engine', 'ejs')
app.use(methodOverride("_method"))
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
//MONGOOSE MODEL


//RESTFUL ROUTES
//index route
app.get('/', function(req,res){
    res.redirect('/blogs')
})
app.get('/blogs', function(req,res){
    Blog.find({}, function(err, blog){
        if(err){
            console.log(err)
        } else {
            res.render("index", {blog:blog})
        }
    })
})
//new route
app.get('/blogs/new', function(req,res){
    res.render("new")
})
//create
app.post('/blogs', function(req,res){
    Blog.create(req.body.blog, function(err, blog){
        if(err){
            res.render("new")
        } else {
            res.redirect('/blogs')
        }
    })
})
//show
app.get('/blogs/:id', function(req,res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err)
        } else {
            res.render("show", {blog:blog})
        }
    })
})

app.get('/progress', function(req,res){
    Blog.findOne({title:"Lake Wanaka with CAnoers"}, function(err, blog){
        if(err){
            console.log(err)
        } else {
            res.render("progress", {blog:blog})
        }
    })
})

//edit
app.get('/blogs/:id/edit', function(req,res){
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err)
        } else {
            res.render("edit", {blog:blog})
        }
    })
})

//update
app.put('/blogs/:id', function(req,res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err,blog){
        if(err){
            res.redirect('/blogs')
        } else {
            res.redirect('/blogs/'+req.params.id)
        }
    })
})
// postschema
var postSchema = new mongoose.Schema({
    title: String,
    content: String
 });

var Post = mongoose.model("Post", postSchema);
//user schema
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var User = mongoose.model("User", userSchema);

// var newUser = new User({
//     email: "frank@sporting.co.uk",
//     name: "Frank Bruno ",
// })

// newUser.posts.push({
//     title: 'Reflections on chocolate',
//   content: 'It is soooo delicious'
// })

// newUser.save(function(err, user){
//     if(err){
//         console.log(err)
//     } else {
//         console.log(user)
//     }
// })
// var newPost = new Post({
//     title:"Reflectins on chocolate", 
//     content: "It is delicious"
// })

// newPost.save(function(err, post){
//     if(err){
//         console.log(err)
//     } else {
//         console.log(post)
//     }
// })

app.listen(port, function(err){
    if(err){
        console.log("Server not running")
    } else {
        console.log("Server running on port " + port)
    }
})

