var mongoose= require('mongoose')

var blogSchema = new mongoose.Schema({
    title:String,
    image: String,
    body: String,
    score: Number,
    created: {type:Date, default:Date.now}   
})

var Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog;