const express = require("express")
const Booking = require("../models/bookingModel");
const authMiddleware = require("../middleware/authMiddleware");
const User = require('../models/authModels')
const Service = require("../models/serviceModel")
const router = express.Router()


// Create booking
router.post("/book", async (req, res) => {
  try {
    const {
      userId,
      serviceId,
      serviceName,
      serviceType,
      price,
      deliveryLocation,
      paymentMethod,
      transactionId, // advanced payment এর জন্য
    } = req.body;

    // Basic validation
    if (!userId || !serviceId || !deliveryLocation || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Default booking state
    let status = "pending"; // service progress: pending -> accepted -> completed
    let paid = false;

    // Payment logic
    if (paymentMethod === "advanced") {
      if (!transactionId) {
        return res.status(400).json({ message: "Transaction ID required for advanced payment" });
      }
      paid = true; // online payment successful
    }

    // Cash on delivery: paid = false, status remains pending
    const newBooking = new Booking({
      userId,
      serviceId,
      serviceName,
      serviceType,
      price,
      deliveryLocation,
      paymentMethod,
      transactionId: transactionId || null,
      status,
      paid,
    });

    await newBooking.save();

    res.status(201).json({
      message: "Service booked successfully",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Booking Error:", error);
    res.status(500).json({ message: "Failed to book service" });
  }
});


// Get all bookings (for customer: own bookings, for provider: bookings of their services)
router.get("/bookings", authMiddleware, async (req, res) => {
  try {
    const { role, id: userId } = req.user;
    let filter = {};

    if (role === "customer") {
      filter.userId = userId;
    } else if (role === "provider") {
      filter.providerId = userId;
    } else if (role === "admin") {
      filter = {}; // Admin সব বুকিং পাবে
    }

    const bookings = await Booking.find(filter)
      .populate("serviceId")
      .populate("userId", "name email")
      .populate("providerId", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      bookings: bookings
    });
  } catch (error) {
    console.error("Booking fetch error:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});


// -------------------status update (provider) -------------------
router.put("/status/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    res.status(200).json({ message: "Booking status updated", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update booking status" });
  }
});


// Get all bookings of logged-in customer
router.get("/customer", authMiddleware, async (req, res) => {
  try {
    const customerId = req.user.id; // authMiddleware থেকে আসছে

    const bookings = await Booking.find({ userId: customerId })
      .populate("serviceId")            // service details
      .populate("userId", "name email") // customer info
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Customer bookings fetched successfully",
      bookings: bookings,
    });
  } catch (error) {
    console.error("Customer bookings fetch error:", error);
    res.status(500).json({ message: "Failed to fetch customer bookings" });
  }
});


// Get all bookings for logged-in provider
// 📌 Get single booking by ID (Customer only)
// routes/bookingRoutes.js
router.get("/provider/:bookingId", authMiddleware, async (req, res) => {
  try {
    const { bookingId } = req.params;
    console.log("Booking ID received:", bookingId);

    const booking = await Booking.findById(bookingId)
      .populate("userId", "name email")
      .populate("serviceId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Provider booking fetched successfully", booking: booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    res.status(500).json({ message: "Server error" });
  }
});





module.exports = router

