const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    lastMessage: {
        type: String,
        default: ""
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("conversation", conversationSchema)