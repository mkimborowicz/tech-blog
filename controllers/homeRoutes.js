const router = require("express").Router();
const { Posts, User } = require("../models");
const withAuth = require("../utils/auth");

// get homepage
router.get("/", async (req, res) => {
  try {
    const blogPostData = await Posts.findAll({
      include: [User],
    });

    const blogPosts = blogPostData.map((posts) => posts.get({ plain: true }));

    res.render("homepage", {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get login
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

// get signup
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

// get profile
router.get("/dashboard", withAuth, async (req, res) => {
  // Use req.session.user_id to get the current user
  const userData = await User.findByPk(req.session.user_id);

  // This is a fancy way of mapping the userData and returning it in JSON format
  const user = userData.get({ plain: true });

  const userPostData = await Posts.findAll({
    include: [
      {
        model: User,
      },
    ],
    where: { id: req.session.user_id },
  });
  const userPosts = userPostData.map((posts) => posts.get({ plain: true }));
  res.render("dashboard", {
    userPosts,
    user,
    logged_in: req.session.logged_in,
  });
});

module.exports = router;
