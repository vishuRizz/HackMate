const express = require("express");
const cors = require("cors");
const http = require("http"); 
const { Server } = require("socket.io"); 
const rootRouter = require("./routes/index");
const ChatMessage = require("./models/ChatMessage"); 
const Conversation = require("./models/Conversation");

const app = express();
const server = http.createServer(app); 
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});

app.use(cors({
  origin: "*", 
  methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],  
  credentials: false,
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Deployment working perfectly, yaaayyyy",
  });
});

app.use("/api/v1", rootRouter);

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("joinRoom", (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room.`);
  });

  socket.on("sendMessage", async (data) => {
    const { senderId, receiverId, message } = data;

    // Save the message to the database
    const chatMessage = new ChatMessage({
      senderId,
      receiverId,
      message,
    });
    await chatMessage.save();

    // this will Update or create a conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
        lastMessage: message,
        lastMessageTime: Date.now(),
      });
    } else {
      conversation.lastMessage = message;
      conversation.lastMessageTime = Date.now();
    }
    await conversation.save();

    io.to(receiverId).emit("receiveMessage", chatMessage);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
