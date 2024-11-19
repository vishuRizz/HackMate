const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("./models");
const { authenticateToken } = require("../middleware");
require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required." });
  }

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
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

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Login successful.", token });
  } catch (err) {
    res.status(500).json({ message: "Error logging in.", error: err.message });
  }
});

router.get("/profile/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password"); 
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user profile.", error: err.message });
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

module.exports = router;
