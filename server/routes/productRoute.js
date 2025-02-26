const express = require("express");
const Product = require("../models/productModel");
const router = express.Router();

router.get("/suggestions", async (req, res) => {
  console.log("Suggestions route hit");
  try {
    const { brand, currentProductId } = req.query;
    console.log("Brand:", brand, "Current Product ID:", currentProductId);

    if (!brand) {
      return res.status(400).json({ message: "Brand parameter is required." });
    }

    const products = await Product.find({
      brand: { $regex: new RegExp(brand, "i") },
      _id: { $ne: currentProductId }
    }).limit(4);

    console.log("Products found:", products);

    res.json(products);
  } catch (error) {
    console.error("Error fetching suggestions:", error);
    res.status(500).json({ message: "Server error. Failed to fetch product suggestions." });
  }
});


router.get("/:category/:subCategory/:id", async (req, res) => {
  console.log("Received request params:", req.params);
  try {
    const { category, subCategory, id } = req.params;
    console.log("Searching for product:", { category, subCategory, id });

    const product = await Product.findOne({
      category: { $in: [category] },
      subCategory: subCategory,
      _id: id,
    });

    console.log("Database query result:", product);

    if (!product) {
      console.log("Product not found");
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.get("/:category/:subCategory", async (req, res) => {
  try {
    const { category, subCategory } = req.params;
    const products = await Product.find({
      category: category,
      subCategory: subCategory,
    });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: category });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const requiredFields = [
      "name",
      "price",
      "category",
      "subCategory",
      "quantityStock",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    // Create new product object without specifying _id
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image || "",
      category: req.body.category,
      subCategory: req.body.subCategory,
      description: req.body.description || "",
      quantityStock: req.body.quantityStock,
      brand: req.body.brand || "",
    });

    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error adding new product:", err);
    res
      .status(400)
      .json({ message: "Error adding new product", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/least-quantity", async (req, res) => {
  try {
    const products = await Product.find({ quantityStock: { $gt: 0 } })
      .sort({ quantityStock: 1 })
      .limit(4);

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

router.get("/search", async (req, res) => {
  const query = req.query.q;

  try {
    const products = await Product.find({
      name: { $regex: query, $options: "i" },
    }).limit(3); // Limit to 3 results
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
