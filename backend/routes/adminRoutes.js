const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getDashboardStats,
  getAllOrders,
  getAllUsers
} = require("../controllers/adminController");

router.get("/orders", protect, getAllOrders);
router.get("/stats", protect, getDashboardStats);
router.get("/users", protect, getAllUsers);

module.exports = router;