const withAuth = require("../utils/auth");

const router = require("express").Router();

router.get("/", withAuth, async (req, res) => {
  try {
    res.render("dashboard", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.redirect("/login");
  }
});

router.get('/new', withAuth, async (req, res)=>{
    res.render('newPost', {
        logged_in: req.session.logged_in
    })
})

module.exports = router;
