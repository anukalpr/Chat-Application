const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const connection = require("./DataBase/DB");
const cors = require("cors");
const contact = require("./controllers/Message");
const user = require("./controllers/User");
const cookieParser = require("cookie-parser");
const path=require("path");

const port = 3000;
const app = express();
const _dirname=path.resolve();

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", credentials: true }
});

app.set("io", io);

const onlineUsers = new Map();

io.on("connection", (socket) => {
  const { userId } = socket.handshake.query || {};
  if (userId) {
    onlineUsers.set(userId, socket.id);
    io.emit("presence:online", { userId, status: "online" });
  }

  socket.on("typing", ({ to }) => {
    const toSocket = onlineUsers.get(to);
    if (toSocket) io.to(toSocket).emit("typing", { from: userId });
  });

  socket.on("disconnect", () => {
    if (userId) {
      onlineUsers.delete(userId);
      io.emit("presence:online", { userId, status: "offline" });
    }
  });
});

app.use(
  cors({
    origin: "https://chatify-apo8.onrender.com",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// DB
connection();

// APIs
app.use("/api", contact);
app.use("/api", user);



app.use(express.static(path.join(_dirname,"/client/dist")))
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(_dirname,"client","dist","index.html"))
});

// Start
server.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
