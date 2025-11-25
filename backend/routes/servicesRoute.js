const express = require("express");
const router = express.Router();
const upload = require("../utililty/multer");
const authMiddleware = require("../middleware/authMiddleware");
const Service = require("../models/serviceModel");
const User = require("../models/authModels");

// ------------------- Add Service (Provider) -------------------
router.post("/add", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    // Only Provider can add service
    if (req.user.role !== "Provider") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { title, description, location, availability, price, category } = req.body;
    const image = req.file ? req.file.path : null;

    if (!title || !description || !location || !availability || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newService = new Service({
      title,
      provider: req.user.userId,
      description,
      location,
      availability,
      price,
      category: category,
      image,
      reviews: [],
      averageRating: 0,
      viewsCount: 0
    });

    await newService.save();
    res.status(201).json({ message: "Service added successfully", service: newService });
  } catch (error) {
    console.error("Add Service Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------- Get All Services -------------------
router.get("/services", async (req, res) => {
  try {
    const services = await Service.find()
      .populate("provider", "name email avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Services fetched successfully", service: services });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------- Get All Services for provider -------------------
// ------------------- ✅ Get All Services for specific provider -------------------
// ✅ Get All Services for the Logged-in Provider Only
router.get("/provider", authMiddleware, async (req, res) => {
  try {
    // 🔐 Login করা provider-এর ID
    const providerId = req.user.userId;

    if (!providerId) {
      return res.status(401).json({ message: "Unauthorized: Provider ID missing" });
    }

    // 🧠 শুধু ওই provider-এর service fetch করা হচ্ছে
    const services = await Service.find({ provider: providerId })
      .populate("provider", "name email avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Provider's services fetched successfully",
      service: services,
    });
  } catch (error) {
    console.error("❌ Error fetching provider services:", error);
    res.status(500).json({ message: "Server error" });
  }
});



// ------------------- Get Single Service Details -------------------
router.get("/service/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id).populate("provider", "name  email avatar");
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Increase viewsCount
    service.viewsCount += 1;
    await service.save();

    res.status(200).json({ message: "Service details fetched", service: service });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------- Edit Service (Provider) -------------------
router.put("/services/:id", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (user.role !== "Provider") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    const { title, description, location, availability, price, category } = req.body;
    const image = req.file ? req.file.filename : service.image;

    service.title = title || service.title;
    service.description = description || service.description;
    service.location = location || service.location;
    service.availability = availability || service.availability;
    service.price = price || service.price;
    service.serviceCategory = category || service.serviceCategory;
    service.image = image;

    await service.save();

    res.status(200).json({ success: true, message: "Service updated successfully", service });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------- Delete Service (Provider) -------------------
router.delete("/delete-service/:id", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);

    if (user.role !== "Provider") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    await Service.findByIdAndDelete(id);
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ message: "Server error" });
  }
});



// ------------------- Recent Viewed Services (Customer) -------------------
router.get("/recent-view", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).populate("recentViews");

    res.status(200).json({ message: "Recent viewed services fetched", service: user.recentViews });
  } catch (error) {
    console.error("Error fetching recent views:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------- Popular Services -------------------
router.get("/popular-services", async (req, res) => {
  try {
    const services = await Service.find()
      .sort({ viewsCount: -1, averageRating: -1 })
      .limit(10)
      .populate("provider", "name email");

    res.status(200).json({ message: "Popular services fetched", service: services });
  } catch (error) {
    console.error("Popular services error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
