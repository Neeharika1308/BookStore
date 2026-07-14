const Book = require("../models/Book");

// Add Book
const addBook = async (req, res) => {
  try {
    const { title, author, category, price, stock, description, image } =
      req.body;

    const book = await Book.create({
      title,
      author,
      category,
      price,
      stock,
      description,
      image,
    });

    res.status(201).json({
      message: "Book added successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Books
/*const getBooks = async (req, res) => {
  try {
    const books = await Book.find();

    res.status(200).json({
      count: books.length,
      books,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
*/

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}; 

const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    await book.deleteOne();

    res.status(200).json({
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const searchBooks = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          $or: [
            { title: { $regex: req.query.keyword, $options: "i" } },
            { author: { $regex: req.query.keyword, $options: "i" } },
          ],
        }
      : {};
      

    const books = await Book.find(keyword);

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBooks = async (req, res) => {
  try {
    const pageSize = 4;
    const page = Number(req.query.page) || 1;

    const filter = {};

    if (req.query.category) {
      filter.category = req.query.category;
    }

    const count = await Book.countDocuments(filter);

    const books = await Book.find(filter)
      .sort({ price: 1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      books,
      page,
      pages: Math.ceil(count / pageSize),
      totalBooks: count,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
/*const getBooks = async (req, res) => {
  try {
    const pageSize = 4; // Number of books per page

    const page = Number(req.query.page) || 1;


    const filter = {};

if (req.query.category) {
  filter.category = req.query.category;
}

const count = await Book.countDocuments(filter);

const books = await Book.find(filter)
  .sort({ price: 1 })
  .limit(pageSize)
  .skip(pageSize * (page - 1));

   const count = await Book.countDocuments();
    
    const filter = {};

if (req.query.category) {
  filter.category = req.query.category;
}

const books = await Book.find(filter)
  .sort({ price: 1 })
  .limit(pageSize)
  .skip(pageSize * (page - 1));
  
    res.json({
      books,
      page,
      pages: Math.ceil(count / pageSize),
      totalBooks: count,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};*/
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const alreadyReviewed = book.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        message: "You already reviewed this book",
      });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    book.reviews.push(review);

    book.numReviews = book.reviews.length;

    book.rating =
      book.reviews.reduce((acc, item) => acc + item.rating, 0) /
      book.reviews.length;

    await book.save();

    res.json({
      message: "Review added successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getRelatedBooks = async (req, res) => {
  try {
    const currentBook = await Book.findById(req.params.id);

    if (!currentBook) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const books = await Book.find({
      category: currentBook.category,
      _id: { $ne: currentBook._id },
    }).limit(4);

    res.json(books);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  addBook,
  getBooks,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
  addReview,
  getRelatedBooks,
};