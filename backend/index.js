const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

// middlewares
app.use(express.json({ limit: "27mb" }));
app.use(express.urlencoded({ limit: "27mb" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://e-commerce-client-rosy.vercel.app",
    credentials: true,
  })
);

// upload image
const uploadImage = require("./src/utils/uploadImage");

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

main()
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  app.get("/", (req, res) => {
    res.send("backend is running");
  });
}

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
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
