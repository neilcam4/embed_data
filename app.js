var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = 3000;

var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/embed_data", { useNewUrlParser: true }, function(err, db){
    if(err){
        console.log(err)
    } else {
        console.log("Database is connected")
    }
});
app.set('view engine', 'ejs')
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
//MONGOOSE MODEL
var blogSchema = new mongoose.Schema({
    title:String,
    image: String,
    body: String,
    created: {type:Date, default:Date.now}   
})

var Blog = mongoose.model("Blog", blogSchema)

// Blog.create({
//     title: "Test BLog",
//     image: "https://images.unsplash.com/photo-1579873405514-d26df0b77904?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
//     body: "Hello this is a blog post"
// }, function(err, blog){
//     if(err){
//         console.log(err)
//     } else {
//         console.log(blog)
//     }
// })
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

app.listen(port, function(err){
    if(err){
        console.log("Server not running")
    } else {
        console.log("Server running on port " + port)
    }
})