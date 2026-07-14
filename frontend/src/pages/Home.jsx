import { useEffect, useState } from "react";
import api from "../services/api";

import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import Footer from "../components/Footer";

function Home() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    fetchBooks();
  }, [page]);
  
  const fetchBooks = async () => {
  try {
    const { data } = await api.get(`/books?page=${page}`);

    setBooks(data.books);
    setPages(data.pages);
  } catch (error) {
    console.log(error);
  }
};
const searchBooks = async (keyword) => {
  try {
    if (keyword.trim() === "") {
      fetchBooks();
      return;
    }

    const { data } = await api.get(
      `/books/search?keyword=${keyword}`
    );

    setBooks(data);
  } catch (error) {
    console.log(error);
  }
};
const filterByCategory = async (selectedCategory) => {
  setCategory(selectedCategory);

  try {
    if (selectedCategory === "All") {
      fetchBooks();
      return;
    }

    const { data } = await api.get("/books");

    const filteredBooks = data.books.filter(
      (book) => book.category === selectedCategory
    );

    setBooks(filteredBooks);
  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <Hero />

      <SearchBar onSearch={searchBooks} />

      <div className="container mt-5">
        <h2 className="mb-4">Featured Books</h2>

        <div className="row">
          {books.length === 0 ? (
            <p>No books found.</p>
          ) : (
            books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-4">

  <button
    className="btn btn-secondary me-3"
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Previous
  </button>

  <span className="fw-bold">
    Page {page} of {pages}
  </span>

  <button
    className="btn btn-secondary ms-3"
    disabled={page === pages}
    onClick={() => setPage(page + 1)}
  >
    Next
  </button>

</div>

<div className="container mt-3">
  <select
    className="form-select"
    value={category}
    onChange={(e) => filterByCategory(e.target.value)}
  >
    <option value="All">All Categories</option>
    <option value="Self Help">Self Help</option>
    <option value="Finance">Finance</option>
    <option value="Business">Business</option>
    <option value="Programming">Programming</option>
    <option value="Fiction">Fiction</option>
  </select>
</div>

      <Footer />
    </>
  );
}

export default Home;