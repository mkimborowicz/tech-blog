const router = require("express").Router();
const { Posts, User } = require("../models");
const withAuth = require("../utils/auth");

// get homepage
router.get("/", withAuth, async (req, res) => {
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

// Get single post view
router.get("/posts/:id", async (req, res) => {
  try {
    const postData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        // },
        // {
        //   model: Comment,
        //   attributes: ["comment", "date", "user_id"],
        //   include: [
        //     {
        //       model: User,
        //       attributes: ["username"],
        //     },
        //   ],
        },
      ],
    });

    const posts = postData.get({ plain: true });
    res.render("singlepost", {
      ...posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
