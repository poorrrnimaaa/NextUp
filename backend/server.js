const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const tokenRoutes = require("./routes/tokenRoutes");
const authRoutes = require("./routes/auth");
const connectDB = require("./config/db");

const app = express();

// connect database
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/tokens", tokenRoutes);
app.use("/api/auth", authRoutes);

// create server
const server = http.createServer(app);

// socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// socket connection
io.on("connection", (socket) => {
  console.log("Client connected");
});

// make io available in routes
app.set("io", io);

// start server
server.listen(5000, () => {
  console.log("Server running on port 5000");
});