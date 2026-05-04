const express = require("express");
const router = express.Router();
const Conversation = require("../models/conversation")

// create conversation
router.post("/create", async (req, res) => {
    try {
        //
        const { customerId, providerId } = req.body;
        if (!customerId || !providerId) {
            return res.status(400).json({
                success: false,
                message: "customerId and providerId required"
            })
        }

        //
        let conversation = await Conversation.findOne({
            members: {
                $all: [customerId, providerId]
            }
        });

        //
        if (!conversation) {
            conversation = await Conversation.create({
                members: [customerId, providerId],
                lastMessage: ""
            })
        }

        //
        res.status(200).json({
            success: true,
            message: "Conversation created successfully",
            conversation: conversation
        })

    } catch (error) {
        console.error("Customer bookings fetch error:", error);

        res.status(500).json({
            message: "Failed to fetch customer bookings"
        })
    }
});

// get conversation
router.get("/:userId", async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: {
                $in: [req.params.userId]
            }
        }).populate("members", "name avatar role");

        res.status(200).json({
            success: true,
            message: "Conversation fethced successfully",
            conversations: conversations
        })

    } catch (error) {
        console.error("Customer bookings fetch error:", error);
        res.status(500).json({ message: "Failed to fetch customer bookings" });

    }
});


module.exports = router;