const mongoose = require("mongoose");


const userSchema = new mongoose.Schema(
  {
    // common
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["Customer", "Provider"],
      default: "Customer",
      required: true,
    },

    // provider spesific
    avatar: { type: String },
    service: { type: String },
    location: { type: String },
    bio: { type: String },
    phone: { type: Number },
    availability: {
      day: {
        type: String,
        enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      start: { type: String },
      end: { type: String },
    },
    rating: { type: Number, default: 0 },
    totalJobs: { type: Number, default: 0 },
    earnings: { type: Number, default: 0 },

    //password reset
    resetCode: { type: String },
    expireResetCode: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
