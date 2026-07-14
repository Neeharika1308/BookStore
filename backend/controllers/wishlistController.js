const Wishlist = require("../models/Wishlist");

// Add to Wishlist
const addToWishlist = async (req, res) => {
  try {
    const exists = await Wishlist.findOne({
      user: req.user._id,
      book: req.params.bookId,
    });

    if (exists) {
      return res.status(400).json({
        message: "Book already in wishlist",
      });
    }

    const wishlist = await Wishlist.create({
      user: req.user._id,
      book: req.params.bookId,
    });

    res.status(201).json(wishlist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Wishlist
const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({
      user: req.user._id,
    }).populate("book");

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove Wishlist
const removeWishlist = async (req, res) => {
  try {
    await Wishlist.findOneAndDelete({
      user: req.user._id,
      book: req.params.bookId,
    });

    res.json({
      message: "Removed from wishlist",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeWishlist,
};