let onlineUsers = {};

const initSocket = (io) => {
    global.io = io;
    global.onlineUsers = onlineUsers;

    io.on("connection", (socket) => {
        console.log("connected:", socket.id);

        // JOIN USER
        socket.on("join", (userId) => {
            onlineUsers[userId] = socket.id;

            io.emit("getOnlineUsers", Object.keys(onlineUsers));
        });

        socket.on("join", (userId) => {
            console.log("👤 JOIN EVENT:", userId);

            onlineUsers[userId] = socket.id;

            console.log("🌐 ONLINE USERS:", onlineUsers);

            io.emit("getOnlineUsers", Object.keys(onlineUsers));
        });

        // TEXT + IMAGE MESSAGE (fallback support)
        socket.on("sendMessage", (data) => {
            const receiverSocket = onlineUsers[data.receiverId];

            if (receiverSocket) {
                io.to(receiverSocket).emit("receiveMessage", data);
            }

            // sender sync (optional but recommended)
            const senderSocket = onlineUsers[data.senderId];

            if (senderSocket) {
                io.to(senderSocket).emit("receiveMessage", data);
            }
        });

        // SEEN
        socket.on("seenMessage", ({ senderId, conversationId }) => {
            const senderSocket = onlineUsers[senderId];

            if (senderSocket) {
                io.to(senderSocket).emit("messageSeen", { conversationId });
            }
        });

        // DISCONNECT
        socket.on("disconnect", () => {
            for (let userId in onlineUsers) {
                if (onlineUsers[userId] === socket.id) {
                    delete onlineUsers[userId];
                    break;
                }
            }

            io.emit("getOnlineUsers", Object.keys(onlineUsers));
        });
    });
};

module.exports = initSocket;