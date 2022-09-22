const User = require("../../models/User");
const bcrypt = require("bcrypt");
/* change Password */
module.exports = async (req, res) => {
  try {
    let { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "current password and new password required",
      });
    }

    let user = await User.findById(req.userId).select("+password");
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const matchPassword = await bcrypt.compare(currentPassword, user.password);

    if (!matchPassword) {
      return res.status(400).json({ error: "Incorrect Current Password" });
    }

    if (currentPassword === newPassword) {
      return res
        .status(400)
        .json({ message: "New password can't be same as current password" });
    }

    /* Storing new password */
    user.password = newPassword;
    await user.save();
    return res.status(200).json({ message: "Password Changed Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Oops, Something went wrong. please try again later",
    });
  }
};
