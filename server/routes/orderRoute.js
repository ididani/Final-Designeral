const express = require("express");
const router = express.Router();
const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const axios = require("axios");

router.post("/checkout", async (req, res) => {
  const { cartItems, totalPrice, shippingDetails, paymentMethod, userId } = req.body;

  try {
    const orderItems = await Promise.all(cartItems.map(async (item) => {
      const product = await Product.findById(item.productId._id);
      if (product.quantityStock < item.quantity) {
        throw new Error(`Not enough stock for product: ${product.name}`);
      }
      product.quantityStock -= item.quantity;
      await product.save();
      return {
        productId: product._id,
        quantity: item.quantity,
      };
    }));

    const newOrder = new Order({
      items: orderItems,
      totalPrice,
      paymentMethod,
      paymentStatus: "Unpaid",
      name: shippingDetails.name,
      email: shippingDetails.email,
      phoneNumber: shippingDetails.phoneNumber,
      address: shippingDetails.address,
      city: shippingDetails.city,
      postalCode: shippingDetails.postalCode,
    });

    await newOrder.save();
    await axios.delete(`https://designeral.onrender.com/api/cart/${userId}/clear`);

    res.json({ orderId: newOrder._id });
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ message: "Error processing order", error: error.message });
  }
});

router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('items.productId');
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: error.message });
  }
});

module.exports = router;
