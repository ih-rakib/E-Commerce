const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructure Schema from mongoose

const ReviewSchema = new mongoose.Schema({
    comment: { type: String, required: true, trim: true, minlength: 1, maxlength: 2000 },
    rating: { type: Number, required: true, min: 1, max: 5 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true, index: true },
}, { timestamps: true })

ReviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

const Reviews = mongoose.model("Review", ReviewSchema)

module.exports = Reviews