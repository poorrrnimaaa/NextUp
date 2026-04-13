const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  tokenNumber: Number,
  status: {
    type: String,
    enum: ["WAITING", "SERVING", "COMPLETED"],
    default: "WAITING"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  servedAt: Date
});

module.exports = mongoose.model("Token", tokenSchema);
