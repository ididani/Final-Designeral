const express = require("express");
const router = express.Router();
const Brand = require("../models/brandModel");

router.get("/", async (req, res) => {
  console.log("Received a request to /api/brands");
  try {
    const brands = await Brand.find();
    res.json(brands);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load brands" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.json(brand);
  } catch (error) {
    console.error("Error fetching brand:", error);
    res.status(500).json({ message: "Failed to load brand information" });
  }
});

module.exports = router;
