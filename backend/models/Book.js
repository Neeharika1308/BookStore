const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    author: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      default: 0,
    },

    description: {
      type: String,
    },

    image: {
      type: String,
    },

    reviews: [
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    rating: Number,
    comment: String,
  },
],

numReviews: {
  type: Number,
  default: 0,
},

rating: {
  type: Number,
  default: 0,
},
  },
  {
    timestamps: true,
  }

  
);

module.exports = mongoose.model("Book", bookSchema);