const express = require("express");
const router = express.Router();
const passport = require("passport");

//middlewares

const {
  postMiddleware,
  commentMiddleware,
  likeMiddleware,
  requestMiddleware,
} = require("../middleware");

//controller

const {
  userController,
  friendController,
  likesAndCommentsController,
  postController,
} = require("../controllers");

//User routes

router.post("/users/signin", userController.signinUser);
router.post("/users/signup", userController.signupUser);
router.post("/users/password", userController.changePassword);
router.put(
  "/users/edit",
  passport.authenticate("jwt", { session: false }),
  userController.editUser
);

//Post Routes

router.get(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  postController.getFeedPosts
);

router.get(
  "/posts/user-posts",
  passport.authenticate("jwt", { session: false }),
  postController.getUserPosts
);

router.post(
  "/posts",
  passport.authenticate("jwt", { session: false }),
  postController.createPost
);

router.delete(
  "/posts/:postId",
  passport.authenticate("jwt", { session: false }),
  postMiddleware,
  postController.deletePost
);

router.put(
  "/posts/:postId",
  passport.authenticate("jwt", { session: false }),
  postMiddleware,
  postController.editPost
);

router.get(
  "/posts/:userId",
  passport.authenticate("jwt", { session: false }),
  postController.getLoadedUserPosts
);

//Friend Routes

router.get(
  "/friends/requests",
  passport.authenticate("jwt", { session: false }),
  friendController.getUserRequests
);

router.get(
  "/friends/top-users",
  passport.authenticate("jwt", { session: false }),
  friendController.getTopUsers
);

router.post(
  "/friends/send-request",
  passport.authenticate("jwt", { session: false }),
  friendController.sendFriendRequest
);

router.put(
  "/friends/:requestId",
  passport.authenticate("jwt", { session: false }),
  requestMiddleware,
  friendController.acceptFriendRequest
);

router.delete(
  "/friends/:requestId",
  passport.authenticate("jwt", { session: false }),
  requestMiddleware,
  friendController.deleteFriendRequest
);

router.get(
  "/friends",
  passport.authenticate("jwt", { session: false }),
  friendController.getUserFriends
);

router.delete(
  "/friends/unlink/:userId",
  passport.authenticate("jwt", { session: false }),
  friendController.unlinkUser
);

router.get(
  "/friends/:userId",
  passport.authenticate("jwt", { session: false }),
  friendController.getUser
);

router.get(
  "/friends/search/:userToSearch",
  passport.authenticate("jwt", { session: false }),
  friendController.searchUser
);

// Likes Routes

router.put(
  "/likes/:postId",
  passport.authenticate("jwt", { session: false }),
  postMiddleware,
  likesAndCommentsController.addLike
);

router.delete(
  "/likes/:likeId",
  passport.authenticate("jwt", { session: false }),
  likeMiddleware,
  likesAndCommentsController.removeLike
);

//Comment Routes

router.post(
  "/comments/:postId",
  passport.authenticate("jwt", { session: false }),
  postMiddleware,
  likesAndCommentsController.addComment
);

router.put(
  "/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  commentMiddleware,
  likesAndCommentsController.editComment
);

router.delete(
  "/comments/:commentId",
  passport.authenticate("jwt", { session: false }),
  commentMiddleware,
  likesAndCommentsController.removeComment
);

module.exports = router;
