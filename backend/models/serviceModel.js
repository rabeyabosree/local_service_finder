const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        provider: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        availability: {
            type: String, // e.g., "9am-5pm" or array of days
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String, // image URL or path
            required: true,
        },
        category: {
            type: String, // e.g., "Electrician", "Plumber"
             
        },
       
        averageRating: {
            type: Number,
            default: 0,
        },
        viewsCount: {
            type: Number,
            default: 0
        },
       
    },
    { timestamps: true }
);

// Optional: pre-save middleware to calculate average rating
serviceSchema.methods.calculateAverageRating = function () {
    if (this.reviews.length === 0) {
        this.averageRating = 0;
    } else {
        const sum = this.reviews.reduce((acc, r) => acc + r.rating, 0);
        this.averageRating = sum / this.reviews.length;
    }
};

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service
