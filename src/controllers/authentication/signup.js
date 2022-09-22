const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
/* SignUp */
module.exports = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email: email })) {
      return res.status(400).json({
        message: "User Already Exist. Please Login",
      });
    }

    const newUser = await new User({
      name ,
      email,
      password,
    });

    const user = await newUser.save();
    /* Generate Token */
    const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXP,
    });

    await user.jwtToken.push(token);
    user.active = true;
    await user.save();

    if (user._id) {
      return res.status(201).json({
        message: `Account created for ${user.email}`,
        token: token,
      });
    }
    return res.status(500).json({ error: "Failed to Create Account" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Oops, Something went wrong. please try again",
    });
  }
};
