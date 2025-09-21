const express = require('express');
const mongoose = require('mongoose')
const path = require("path");
const cookieParser = require("cookie-parser")
require('dotenv').config()

const userRoute = require("./routes/user");
const blogsRoute = require("./routes/blogs");
const { checkForAuthenticationCookie } = require('./middlewere/authentication');
const Blog = require('./models/blog');


const app = express();
const PORT = process.env.PORT || 3000
const DBURI = process.env.mongo_URL || 'mongodb://127.0.0.1:27017/testDB'

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(express.static(path.join(__dirname, 'public')));

// db connection 
mongoose.connect(DBURI)
  .then(() => {
    console.log("server connected..")
  }).catch((err) => {
    console.log("erro: ", err);

  })



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"))
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});






// Routes

app.get('/', async (req, res) => {
  const blogs = await Blog.find().limit(3);
  res.render('home', { blogs });
});
app.get('/contact', (req, res) => { res.render("contact.ejs") })

app.use("/user", userRoute)
app.use("/blog", blogsRoute)





// Start server 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});