const express = require("express");
const router = express.Router();
const User = require("../models/User");


// SIGNUP
router.post("/signup", async (req, res) => {

  const { name, email, password } = req.body;

  try {

    // check empty fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    // check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    res.json({
      message: "Signup successful"
    });

  } catch (err) {

    res.status(500).json({
      message: "Signup failed"
    });

  }

});


// LOGIN
router.post("/login", async (req, res) => {
  try {

    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "User not found"
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        message: "Incorrect password"
      });
    }

    // normalize role
    if (user.role !== role.toUpperCase()) {
      return res.status(403).json({
        message: "Invalid role selected"
      });
    }

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
});

// GET ALL USERS (optional - useful for admin)
router.get("/users", async (req, res) => {

  const users = await User.find();

  res.json(users);

});


module.exports = router;