const Post = require("../../models/Post");
const User = require("../../models/User");

/* Create Post */
module.exports = async (req, res) => {
  try {
    const { caption, image } = req.body;
    const user = await User.findById(req.userId);

    if (!user) return res.status(403).json({ message: "Unauthorized" });

    const newPostData = await new Post({
      caption: caption,
      image: {
        public_id: image.public_id,
        url: image.url,
      },
      owner: req.userId,
    });

    const post = await newPostData.save();

    if (!post._id) {
      return res.status(400).json({ message: "Failed to Create Post" });
    }

    user.posts.push(post._id);
    await user.save();

    return res.status(201).json({ message: "New Post added", id: post._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Opps, Something went wrong. Please try again later",
    });
  }
};
