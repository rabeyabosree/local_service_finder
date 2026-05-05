const express = require("express");
const router = express.Router();
const Message = require("../models/messageModel");
const upload = require("../utililty/multer");
const multer = require("multer");
const Conversation = require("../models/conversation");

// send message
router.post("/send", async (req, res) => {
    try {
        const { conversationId, senderId, receiverId, text } = req.body;

        if (!conversationId || !senderId) {
            return res.status(400).json({
                success: false,
                message: "conversationId and senderId is required",
            });
        }

        // create message
        const message = await Message.create({
            conversationId,
            senderId,
            receiverId,
            text,
        });

        // update conversation
        await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: message._id,
            updatedAt: new Date(),
        });

        res.status(201).json({
            success: true,
            message,
        });

    } catch (error) {
        console.error("Message error:", error);
        res.status(500).json({
            message: "Failed to send message",
        });
    }
});

// image send
router.post("/image", upload.single("image"), async (req, res) => {
    try {
        const { senderId, receiverId, conversationId } = req.body;

        const image = req.file?.path;

        const message = await Message.create({
            conversationId,
            senderId,
            receiverId,
            messageType: "image",
            image,
            text: "",
            seen: false,
            createdAt: new Date(),
        });

        await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: message._id,
            updatedAt: new Date(),
        });

        // REALTIME SOCKET EMIT
        const io = global.io;
        const onlineUsers = global.onlineUsers;

        const receiverSocket = onlineUsers?.[receiverId];

        if (receiverSocket) {
            io.to(receiverSocket).emit("receiveMessage", message);
        }

        const senderSocket = onlineUsers?.[senderId];

        if (senderSocket) {
            io.to(senderSocket).emit("receiveMessage", message);
        }

        res.status(201).json({
            success: true,
            data: message,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed" });
    }
});

// get all messages
router.get("/:coversationId", async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.coversationId
        }).sort({ createdAt: 1 })

        res.status(201).json({
            success: true,
            message: "all messages fetched successfully",
            messages: messages
        })
    } catch (error) {
        console.error("Customer bookings fetch error:", error);
        res.status(500).json({ message: "Failed to fetch messages" });

    }
});

// seen message
router.put("/seen", async (req, res) => {
    try {
        const { conversationId, userId } = req.body;

        await Message.updateMany({
            conversationId,
            senderId: { $ne: userId },
            seen: false
        }, {
            $set: { seen: true }
        })
        res.status(200).json({
            success: true,
            message: "Messages Marked as seen"
        })
    } catch (error) {
        console.error("Customer bookings fetch error:", error);
        res.status(500).json({ message: "Failed to fetch customer bookings" });
    }
});

// delete messsage
router.delete("/:id", async (req, res) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);

        if (!message) {
            return res.status(404).json({
                success: true,
                message: "message not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "message deleted successfully"
        })
    } catch (error) {

    }
})


module.exports = router;