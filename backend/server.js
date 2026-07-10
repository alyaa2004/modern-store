import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import connectDB from "./config/db.js";

import User from "./models/User.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";

import auth from "./middleware/auth.js";

dotenv.config();
connectDB();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

/* ============================
   Register
============================ */

app.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "Registered successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ============================
   Login
============================ */

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ============================
   Products
============================ */

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Get single product
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Add product
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ============================
   Orders
============================ */

// Create Order
app.post("/orders", auth, async (req, res) => {
  try {
    const {
      customerName,
      phone,
      address,
      items,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      user: req.user.userId,
      customerName,
      phone,
      address,
      items,
      totalPrice,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Get current user's orders
app.get("/my-orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

// Get all orders (Admin)
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ============================
   Server
============================ */

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});