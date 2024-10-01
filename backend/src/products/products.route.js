const express = require('express');
const Products = require('./products.model');
const Reviews = require('../reviews/reviews.model');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();

// post a product
router.post("/create-product", async (req, res) => {
    try {
        const newProduct = new Products({ ...req.body })
        const savedProduct = await newProduct.save();

        // calculate reviews
        const reviews = await Reviews.find({ productId: savedProduct._id })

        if (reviews.length > 0) {
            const totalRating = reviews.reduce((cur, review) => cur + review.rating, 0)
            const avgRating = totalRating / reviews.length;
            savedProduct.rating = avgRating
            await savedProduct.save();
        }

        res.status(201).send(savedProduct)
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "something went wrong" })
    }
})

// get all products
router.get('/', async (req, res) => {
    try {
        const { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query

        let filter = {}
        if (category && category !== "all") {
            filter.category = category
        }
        if (minPrice && maxPrice) {
            const min = parseFloat(minPrice)
            const max = parseFloat(maxPrice)

            if (!isNaN(min) && !isNaN(max)) {
                filter.price = { $gte: min, $lte: max }
            }
        }

        const skip = parseInt((page - 1) * parseInt(limit))
        const totalProducts = await Products.countDocuments(filter)
        const totalPages = Math.ceil(totalProducts / parseInt(limit))
        const products = await Products.find(filter)
            .skip(skip)
            .limit(parseInt(limit))
            .populate("author", "email")
            .sort({ createdAt: -1 })

        res.status(200).send({ products, totalPages, totalProducts })

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "error getting all products" })
    }
})


// get one product
router.get('/:id', async (req, res) => {
    try {
        const productId = req.params.id
        const product = await Products.findById(productId).populate("author", "username email") // populate author with email and username
        if (!product) {
            res.status(400).send({ message: "product not found" })
        }
        const reviews = await Reviews.find({ productId }).populate("userId", "username email")
        res.status(200).send({ product, reviews })

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "error getting product" })
    }
})

// update a product
router.patch('/update-product/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const productId = req.params.id
        const updatedProduct = await Products.findByIdAndUpdate(productId, { ...req.body }, { new: true })

        if (!updatedProduct) {
            return res.status(400).send({ message: "product not found" })
        }

        res.status(200).send({
            message: "product updated successfully",
            product: updatedProduct
        })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "error updating product" })
    }
})

// delete a product
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const productId = req.params.id
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

// get relavent products
router.get('/related/:id', async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).send({ message: "Product id is required" })
        }

        const product = await Products.findById(id)

        if (!product) {
            return res.status(404).send({ message: "product not found" })
        }

        const titleRegex = new RegExp(
            product.name.split(" ").filter((word) => word.length > 1).join("|"), "i"
        )

        const relatedProducts = await Products.find({
            _id: { $ne: id },
            $or: [
                { name: { $regex: titleRegex } }, // still keeping regex
                { category: product.category }
            ]
        }).limit(10); // Optional: Limit results if necessary         

        res.status(200).send(relatedProducts)

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "error fetching related products" })
    }
})

module.exports = router