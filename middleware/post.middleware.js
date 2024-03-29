const { Post } = require("../models");

const postMiddleware = async (req, res, next) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (post) {
      req.post = post;
      next();
    } else {
      return res.status(404).json({
        ok: false,
        message: "Post not found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Internal server error with fetching post",
    });
  }
};

module.exports = postMiddleware;
