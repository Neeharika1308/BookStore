import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { toast } from "react-toastify";

function AdminDashboard() {
  const [stats, setStats] = useState({
  totalBooks: 0,
  totalUsers: 0,
  totalOrders: 0,
  totalRevenue: 0,
});
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
    fetchStats();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data } = await api.get("/books/all");
      setBooks(data);
      
    } catch (error) {
      console.log(error);
    }
  };
  const fetchStats = async () => {
  try {
    const token = localStorage.getItem("token");

    const { data } = await api.get("/admin/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setStats(data);

  } catch (error) {
    console.log(error);
  }
};

  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await api.delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Book deleted successfully ");

      fetchBooks();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between mb-4">
        <h2>Admin Dashboard</h2>

        <Link
          to="/admin/add-book"
          className="btn btn-success"
        >
          Add Book
        </Link>
        <Link to="/admin/users" className="btn btn-primary me-2">
         Manage Users
        </Link>
      </div>
      

      <div className="row mb-4">

  <div className="col-md-3">
    <div className="card text-center p-3">
      <h5>Total Books</h5>
      <h2>{stats.totalBooks}</h2>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card text-center p-3">
      <h5>Total Users</h5>
      <h2>{stats.totalUsers}</h2>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card text-center p-3">
      <h5>Total Orders</h5>
      <h2>{stats.totalOrders}</h2>
    </div>
  </div>

  <div className="col-md-3">
    <div className="card text-center p-3">
      <h5>Revenue</h5>
      <h2>₹{stats.totalRevenue}</h2>
    </div>
  </div>

</div>

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {books.map((book) => (
            <tr key={book._id}>

              <td>{book.title}</td>

              <td>{book.author}</td>

              <td>₹{book.price}</td>

              <td>{book.stock}</td>

              <td>

                <Link
                  to={`/admin/edit-book/${book._id}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Edit
                </Link>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteBook(book._id)}
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AdminDashboard;