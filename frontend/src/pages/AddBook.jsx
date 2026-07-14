import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify"; 

function AddBook() {
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await api.post("/books", book, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Book added successfully ");

      navigate("/admin");
    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Book</h2>

      <form onSubmit={submitHandler}>

        <input
          className="form-control mb-3"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Author"
          name="author"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Category"
          name="category"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Price"
          name="price"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Stock"
          name="stock"
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Description"
          name="description"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Image URL"
          name="image"
          onChange={handleChange}
        />

        <button className="btn btn-success">
          Add Book
        </button>

      </form>
    </div>
  );
}

export default AddBook;