const router = require('express').Router();
const {Comments} = require("../../models");
const withAuth = require("../../utils/auth")

router.post("/", withAuth, async (req, res) => {
    try {
      const addComment = await Comments.create({
        ...req.body,
        user_id: req.session.user_id,
      });
      res.status(200).json(addComment);
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  });

module.exports = router;