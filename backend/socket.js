const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/caption.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
  });

  io.on("connection", (socket) => {
    console.log("client connected :", socket.id);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(` User ${userId} joined as ${userType}`);
      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
        console.log("added socket user id");
      } else if (userType === "captain") {
        await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
        console.log("added socket captain id");
      }
    });
    socket.on("updateCaptainLocation", async (data) => {
      const { userId, location } = data;
      if (!location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location" });
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log("client disconnected :", socket.id);
    });
  });
}

function sendMessageToSocketId(socketId, messageObj) {
  console.log("messageObj", messageObj);
  if (io) {
    io.to(socketId).emit(messageObj.event, messageObj.data);
  } else {
    console.log("socket.io not initialized");
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
