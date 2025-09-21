const { Router } = require("express")
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog")

const router = Router()

router.get("/", async (req, res) => {
  const blogs = await Blog.find({});

  return res.render("blogs", {
    blogs

  })
})
router.get("/category/:id", async (req, res) => {
  const blogs = await Blog.find({ category: req.params.id });

  return res.render("blogs", {
    blogs,
    searchCategory: req.params.id,
  })
})
router.get("/index/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);


  return res.render("single-blog", {
    blog

  })
})

router.get("/add-new", async (req, res) => {

  if (!req.cookies.token) {
    return res.redirect("/user/signin")
  }

  return res.render("add-blogs", {
    blogCategory: ["technology", "lifestyle", "education", "business", "other"],
  })
})
// Storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("./public/uploads/"));
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

// Initialize upload middleware
const upload = multer({ storage: storage });

router.post("/add-new", upload.single("coverImage"), async (req, res) => {


  const result = await Blog.create({
    title: req.body.blogTitle,
    content: req.body.blogContent,
    category: req.body.blogCetagory,
    coverImage: req.file.filename,
    authorId: req.user._id,
    author: req.user.fullName,
    isPublished: true
  })
  console.log(req.user);


  return res.redirect("/")
})



module.exports = router;