const express = require('express');
const mongoose = require('mongoose');
const Products = require('./products.model');
const Reviews = require('../reviews/reviews.model');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();

const escapeRegExp = (str) => String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const ALLOWED_CATEGORIES = new Set([
    'accessories', 'jewellery', 'cosmetics', 'dress', 'toys',
    'footwear', 'bags', 'hats-caps', 'sunglasses',
]);

const EDITABLE_PRODUCT_FIELDS = ['name', 'category', 'description', 'price', 'oldPrice', 'image', 'color'];
const CREATE_PRODUCT_FIELDS = ['name', 'category', 'description', 'price', 'oldPrice', 'image', 'color'];

const pick = (obj, keys) => {
    const out = {};
    for (const key of keys) {
        if (obj[key] !== undefined) out[key] = obj[key];
    }
    return out;
};

const validateObjectId = (id, res) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(400).send({ message: "Invalid product id" });
        return false;
    }
    return true;
};

// post a product (admin only, no mass-assignment)
router.post("/create-product", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const data = pick(req.body, CREATE_PRODUCT_FIELDS);

        if (!data.name || data.price === undefined || data.price === null) {
            return res.status(400).send({ message: "name and price are required" });
        }
        if (Number(data.price) < 0 || (data.oldPrice !== undefined && Number(data.oldPrice) < 0)) {
            return res.status(400).send({ message: "price values must be >= 0" });
        }

        const newProduct = new Products({ ...data, author: req.userId })
        const savedProduct = await newProduct.save();

        res.status(201).send(savedProduct)
    } catch (error) {
        console.error(error)
        if (error.name === 'ValidationError') {
            return res.status(400).send({ message: error.message });
        }
        res.status(500).send({ message: "something went wrong" })
    }
})

// get all products
router.get('/', async (req, res) => {
    try {
        const { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query

        let filter = {}
        if (category && category !== "all" && typeof category === 'string') {
            const clean = category.trim();
            // Allow-list string categories; ignore anything suspicious
            if (ALLOWED_CATEGORIES.has(clean)) {
                filter.category = clean;
            } else if (/^[a-zA-Z0-9 _-]+$/.test(clean)) {
                filter.category = clean;
            }
        }

        const min = minPrice !== undefined && minPrice !== '' ? parseFloat(minPrice) : NaN;
        const max = maxPrice !== undefined && maxPrice !== '' ? parseFloat(maxPrice) : NaN;

        if (!isNaN(min) && !isNaN(max)) {
            filter.price = { $gte: min, $lte: max }
        } else if (!isNaN(min)) {
            filter.price = { $gte: min }
        } else if (!isNaN(max)) {
            filter.price = { $lte: max }
        }

        const parsedPage = Math.max(1, parseInt(page, 10) || 1);
        const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
        const skip = (parsedPage - 1) * parsedLimit;

        const totalProducts = await Products.countDocuments(filter)
        const totalPages = Math.max(1, Math.ceil(totalProducts / parsedLimit))
        const products = await Products.find(filter)
            .skip(skip)
            .limit(parsedLimit)
            .populate("author", "email")
            .sort({ createdAt: -1 })

        res.status(200).send({ products, totalPages, totalProducts })

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "error getting all products" })
    }
})


// get relavent products (specific route BEFORE generic /:id)
router.get('/related/:id', async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).send({ message: "Product id is required" })
        }
        if (!validateObjectId(id, res)) return;

        const product = await Products.findById(id)

        if (!product) {
            return res.status(404).send({ message: "product not found" })
        }

        const words = String(product.name || '').split(" ").filter((word) => word.length > 1).map(escapeRegExp);
        const orConditions = [];
        if (words.length > 0) {
            orConditions.push({ name: { $regex: new RegExp(words.join("|"), "i") } });
        }
        if (product.category) {
            orConditions.push({ category: product.category });
        }

        if (orConditions.length === 0) {
            return res.status(200).send([]);
        }

        const relatedProducts = await Products.find({
            _id: { $ne: id },
            $or: orConditions
        }).limit(10);

        res.status(200).send(relatedProducts)

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "error fetching related products" })
    }
})

// get one product
router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id
        if (!validateObjectId(productId, res)) return;

        const product = await Products.findById(productId).populate("author", "username email") // populate author with email and username
        if (!product) {
            return res.status(404).send({ message: "product not found" })
        }
        const reviews = await Reviews.find({ productId }).populate("userId", "username email")
        res.status(200).send({ product, reviews })

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "error getting product" })
    }
})

// update a product (admin only, whitelisted fields)
router.patch('/update-product/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const productId = req.params.id
        if (!validateObjectId(productId, res)) return;

        const updates = pick(req.body, EDITABLE_PRODUCT_FIELDS);
        if (updates.price !== undefined && Number(updates.price) < 0) {
            return res.status(400).send({ message: "price must be >= 0" });
        }
        if (updates.oldPrice !== undefined && Number(updates.oldPrice) < 0) {
            return res.status(400).send({ message: "oldPrice must be >= 0" });
        }

        const updatedProduct = await Products.findByIdAndUpdate(productId, updates, { new: true, runValidators: true })

        if (!updatedProduct) {
            return res.status(404).send({ message: "product not found" })
        }

        res.status(200).send({
            message: "product updated successfully",
            product: updatedProduct
        })
    } catch (error) {
        console.error(error)
        if (error.name === 'ValidationError') {
            return res.status(400).send({ message: error.message });
        }
        res.status(500).send({ message: "error updating product" })
    }
})

// delete a product
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const productId = req.params.id
        if (!validateObjectId(productId, res)) return;

        const deletedProduct = await Products.findByIdAndDelete(productId)

        if (!deletedProduct) {
            return res.status(404).send({ message: "product not found" })
        }

        // delete reviews associated with that product
        await Reviews.deleteMany({ productId: productId })

        res.status(200).send({
            message: "product deleted successfully"
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "error deleting product" })
    }
})

module.exports = router
