var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    port = 3000,
    methodOverride = require('method-override'),
    Blog = require('./models/blog')

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

app.listen(port, function(err){
    if(err){
        console.log("Server not running")
    } else {
        console.log("Server running on port " + port)
    }
})