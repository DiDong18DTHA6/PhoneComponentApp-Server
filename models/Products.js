const mongoose = require("mongoose");

const ProductsSchema = new mongoose.Schema(
  {
    productName: { type: String },
    price: { type: Number },
    image: { type: String },
    description: { type: String },
    category: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductsSchema);
