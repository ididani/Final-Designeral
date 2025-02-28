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

SESSION_SECRET = "your_secure_secret";

app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallbackSecret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

MONGODB_URI =
  "mongodb+srv://your_username:your_password@cluster.mongodb.net/your_db?retryWrites=true&w=majority";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB connected"))
  .catch((err) => {
    console.log("Database connection error", err);
    process.exit(1);
  });

app.use("/api/contacts", contactRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/subscriptions", subscriptionRoute);
app.use("/api/brands", brandRoute);
app.use("/api/search", searchRoute);
app.use("/api/user", userRoute);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../client/build")));

//   app.get("/", (req, res) => {
//     res.send("Backend is running! Go to /api/... for API routes.");
//   });

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
//   });
// }

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
