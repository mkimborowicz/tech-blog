const router = require('express').Router();
const { Posts } = require('../../models');
const withAuth = require('../../utils/auth');

// new post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Posts.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// edit post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatePost = await Posts.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(updatePost);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// delete post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const deletePost = await Posts.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deletePost);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;