const express = require("express");
const router = express.Router();
const { upload } = require("../couldinary");
const { User } = require("../models/db");
const { Post } = require("../models/db");
const { authenticateToken } = require("../middlewares/middleware");
const {authenticateFirebaseToken} = require("../middlewares/authenticateFirebaseToken")

router.post("/", authenticateFirebaseToken, upload.single("image"), async (req, res) => {
  const { content, tags, lookingFor } = req.body;
  const firebaseUid = req.user.id; 

  if (!content) {
    return res.status(400).json({ message: "Post content is required." });
  }

  try {
    // Step 1: Find the User ObjectId using the Firebase UID
    const user = await User.findOne({ firebaseUid });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const authorId = user._id;

    // Step 2: Create the Post
    const imageUrl = req.file ? req.file.path : null;

    const newPost = new Post({
      authorId, // Use ObjectId from the User collection
      content,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      lookingFor,
      image: imageUrl,
    });

    // Save the new Post
    await newPost.save();

    // Step 3: Update the User's posts array
    await User.findByIdAndUpdate(authorId, { $push: { posts: newPost._id } });

    res.status(201).json({
      message: "Post created successfully.",
      post: newPost,
    });
  } catch (err) {
    console.error("Error creating post:", err.message);
    res.status(500).json({
      message: "Error creating post.",
      error: err.message,
    });
  }
});



router.get("/", async (req, res) => {
  const { page = 1, limit = 30 } = req.query;

  try {
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("authorId", "name email profile.avatar profile.bio profile.college")
      .populate({
        path: "comments.authorId",
        select: "name email profile.avatar ",
      });

    const formattedPosts = posts.map((post) => ({
      ...post.toObject(),
      likesCount: post.likes.length,
      comments: post.comments,
      image: post.image,
    }));

    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      posts: formattedPosts,
      totalPages,
      currentPage: parseInt(page),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching posts.", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id)
      .populate("authorId", "name email profile.avatar profile.bio profile.college")
      .populate({
        path: "comments.authorId",
        select: "name email profile.avatar ",
      });

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const formattedPost = {
      ...post.toObject(),
      likesCount: post.likes.length,
    };

    res.status(200).json(formattedPost);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching post.", error: err.message });
  }
});

router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const skip = (page - 1) * limit;

    const userPosts = await Post.find({ authorId: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate("authorId", "name email profile.avatar");
    const totalPosts = await Post.countDocuments({ authorId: userId });
    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      posts: userPosts,
      totalPosts,
      totalPages,
      currentPage: parseInt(page),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user's posts.", error: err.message });
  }
});

router.post(
  "/image",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    const { content, tags, lookingFor } = req.body;
    const authorId = req.user.id;

    if (!content || !req.file) {
      return res
        .status(400)
        .json({ message: "Post content and image are required." });
    }

    try {
      const imageUrl = req.file.path;
      const newPost = new Post({
        authorId,
        content,
        tags,
        lookingFor,
        image: imageUrl,
      });
      await newPost.save();

      await User.findByIdAndUpdate(authorId, { $push: { posts: newPost._id } });

      res.status(201).json({
        message: "Post with image created successfully.",
        post: newPost,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error creating post with image.",
        error: err.message,
      });
    }
  }
);

router.post("/comment/:id", authenticateFirebaseToken, async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const firebaseUid = req.user.id;

  if (!text) {
    return res.status(400).json({ message: "Comment text is required." });
  }

  try {
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: "User not found."
       });
    }

    const authorId = user._id.toString();
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const newComment = { authorId, text };
    post.comments.push(newComment);
    await post.save();

    res.status(201).json({ message: "Comment added successfully.", post });
  } catch (err) {
    res.status(500).json({ message: "Error adding comment.", error: err.message });
  }
});

router.post("/like/:id", authenticateFirebaseToken, async (req, res) => {
  const { id } = req.params;
  const firebaseUid = req.user.id;

  try {
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const index = post.likes.indexOf(user._id.toString());
    if (index === -1) {
      post.likes.push(user._id); 
    } else {
      post.likes.splice(index, 1); 
    }

    await post.save();

    res.status(200).json({ post });
  } catch (err) {
    res.status(500).json({ message: "Error updating likes.", error: err.message });
  }
});


module.exports = router;
