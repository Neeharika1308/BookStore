import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Rating from "../components/Rating";
import api from "../services/api";
import { toast } from "react-toastify";

function BookCard({ book }) {
  const { addToCart } = useContext(CartContext);

  const addWishlist = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.warning("Please login first");
        return;
      }

      await api.post(
        `/wishlist/${book._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
       toast.success("❤️ Added to Wishlist");
      /*alert("❤️ Added to Wishlist");*/
    } catch (error) {
        toast.error(
          error.response?.data?.message || "Something went wrong"
);
      /*alert(error.response?.data?.message || "Something went wrong");*/
    }
  };

  return (
    <div className="col-md-4 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm">

        <Link to={`/book/${book._id}`}>
          <img
            src={book.image}
            className="card-img-top"
            alt={book.title}
            style={{ height: "300px", objectFit: "cover" }}
          />
        </Link>

        <div className="card-body d-flex flex-column">

          <h5 className="card-title">
            <Link
              to={`/book/${book._id}`}
              className="text-decoration-none text-dark"
            >
              {book.title}
            </Link>
          </h5>

          <p className="text-muted mb-2">
            {book.author}
          </p>

          <Rating
            value={book.rating || 0}
            text={`${book.numReviews || 0} Reviews`}
          />

          <h5 className="text-success mb-3">
            ₹{book.price}
          </h5>

          <div className="mt-auto">

            <Link
              to={`/book/${book._id}`}
              className="btn btn-outline-primary w-100 mb-2"
            >
              View Details
            </Link>

            <button
              className="btn btn-outline-danger w-100 mb-2"
              onClick={addWishlist}
            >
              ❤️ Add to Wishlist
            </button>

            <button
              className="btn btn-primary w-100"
              onClick={() => addToCart(book)}
            >
              Add to Cart
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

export default BookCard;