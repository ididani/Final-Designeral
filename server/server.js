// 1️⃣ IMPORTS
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const jwt = require("jsonwebtoken");

const contactRoute = require("./routes/contactRoute");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const subscriptionRoute = require("./routes/subscriptionRoute");
const brandRoute = require("./routes/brandRoute");
const searchRoute = require("./routes/searchRoute");
const userRoute = require("./routes/userRoute");

const app = express();
const PORT = process.env.PORT || 5000;

// 2️⃣ MIDDLEWARES
app.use(cors({ origin: "https://designeral.netlify.app", credentials: true }));
app.use(express.json({ limit: "1000mb", extended: true }));
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use(
  session({
    secret: "This will be secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

// 3️⃣ CONNECT TO DATABASE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// 4️⃣ API ROUTES (⬅️ THIS MUST COME BEFORE REACT SERVING)
app.use("/api/contacts", contactRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/subscriptions", subscriptionRoute);
app.use("/api/brands", brandRoute);
app.use("/api/search", searchRoute);
app.use("/api/user", userRoute);

// 5️⃣ SERVE REACT APP ONLY FOR NON-API ROUTES
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  // Only serve React for non-API routes
  app.get("/", (req, res) => {
    res.send("Backend is running! Go to /api/... for API routes.");
  });

  app.get("*", (req, res) => {
    if (!req.originalUrl.startsWith("/api")) {
      res.sendFile(path.join(__dirname, "../client/build", "index.html"));
    }
  });
}

// 6️⃣ ERROR HANDLING
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

// 7️⃣ START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
