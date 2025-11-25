const express = require("express")
const router = express.Router()
const authMiddleware = require("../middleware/authMiddleware");
const Testimonals = require("../models/testimonalsModel");


// Add testimonial (customer)
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { rating, comment, serviceId } = req.body;

    if (!rating || !comment || !serviceId) {
      return res.status(400).json({ message: "Rating and comment are required" });
    }

    // ✅ logged in user info আসবে middleware থেকে
    const userId = req.user.userId;

    const newTestimonial = new Testimonals({
      serviceId,
      userId,
      rating,
      comment,
    });

    await newTestimonial.save();

    res.status(201).json({
      message: "Testimonial added successfully",
      testimonial: newTestimonial,
    });
  } catch (error) {
    console.error("Add testimonial error:", error);
    res.status(500).json({ message: "Failed to add testimonial" });
  }
});


// Get all testimonials per service
router.get("/:serviceId", async (req, res) => {
  try {
    const { serviceId } = req.params;

    // Check if serviceId provided
    if (!serviceId) {
      return res.status(400).json({ message: "Service ID is required" });
    }

    // Find all testimonials linked to this service
    const testimonials = await Testimonals.find({ serviceId })
      .populate("userId", "name email avatar") // user info show করবে
      .sort({ createdAt: -1 }); // latest first

    res.status(200).json({
      message: "Testimonials fetched successfully",
      testimonial: testimonials,
    });
  } catch (error) {
    console.error("Fetch testimonials error:", error);
    res.status(500).json({ message: "Failed to fetch testimonials" });
  }
});

// ✅ Edit Testimonial
router.put("/edit/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params; // testimonial ID
    const { rating, comment } = req.body;
    const userId = req.user.userId;

    const testimonial = await Testimonals.findById(id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    // ✅ শুধু নিজের testimonial এডিট করতে পারবে
    if (testimonial.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to edit this testimonial" });
    }

    // Update fields
    if (rating) testimonial.rating = rating;
    if (comment) testimonial.comment = comment;

    await testimonial.save();

    res.status(200).json({
      message: "Testimonial updated successfully",
      testimonial,
    });
  } catch (error) {
    console.error("Update testimonial error:", error);
    res.status(500).json({ message: "Failed to update testimonial" });
  }
});

// ✅ Delete Testimonial
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    console.log(id)
    const testimonial = await Testimonals.findById(id);

    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }

    // ✅ শুধু নিজের testimonial ডিলিট করতে পারবে
    if (testimonial.userId.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to delete this testimonial" });
    }

    await testimonial.deleteOne();

    res.status(200).json({ message: "Testimonial deleted successfully", id: id });
  } catch (error) {
    console.error("Delete testimonial error:", error);
    res.status(500).json({ message: "Failed to delete testimonial" });
  }
});


module.exports = router