const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User } = require("../models/db");
const { upload } = require("../couldinary");
const { authenticateToken } = require("../middlewares/middleware");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email, and password are required." });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      "chudai",
      { expiresIn: "7d" }
    );

    res.status(201).json({ message: "User registered successfully.", token } );
  } catch (err) {
    res.status(500).json({ message: "Error registering user.", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      "chudai",
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful.", token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in.", error: err.message });
  }
});

router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id)
      .select("-password")
      .populate("followers", "name email profile.avatar")
      .populate("following", "name email profile.avatar");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user profile.", error: err.message });
  }
});

router.post("/follow/:userId", authenticateToken, async (req, res) => {
  const { userId } = req.params;
  const currentUserId = req.user.id;

  if (currentUserId === userId) {
    return res.status(400).json({ message: "You cannot follow yourself." });
  }

  try {
    const targetUser = await User.findById(userId);
    const currentUser = await User.findById(currentUserId);

    if (!targetUser) {
      return res.status(404).json({ message: "User to follow not found." });
    }

    const isFollowing = currentUser.following.includes(userId);

    if (isFollowing) {
      currentUser.following = currentUser.following.filter((id) => id.toString() !== userId);
      targetUser.followers = targetUser.followers.filter((id) => id.toString() !== currentUserId);
    } else {
      currentUser.following.push(userId);
      targetUser.followers.push(currentUserId);
    }

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({
      message: isFollowing ? "Unfollowed user successfully." : "Followed user successfully.",
      followersCount: targetUser.followers.length,
      followingCount: currentUser.following.length,
    });
  } catch (err) {
    res.status(500).json({ message: "Error following/unfollowing user.", error: err.message });
  }
});

router.put("/profile", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { bio, skills, college, socialLinks } = req.body;

  try {
    const updatedProfile = await User.findByIdAndUpdate(
      userId,
      {
        "profile.bio": bio,
        "profile.skills": skills,
        "profile.college": college,
        "profile.socialLinks": socialLinks,
      },
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "Profile updated successfully.", updatedProfile });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile.", error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users.", error: err.message });
  }
});

router.post(
  "/upload-avatar",
  authenticateToken,
  upload.single("avatar"),
  async (req, res) => {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided." });
    }

    try {
      const avatarUrl = req.file.path;

      await User.findByIdAndUpdate(userId, { "profile.avatar": avatarUrl });

      res.status(200).json({ message: "Avatar uploaded successfully.", avatarUrl });
    } catch (err) {
      res.status(500).json({ message: "Error uploading avatar.", error: err.message });
    }
  }
);

module.exports = router;
