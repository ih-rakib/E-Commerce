const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructure Schema from mongoose

const ProductSchema = new Schema({
    name: { type: String, required: true, trim: true, maxlength: 200 },
    category: { type: String, trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 5000 },
    oldPrice: { type: Number, min: 0 },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, trim: true },
    color: { type: String, trim: true, maxlength: 50 },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

const Products = mongoose.model("Product", ProductSchema);

module.exports = Products;
