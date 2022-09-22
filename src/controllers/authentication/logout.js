const User = require("../../models/User");
/* Logout user*/
module.exports = async (req, res) => {
  try {
    let user = await User.findById(req.userId);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    if (user.active === false) {
      return res.status(400).json({ message: "User already Logged out.." });
    }

    user.active = false;
    await user.save();

    return res.status(201).json({
      message: "Logout successfully",
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
