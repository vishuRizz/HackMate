const express = require("express");
const userRouter = require("./user");
const postRouter = require("./post");
const hackRouter =  require("./hackathon");
const chatRouter = require("./chatRoutes");
const router = express.Router();
const teamRouter = require("./teamRoutes");

router.use("/post", postRouter);
router.use("/user", userRouter);
router.use("/hackathon", hackRouter);
router.use("/convo", chatRouter)
router.use("/team", teamRouter)

module.exports = router;
