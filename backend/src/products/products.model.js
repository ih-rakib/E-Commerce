const mongoose = require('mongoose');
const { Schema } = mongoose; // Destructure Schema from mongoose

const ProductSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String },
    description: { type: String },
    oldPrice: { type: Number },
    price: { type: Number, required: true },
    image: { type: String },
    color: { type: String },
    rating: { type: Number, default: 0 },
    author: { type: mongoose.Types.ObjectId, ref: "User", required: true }
});

const Products = mongoose.model("Product", ProductSchema);

module.exports = Products;
