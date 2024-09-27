const express = require("express");
const upload = require("../middlewares/multerMiddleware");
const route = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");


route.get('/blogs',postController.getAllPosts);
route.post("/", authMiddleware, upload.single("image"), postController.addPost);
route.get("/", authMiddleware, postController.getMyPost);
route.delete("/:id", authMiddleware, postController.deletePost);
route.get("/:id", authMiddleware, postController.getPostById);
route.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  postController.updatePost
);
route.get("/blog/:id", authMiddleware, postController.getBlogDetails);

module.exports = route;
