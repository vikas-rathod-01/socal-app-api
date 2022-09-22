const router = require("express").Router();

/* Controllers */
const createPost = require("../controllers/post/createPost");
const likeUnlikePost = require("../controllers/post/likeUnlikePost");
const deletePost = require("../controllers/post/deletePost");

/* Middlewares */
const isAuthenticated = require("../middlewares/isAuthenticated");

/* Routes */
router.route("/add").post(isAuthenticated, createPost);
router.route("/:id").get(isAuthenticated, likeUnlikePost);
router.route("/:id").delete(isAuthenticated, deletePost);

module.exports = router;
