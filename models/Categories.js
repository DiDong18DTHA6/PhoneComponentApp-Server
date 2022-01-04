const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    categoryName: {type: String},
    image: {type: String}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
