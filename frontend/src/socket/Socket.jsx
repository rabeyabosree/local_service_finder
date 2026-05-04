// import { io } from "socket.io-client";

// const socket = io("http://localhost:5000", {
//   autoConnect: false,
// });

// const socketService = {
//   connect: (userId) => {
//     if (!socket.connected) {
//       socket.connect();
//     }

//     socket.emit("join", userId);
//   },

//   disconnect: () => {
//     if (socket.connected) {
//       socket.disconnect();
//     }
//   },

//   sendMessage: (data) => {
//     socket.emit("sendMessage", data);
//   },

//   sendSeen: (data) => {
//     socket.emit("seenMessage", data);
//   },

//   onReceiveMessage: (callback) => {
//     socket.off("receiveMessage");
//     socket.on("receiveMessage", callback);
//   },

//   offReceiveMessage: () => {
//     socket.off("receiveMessage");
//   },

//   onSeen: (callback) => {
//     socket.off("messageSeen");
//     socket.on("messageSeen", callback);
//   },

//   offSeen: () => {
//     socket.off("messageSeen");
//   },

//   onOnlineUsers: (callback) => {
//     socket.off("getOnlineUsers");
//     socket.on("getOnlineUsers", callback);
//   },

//   offOnlineUsers: () => {
//     socket.off("getOnlineUsers");
//   },
// };

// export default socketService;


import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: false,
});

const socketService = {
  connect: (userId) => {
    console.log("🔌 CONNECT CALLED:", userId);

    if (!socket.connected) {
      socket.connect();
    }

    console.log("📤 EMIT JOIN:", userId);
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
    socket.off("receiveMessage");
    socket.on("receiveMessage", cb);
  },

  offReceiveMessage: () => {
    socket.off("receiveMessage");
  },

  onOnlineUsers: (cb) => {
    socket.off("getOnlineUsers");
    socket.on("getOnlineUsers", cb);
  },
};

export default socketService;