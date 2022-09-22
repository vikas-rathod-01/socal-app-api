const Post = require("../../models/Post");
const User = require("../../models/User");
/* Like/Unlike Post */
module.exports = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(403).json({ message: "Unauthorized" });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post Not found" });

    /* Unlike Post */
    if (post.likes.includes(req.userId)) {
      let index = post.likes.indexOf(req.userId);

      post.likes.splice(index, 1);
      await post.save();

      return res.status(200).json({ message: "Post Unliked" });
    } else {
      /* Like Post */
      post.likes.push(req.userId);
      await post.save();

      return res.status(200).json({ message: "Post Liked" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
