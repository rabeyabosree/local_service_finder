const mongoose = require("mongoose");


const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    },

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    text: String,

    messageType: {
        type: String,
        enum: ["text", "image", "file"],
        default: "text"
    },

    status: {
        type: String,
        enum: ["sent", "delivered", "seen"],
        default: "sent"
    },
    image: {
        type: String,
        default: ""
    },
    seen: {
        type: Boolean,
        default: false
    },

    deliveredAt: Date,
    seenAt: Date
}, { timestamps: true });


module.exports = mongoose.model("message", messageSchema);