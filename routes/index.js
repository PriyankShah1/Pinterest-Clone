

const express = require('express');
const router = express.Router();
const UserModel = require("./users");
const passport = require('passport');
const localStrategy = require("passport-local");
const PostModel = require("./post");
const upload = require("./multer");

// Setup Passport with a local strategy using UserModel's authenticate method
passport.use(new localStrategy(UserModel.authenticate()));

// Middleware to check if the user is authenticated
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

// Root route that renders the main index page
router.get('/', function(req, res) {
  res.render('index');
});

// Registration page route
router.get('/register', (req, res) => {
  res.render("register");
});

// Profile page route, protected by isLoggedIn middleware
router.get("/profile", isLoggedIn, async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.session.passport.user }).populate("posts");
    res.render("profile", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to load profile.");
  }
});

router.get("/add", isLoggedIn, async (req, res, next) => {
  res.render("add");
});


// Route for adding posts, protected by isLoggedIn middleware
router.post("/createpost", isLoggedIn, upload.single("postimage"), async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded.");
  try {
    const user = await UserModel.findOne({ username: req.session.passport.user });
    const post = new PostModel({
      user: user._id,
      title: req.body.title,
      description: req.body.description,
      image: req.file.filename
    });
    await post.save();
    user.posts.push(post._id);
    await user.save();
    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to create post.");
  }
});

// Feed route to display all posts
router.get("/feed", isLoggedIn, async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user");
    res.render("feed", { posts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to fetch feed.");
  }
});

// Route for file upload
router.post('/fileupload', isLoggedIn, upload.single("image"), async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.session.passport.user });
    user.profileImage = req.file.filename;
    await user.save();
    res.redirect("/profile");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading file.");
  }
});

// Login route using Passport
router.post("/login", passport.authenticate("local", {
  failureRedirect: "/",
  successRedirect: "/profile"
}));

router.get("/show/posts", isLoggedIn, async (req, res, next) => {
  const user = await UserModel
  .findOne({username: req.session.passport.user})
  .populate("posts")
  res.render("show" , {user});
});


// Logout route
router.get("/logout", (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// Handle user registration
router.post('/register', (req, res) => {
  let { username, email, password, fullname } = req.body;

  let newUser = new UserModel({
    username: username,
    email: email,
    name: fullname
  });

  UserModel.register(newUser, password)
    .then(() => {
      passport.authenticate("local")(req, res, function() {
        res.redirect("/profile");
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err.message);
    });
});

module.exports = router;
