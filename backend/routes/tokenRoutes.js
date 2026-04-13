const express = require("express");
const router = express.Router();
const Token = require("../models/Token");

// Generate Token
router.post("/generate", async (req, res) => {

  const lastToken = await Token.findOne().sort({ tokenNumber: -1 });

  const nextNumber = lastToken ? lastToken.tokenNumber + 1 : 1;

  const token = await Token.create({
    tokenNumber: nextNumber
  });

  res.json(token);

});

// Call Next Token
router.put("/next", async (req, res) => {

  const token = await Token.findOne({ status: "WAITING" });

  if (!token) {
    return res.json({ message: "No tokens in queue" });
  }

  token.status = "SERVING";
  token.servedAt = new Date();

  await token.save();

  const io = req.app.get("io");
  io.emit("TOKEN_CALLED", token.tokenNumber);

  res.json(token);

});

// Queue Status for User
router.get("/status/:tokenNumber", async (req, res) => {

  const tokenNumber = Number(req.params.tokenNumber);

  const ahead = await Token.countDocuments({
    tokenNumber: { $lt: tokenNumber },
    status: "WAITING"
  });

  const serving = await Token.findOne({ status: "SERVING" });

  res.json({
    peopleAhead: ahead,
    currentlyServing: serving ? serving.tokenNumber : null
  });

});

// Queue List for Admin
router.get("/queue", async (req, res) => {

  const queue = await Token.find({ status: "WAITING" })
    .sort({ tokenNumber: 1 });

  const serving = await Token.findOne({ status: "SERVING" });

  res.json({
    queue,
    waiting: queue.length,
    currentServing: serving ? serving.tokenNumber : "-"
  });

});

// Token History
router.get("/history", async (req, res) => {

  const tokens = await Token.find()
    .sort({ createdAt: -1 })
    .limit(10);

  res.json(tokens);

});

// Analytics
router.get("/analytics", async (req, res) => {

  const total = await Token.countDocuments();
  const waiting = await Token.countDocuments({ status: "WAITING" });
  const completed = await Token.countDocuments({ status: "COMPLETED" });

  res.json({
    total,
    waiting,
    completed
  });

});

// Reset Queue
router.delete("/reset", async (req, res) => {

  await Token.deleteMany({});

  res.json({ message: "Queue reset" });

});

module.exports = router;