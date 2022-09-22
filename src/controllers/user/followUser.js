const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    const loggedInUser = await User.findById(req.userId);
    if (!loggedInUser) return res.status(401).json({ message: "Unauthorized" });

    const userToFollow = await User.findById(req.params.id);
    if (!userToFollow)
      return res.status(400).json({ message: "User not found" });

    loggedInUser.following.push(userToFollow._id);
    userToFollow.followers.push(loggedInUser._id);

    await loggedInUser.save();
    await userToFollow.save();
    return res.status(200).json({ message: "Followed" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
