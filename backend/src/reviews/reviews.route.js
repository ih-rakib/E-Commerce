const express = require('express');
const mongoose = require('mongoose');
const Reviews = require('./reviews.model');
const Products = require('../products/products.model');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// post a review (authenticated; users can only review as themselves)
router.post("/post-review", verifyToken, async (req, res) => {
    try {
        const { comment, rating, productId, userId } = req.body
        if (!comment || rating === undefined || rating === null || !productId || !userId) {
            return res.status(400).send({ message: "all fields are required" })
        }

        const numericRating = Number(rating);
        if (!Number.isFinite(numericRating) || numericRating < 1 || numericRating > 5) {
            return res.status(400).send({ message: "rating must be a number between 1 and 5" });
        }

        if (typeof comment !== 'string' || comment.trim().length === 0) {
            return res.status(400).send({ message: "comment must not be empty" });
        }
        if (comment.length > 2000) {
            return res.status(400).send({ message: "comment is too long (max 2000 characters)" });
        }

        if (!mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).send({ message: "Invalid productId or userId" });
        }

        // Users may only post as themselves unless admin
        if (req.userId !== String(userId) && req.role !== 'admin') {
            return res.status(403).send({ message: "You can only post reviews as yourself" });
        }

        // Validate product exists BEFORE writing the review
        const product = await Products.findById(productId);
        if (!product) {
            return res.status(404).send({ message: "product not found" });
        }

        const existingReview = await Reviews.findOne({ productId, userId })
        if (existingReview) {
            // update reviews
            existingReview.comment = comment.trim();
            existingReview.rating = numericRating;
            await existingReview.save()
        } else {
            // add a new review
            const newReview = new Reviews({ comment: comment.trim(), rating: numericRating, productId, userId })
            await newReview.save()
        }

        // calculating average rating
        const reviews = await Reviews.find({ productId })

        if (reviews.length > 0) {
            const totalRating = reviews.reduce((cur, review) => cur + review.rating, 0)
            const averageRating = totalRating / reviews.length

            product.rating = averageRating
            await product.save()
        }

        res.status(200).send({
            message: "Review processed",
            reviews: reviews
        })
    } catch (error) {
        console.error("Error creating review", error)
        if (error.name === 'ValidationError') {
            return res.status(400).send({ message: error.message });
        }
        if (error.code === 11000) {
            return res.status(409).send({ message: "You have already reviewed this product" });
        }
        res.status(500).send({ message: "Failed to create review" })
    }
})

// get all reviews
router.get("/total-reviews", async (req, res) => {
    try {
        const totalReviews = await Reviews.countDocuments({});
        res.status(200).send({ totalReviews })
    } catch (error) {
        console.error("Error getting total review", error)
        res.status(500).send({ message: "Failed to get total review" })
    }
})

// get reviews by user id
router.get("/:userId", async (req, res) => {
    const { userId } = req.params
    if (!userId) {
        return res.status(400).send({ message: "user id is required" })
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).send({ message: "Invalid user id" });
    }

    try {
        const reviews = await Reviews.find({ userId: userId }).sort({ createdAt: -1 })
        // Return empty array instead of 404 so the frontend can render an empty state
        return res.status(200).send(reviews)
    } catch (error) {
        console.error("Error getting review by user", error)
        res.status(500).send({ message: "Failed to get fetch review" })
    }
})

module.exports = router
