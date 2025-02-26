const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
  totalPrice: { type: Number, default: 0 },
});

cartSchema.pre("save", async function (next) {
  console.log('Attempting to save cart:', JSON.stringify(this, null, 2));
  const validation = this.validateSync();
  if (validation) {
    console.error('Cart validation error:', validation);
  }
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
