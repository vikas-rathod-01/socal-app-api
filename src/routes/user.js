const router = require("express").Router();

/* Controllers */
const updateUser = require("../controllers/user/updateUser");
const followUser = require("../controllers/user/followUser");
/* Middleware */
const isAuthenticated = require("../middlewares/isAuthenticated");

/* Routes */
router.put("/:id", isAuthenticated, updateUser);
router.get("/follow/:id", isAuthenticated, followUser);

module.exports = router;
