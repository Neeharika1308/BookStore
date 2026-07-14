const express = require("express");
const router = express.Router();


const {
  addBook,
  getBooks,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
  addReview,
  getRelatedBooks,
} = require("../controllers/bookController");

const { protect } = require("../middleware/authMiddleware");

router.get("/", getBooks);

router.get("/search", searchBooks);

router.get("/all", getAllBooks);
router.get("/:id/related", getRelatedBooks);

router.get("/:id", getBookById);

router.post("/", protect, addBook);

router.post("/:id/reviews", protect, addReview);

router.put("/:id", protect, updateBook);

router.delete("/:id", protect, deleteBook);

module.exports = router;