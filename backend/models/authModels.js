const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    // Common Fields
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Customer", "Provider"],
      default: "Customer",
      required: true,
    },

    // Provider Specific
    avatar: { type: String },
    service: { type: String }, // e.g. Electrician, Plumber
    location: { type: String },
    bio: { type: String },
    phone: { type: Number },
    availability: {
      day: {
        type: String,
        enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      start: { type: String }, // e.g. "09:00"
      end: { type: String },   // e.g. "17:00"
    },
    rating: { type: Number, default: 0 },
    totalJobs: { type: Number, default: 0 },
    earnings: { type: Number, default: 0 },
    recentViews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service"
      }
    ],

    // socket message
    isOnline: {
      type: Boolean,
      default: false
    },

    lastSeen: {
      type: Date,
      default: Date.now
    },

    // Password Reset
    resetCode: { type: String },
    expireResetCode: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
