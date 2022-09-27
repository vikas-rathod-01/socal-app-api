const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      minlength: 6,
      trim: true,
      required: true,
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    posts: [ 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    active: {
      type: Boolean,
      default: false,
    },

    jwtToken: [String],

  },
  { versionKey: false, timestamps: true }
);

/* Middleware */
userSchema.pre("save", async function (next) {
  let user = this;
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_WORK_FACTOR));
    const newPasswordHash = await bcrypt.hash(user.password, salt);
    user.password = newPasswordHash;
    return next();
  }
  return next();
});

module.exports = mongoose.model("User", userSchema);
