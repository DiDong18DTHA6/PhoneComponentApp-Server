const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    pass: { type: String },
    name: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UsersSchema);