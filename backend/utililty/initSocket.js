let onlineUsers = {};

const initSocket = (io) => {
    global.onlineUsers = onlineUsers;
    global.io = io;

    io.on("connection", (socket) => {

        // join user
        socket.on("join", (userId) => {
            if (!userId) return;

            onlineUsers[userId] = socket.id;
            io.emit("getOnlineUsers", Object.keys(onlineUsers));
        });

        // send message text and image
        socket.on("sendMessage", (data) => {

            const receiverSocket = onlineUsers[data.receiverId];
            if (receiverSocket) {
                io.to(receiverSocket).emit("receiveMessage", data);
            }

            // sender sync
            const senderSocket = onlineUsers[data.senderId];
            if (senderSocket) {
                io.to(senderSocket).emit("receiveMessage", data);
            }
        });

        // seen message
        socket.on("seenMessage", ({ senderId, conversationId }) => {

            const senderSocket = onlineUsers[senderId];
            if (senderSocket) {
                io.to(senderSocket).emit("messageSeen", {
                    conversationId,
                });
            }
        });

        // disconnect
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