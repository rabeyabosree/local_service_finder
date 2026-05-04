const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        providerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true,
        },
        serviceName: {
            type: String,
            required: true,
        },
        serviceType: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        deliveryLocation: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            enum: ["pending", "confirmed", "completed", "cancelled"],
            default: "pending",
        },
        notes: {
            type: String,
            default: "",
            trim: true,
        },
    },
    { timestamps: true } // createdAt, updatedAt auto add হবে
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking
