import express from "express";

import {
  createOrder,
  getMyOrders,
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";
// import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  createOrder
);

router.get(
  "/",
  authMiddleware,
  getMyOrders
);

// router.get(
//   "/admin-test",
//   authMiddleware,
//   adminMiddleware,
//   (req, res) => {
//     res.json({
//       message: "You have admin access",
//       user: req.user.fullName,
//       role: req.user.role,
//     });
//   }
// );

export default router;