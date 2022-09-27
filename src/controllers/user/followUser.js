const User = require("../../models/User");

module.exports = async (req, res) => {
  try {
    const loggedInUser = await User.findById(req.userId);
    // console.log("loged in user"+loggedInUser)

    if (!loggedInUser) return res.status(401).json({ message: "Unauthorized" });

    const userToFollow = await User.findById(req.params.id);
    // console.log( "folllowing to "+userToFollow)
    

      
if (loggedInUser.following.includes(req.params.id)) {
  let index = loggedInUser.following.indexOf(req.params.id);

  loggedInUser.following.splice(index, 1);
  await loggedInUser.save();

  userToFollow.followers.splice(index, 1);
  await userToFollow.save();

  return res.status(200).json({ message: "Unfollowed" });
} else {
  /* Like Post */
  loggedInUser.following.push(req.params.id);
  userToFollow.followers.push(req.userId)
  await loggedInUser.save();
  await userToFollow.save();

  return res.status(200).json({ message: "followed" });
}



   
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

