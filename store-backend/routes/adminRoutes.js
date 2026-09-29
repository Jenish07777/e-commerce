import express from "express";

import {
  getDashboardStats,
  getAllOrders,
  updateOrderStatus,
  getAllProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllUsers,
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// Every route below requires:
// 1. Logged-in user
// 2. Admin role

router.use(authMiddleware);
router.use(adminMiddleware);

// Dashboard
router.get("/dashboard", getDashboardStats);

// Orders
router.get("/orders", getAllOrders);
router.put("/orders/:id/status", updateOrderStatus);

// Products
router.get("/products", getAllProductsAdmin);
router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

// Users
router.get("/users", getAllUsers);

export default router;