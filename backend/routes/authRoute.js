const express = require("express")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require("../models/authModels");
const authMiddleware = require("../middleware/authMiddleware")
const upload = require("../utililty/multer")
const nodemailer = require('nodemailer')

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET

// regitser user 
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //  Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    //  Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "Customer", // default role = Customer
    });

    await newUser.save();

    // Send response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
})


// loign user 
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Field check
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // User খুঁজে বের করো
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Password match করো
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // JWT Token generate করো
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "7d" } // 7 days valid
    );

    // Response পাঠাও
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


// logged-in user profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const role = req.user.role;

    let user = await User.findById(userId)
      .select("-password -resetCode -expireResetCode -__v")
      .lean();

    if (!user) return res.status(404).json({ message: "User not found" });

    // Role-based data
    if (role === "Provider") {
      // Provider-specific fields
      const providerData = {
        name: user.name,
        email: user.email,
        avatar: user.avatar || null,
        service: user.service || null,
        bio: user.bio || null,
        phone: user.phone || null,
        location: user.location || null,
        availability: user.availability || null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      return res.status(200).json({ user: providerData });
    }

    // Default: Customer
    const customerData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || null,
      location: user.location || null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    return res.status(200).json({ user: customerData });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
})


// Update logged-in user profile (img, fields)
router.put("/profile", authMiddleware, upload.single("avatar"), async (req, res) => {
  try {
    const userId = req.user.userId;
    const { name, email, phone, service, location, availability, bio } = req.body;

    const updateData = { name, email, phone, service, availability, location, bio };

    // যদি image upload করা হয়
    if (req.file && req.file.path) {
      updateData.avatar = req.file.path; // Cloudinary URL
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password -resetCode -expireResetCode");
    console.log(updateData)

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Change password
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User Not found" })
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString()
    const expireResetCode = Date.now() + 15 * 60 * 1000

    user.resetCode = resetCode;
    user.expireResetCode = expireResetCode

    await user.save()

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Password Code",
      text: `Your Reset Password code ${resetCode} `
    })

    res.status(200).json({ message: "Reset password code send your email" })


  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})


// Send reset code and verify
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, resetCode } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User Not found" })
    }

    if (user.resetCode !== resetCode) {
      return res.status(400).json({ message: "Invalid Reset code" })
    }
    if (user.expireResetCode < Date.now()) {
      return res.status(400).json({ message: "Expired Reset code" })
    }

    res.status(200).json({ message: "Reset code verify success" })


  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

// Reset password 
router.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User Not found" })
    }

    const hashPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashPassword
    user.resetCode = null
    user.expireResetCode = null

    await user.save()

    res.status(200).json({ message: "Password reset successfully" })


  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
})

module.exports = router