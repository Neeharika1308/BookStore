import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await api.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWishlist(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeBook = async (bookId) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/wishlist/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">

      <h2 className="mb-4">My Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <h5>No books in wishlist.</h5>
      ) : (
        <div className="row">

          {wishlist.map((item) => (
            <div
              className="col-md-3 mb-4"
              key={item._id}
            >
              <div className="card h-100 shadow">

                <img
                  src={item.book.image}
                  className="card-img-top"
                  style={{
                    height: "300px",
                    objectFit: "cover",
                  }}
                  alt={item.book.title}
                />

                <div className="card-body">

                  <h5>{item.book.title}</h5>

                  <p>{item.book.author}</p>

                  <h6>₹{item.book.price}</h6>

                  <Link
                    to={`/book/${item.book._id}`}
                    className="btn btn-primary w-100 mb-2"
                  >
                    View Details
                  </Link>

                  <button
                    className="btn btn-danger w-100"
                    onClick={() => removeBook(item.book._id)}
                  >
                    Remove
                  </button>

                </div>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Wishlist;