const mongoose = require("mongoose");
require("dotenv").config();
const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(
    mongoUri,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("haha, connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

  const userSchema = new mongoose.Schema(
    {
      firebaseUid: {
        type: String,
        required: true,
        unique: true,
      },
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, unique: true },
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
      hostedHackathons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" }], // For hackathons hosted by the user
      registeredHackathons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hackathon" }], // For hackathons registered by the user
      projects: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          image: { type: String, default: "" },
          techStack: { type: [String], default: [] },
        },
      ],
      posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
      followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      isAdmin: { type: Boolean, default: false },
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
    image: {
      type: String,
      default: "",
      },
    tags: { type: [String], default: [] },
    lookingFor: { type: String, default: "" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        replies: [
          {
            authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            text: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const hackathonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: String, required: true },
    location: { type: String, required: true },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    websiteLink: { type: String, default: "" },
    rules: { type: String, default: "" },
    prizes: { type: String, default: "" },
    tracks: { type: [String], default: [] }, // e.g., AI, Web Dev, etc.
    maxTeamSize: { type: Number, default: 1 },
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    ],
    stats: {
      totalRegistrations: { type: Number, default: 0 },
      totalTeams: { type: Number, default: 0 },
    },
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);


const teamSchema = new mongoose.Schema(
  {
    teamName: { type: String, required: true },
    leader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ], // Includes leader
    hackathonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hackathon",
      required: true,
    },
    isRegistered: { type: Boolean, default: false },
    invitations: [
      {
        invitedUser: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        invitedUserFirebaseId: { type: String },
        status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" },
      },
    ],
  },
  { timestamps: true }
);


const ChatMessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["sent", "delivered", "seen"],
    default: "sent",
  },
});

const ConversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  ],
  lastMessage: {
    type: String,
    default: "",
  },
  lastMessageTime: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);
const Post = mongoose.model("Post", postSchema);
const Hackathon = mongoose.model("Hackathon", hackathonSchema);
const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);
const Conversation = mongoose.model("Conversation", ConversationSchema);
const Team = mongoose.model("Team", teamSchema); 

module.exports = { User, Post, Hackathon, Team, ChatMessage, Conversation };
