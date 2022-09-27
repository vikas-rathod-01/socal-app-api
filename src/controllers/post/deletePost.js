const Post = require("../../models/Post");
const User = require("../../models/User");
/* Delete post */
module.exports = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "Unauthorized" });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post Not found" });

    if (post.owner.toString() !== req.userId.toString()) {
      return res.status(401).json({ message: "Unauthorized" });
    }

 
    await post.remove();

 
    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index, 1);
    await user.save();

    return res.status(200).json({ message: "Post Deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
