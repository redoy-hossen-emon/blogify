const { Router } = require("express")
const User = require("../models/user")

const router = Router()

// GET /signin route: Render the signin page --------------------
router.get("/signin", (req, res) => {
  return res.render("signin")
})

// GET /signup route: Render the signup page --------------------
router.get("/signup", (req, res) => {
  return res.render("signup");
});

// POST /signup route: Handle user registration --------------------
router.post("/signup", async (req, res) => {
  console.log(req.body);

  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  })
  return res.redirect("/")
})

// POST /signin route: Authenticate user and set token cookie --------------------
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const token = await User.matchPasswordAndGenerateToken(email, password);

    if (!token) {
      return res.render("signin", {
        errormsg: error.message
      })
    }

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      errormsg: error.message
    })
  }
});

// GET /logout route: Clear token cookie and logout user --------------------
router.get("/logout", async (req, res) => {
  res.clearCookie("token").redirect("/");
})

module.exports = router
