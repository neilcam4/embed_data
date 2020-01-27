var mongoose= require('mongoose')

var reviewSchema = new mongoose.Schema({
    heading:String,
    body: String
})
var Review = mongoose.model("Review", reviewSchema)

var blogSchema = new mongoose.Schema({
    title:String,
    image: String,
    body: String,
    score: Number,
    review:[reviewSchema],
    created: {type:Date, default:Date.now}   
})

var Blog = mongoose.model("Blog", blogSchema)

module.exports =  Blog;
