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
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8081;
app.use(
  cors({
    origin: "https://designeral.netlify.app",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json({ limit: "1000mb", extended: true }));
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallbackSecret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log("Database connection error", err);
    process.exit(1);
  });

console.log("MONGODB_URI:", process.env.MONGODB_URI);
app.use("/api/contacts", contactRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/subscriptions", subscriptionRoute);
app.use("/api/brands", brandRoute);
app.use("/api/search", searchRoute);
app.use("/api/user", userRoute);

app.get("/message", (req, res) => {
  res.send("<h1>Hello Node!</h1>");
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Global error handler caught:", err);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
