const withAuth = require("../utils/auth");
const { User, Posts} = require('../models');
const router = require("express").Router();

router.get('/', withAuth, async (req, res) => {
  try {
      const postsData = await Posts.findAll({
          include: [
            { model: User, 
              attributes: ['username'] }],
          where: {
            user_id: req.session.user_id,
          },
      });

      const userPosts = postsData.map((post) => post.get({ plain: true }));

      res.render('dashboard', {
        userPosts,
        logged_in: req.session.logged_in,
        dash: true
      })
  } catch (err) {
      console.log(err);
  }
});


router.get('/new', withAuth, async (req, res)=>{
    res.render('newPost', {
        logged_in: req.session.logged_in,
        dash: true
    })
})

router.get('/editpost/:id', withAuth, async (req, res)=>{
  try {
    const postData = await Posts.findByPk(req.params.id);

    const post= postData.get({ plain: true });
    res.render("editPost", {
      ...post,
      logged_in: req.session.logged_in,
      dash: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

module.exports = router;
