const router = require('express').Router();
const { Posts, User } = require('../models');


// get homepage
router.get('/', async (req, res) => {
  try {
    const blogPostData = await Posts.findAll({
      include: [
        {
          model: Posts,
          attributes: ['title', 'description'],
        },
      ],
    });

    const blogPosts = blogPostData.map((posts) =>challenge.toJSON());
    
    res.render('homepage', {
      blogPosts,
      loggedIn: req.session.loggedIn,
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

  module.exports = router;