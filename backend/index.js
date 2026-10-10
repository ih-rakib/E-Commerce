const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

if (!process.env.MONGO_URL) {
  console.error("FATAL: MONGO_URL is not set. Set it in backend/.env or environment.");
}
if (!process.env.JWT_SECRET_KEY) {
  console.error("FATAL: JWT_SECRET_KEY is not set. Set it in backend/.env or environment.");
}

// middlewares
app.use(express.json({ limit: "27mb" }));
app.use(express.urlencoded({ limit: "27mb", extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const allowedOrigins = (
  process.env.CORS_ORIGINS ||
  "http://localhost:5173,https://orion-tcommerce.vercel.app,https://e-commerce-client-rosy.vercel.app"
)
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser clients (no origin) and whitelisted origins
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  })
);

// upload image
const uploadImage = require("./src/utils/uploadImage");

// Health check (available even before DB connects)
app.get("/", (req, res) => {
  res.send("backend is running");
});

// All routes
const authRoutes = require("./src/users/user.route");
const productRoutes = require("./src/products/products.route");
const reviewRoutes = require("./src/reviews/reviews.route");
const orderRoutes = require("./src/orders/orders.route");
const statsRoutes = require("./src/stats/stats.route");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stats", statsRoutes);

// upload image
app.post("/upload-image", async (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => {
      console.error("Upload Error: ", err);
      res
        .status(500)
        .send({ message: "Error uploading image", error: err.message });
    });
});

// 404 for unknown API routes
app.use("/api", (req, res) => {
  res.status(404).send({ message: "Route not found" });
});

// Centralized error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  const status = err.status || 500;
  res.status(status).send({ message: err.message || "Internal server error" });
});

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

if (require.main === module) {
  main()
    .then(() => {
      console.log("MongoDB is connected successfully");
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    })
    .catch((err) => {
      console.error("Failed to start server:", err);
      process.exit(1);
    });
}

module.exports = app;
