
const express = require("express");
const userRouter = require("./user");
const postRouter = require("./post");
const router = express.Router();

router.use("/post", postRouter);
router.use("/user", userRouter);

module.exports = router;
