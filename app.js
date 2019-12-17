const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://127.0.0.1:27017/restful_blog_app", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});
const Blog = mongoose.model("Blog", blogSchema);

// REROUTE TO /BLOGS
app.get("/", (req, res) => {
    res.redirect("/blogs");
});

// INDEX ROUTE
app.get("/blogs", (req, res) => {
    Blog.find({}, function(err, blogs){
        if(err) console.log(err);
        res.render("index", {blogs: blogs});
    });
});

// NEW ROUTE
app.get("/blogs/new", (req, res) => {
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", (req, res) => {
    Blog.create(req.body.blog, function(err, newBlog){
        if(err) res.render("new");
        res.redirect("/blogs");
    });
});

// SHOW ROUTE
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err) res.redirect("/blogs");
        res.render("show", {blog: foundBlog});
    });
});

app.listen(PORT, () => {
    console.log("Server is running...");
})