const express = require("express");
const router = express.Router();
const Subscription = require("../models/subscriptionModel");

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    const existingEmail = await Subscription.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    const subscription = new Subscription({ email });
    await subscription.save();

    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to subscribe" });
  }
});

module.exports = router;
