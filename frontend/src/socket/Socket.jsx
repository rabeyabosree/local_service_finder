import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: false,
});

const socketService = {
  connect: (userId) => {
    if (!socket.connected) socket.connect();

    socket.emit("join", userId);
  },

  disconnect: () => {
    socket.disconnect();
  },

  sendMessage: (data) => {
    socket.emit("sendMessage", data);
  },

  sendSeen: (data) => {
    socket.emit("seenMessage", data);
  },

  onReceiveMessage: (cb) => {
    socket.on("receiveMessage", cb);
  },

  offReceiveMessage: () => {
    socket.off("receiveMessage");
  },

  onOnlineUsers: (cb) => {
    socket.on("getOnlineUsers", cb);
  },

  onSeen: (cb) => {
    socket.on("messageSeen", cb);
  },
  offOnlineUsers: () => {
    socket.off("getOnlineUsers");
  },

  offSeen: () => {
    socket.off("messageSeen");
  },
};

export default socketService;