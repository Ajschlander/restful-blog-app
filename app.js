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

Blog.create({
    title: "Test Blog",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    body: "HELLO THIS IS A BLOG POST!"
});

app.get("/", (req, res) => {
    res.send("This is the home route");
});

app.listen(PORT, () => {
    console.log("Server is running...");
})