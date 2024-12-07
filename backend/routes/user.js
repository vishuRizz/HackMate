const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { User: HackMateUser } = require("../models/db"); // HackMate User Model
const { upload } = require("../couldinary");
const { authenticateToken } = require("../middlewares/middleware");
const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const axios = require("axios");

const router = express.Router();

// Firebase Admin SDK setup
const firebaseAdminConfig = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};
initializeApp({ credential: cert(firebaseAdminConfig) });


// Login or Register based on Firebase Token
router.post("/auth", async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: "Firebase token is required." });
  }

  try {
    // Step 1: Verify Firebase token and extract UID
    const decodedToken = await getAuth().verifyIdToken(token);
    const { uid: firebaseUid, name, email } = decodedToken;

    // Step 2: Synchronize with Main User Database
    const mainUserResponse = await axios.post(`${process.env.MAIN_USER_API_URL}/api/user/sync`, {
      firebaseUid,
      email,
      name,
    });
    const mainUserData = mainUserResponse.data.user;

    // Step 3: Check or create HackMate user entry
    let hackMateUser = await HackMateUser.findOne({ firebaseUid });

    if (!hackMateUser) {
      hackMateUser = new HackMateUser({
        firebaseUid,
        profile: {
          bio: "",
          skills: [],
          college: "",
          socialLinks: {
            github: "",
            instagram: "",
            linkedin: "",
            portfolio: "",
          },
          avatar: "",
        },
        projects: [],
        posts: [],
        followers: [],
        following: [],
      });
      await hackMateUser.save();
    }

    // Step 4: Respond with combined user data
    res.status(200).json({
      message: "Authentication successful.",
      mainUser: mainUserData,
      hackMateUser,
    });
  } catch (error) {
    console.error("Error during login process:", error.message);
    res.status(500).json({ message: "Error authenticating user.", error: error.message });
  }
});


router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await HackMateUser.findById(id)
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
    const updatedProfile = await HackMateUser.findByIdAndUpdate(
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
    const users = await HackMateUser.find().select("-password");
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

      await HackMateUser.findByIdAndUpdate(userId, { "profile.avatar": avatarUrl });

      res.status(200).json({ message: "Avatar uploaded successfully.", avatarUrl });
    } catch (err) {
      res.status(500).json({ message: "Error uploading avatar.", error: err.message });
    }
  }
);

module.exports = router;
