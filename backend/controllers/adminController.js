const Book = require("../models/Book");
const User = require("../models/User");
const Order = require("../models/Order");

const getDashboardStats = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();

    const totalUsers = await User.countDocuments();

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );

    res.json({
      totalBooks,
      totalUsers,
      totalOrders,
      totalRevenue,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
   getAllOrders,
   getAllUsers,
};