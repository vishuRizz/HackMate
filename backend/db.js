const mongoose = require("mongoose");
require("dotenv").config(); 

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      bio: { type: String, default: "" },
      skills: { type: [String], default: [] },
      college: { type: String, default: "" },
      socialLinks: {
        github: { type: String, default: "" },
        instagram: { type: String, default: "" },
        linkedin: { type: String, default: "" },
        portfolio: { type: String, default: "" },
      },
      avatar: { type: String, default: "" }, 
    },
    projects: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
        image: { type: String, default: "" },
        techStack: { type: [String], default: [] },
      },
    ],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  },
  { timestamps: true }
);

const postSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    tags: { type: [String], default: [] },
    lookingFor: { type: String, default: "" },
    comments: [
      {
        commentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);

module.exports = { User, Post };
