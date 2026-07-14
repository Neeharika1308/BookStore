import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Rating from "../components/Rating";
import BookCard from "../components/BookCard";
import { toast } from "react-toastify";

function BookDetails() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [relatedBooks, setRelatedBooks] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchBook();
    fetchRelatedBooks();
  }, []);

  const fetchBook = async () => {
    try {
      const { data } = await api.get(`/books/${id}`);
      setBook(data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchRelatedBooks = async () => {
  try {
    const { data } = await api.get(`/books/${id}/related`);
    setRelatedBooks(data);
  } catch (error) {
    console.log(error);
  }
};
  const submitReview = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        `/books/${id}/reviews`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Review added successfully!");

      setRating(5);
      setComment("");

      fetchBook();
    } catch (error) {
       toast.error(
        error.response?.data?.message || "Something went wrong"
);
     /* alert(error.response?.data?.message || "Something went wrong");*/
    }
  };

  if (!book) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div className="container mt-5">
      <div className="row">

        <div className="col-md-4">
          <img
            src={book.image || "https://via.placeholder.com/300x400"}
            alt={book.title}
            className="img-fluid rounded shadow"
          />
        </div>

        <div className="col-md-8">

          <h2>{book.title}</h2>
           <h5 className="text-muted text-center">
              {book.author}
           </h5>

          <div className="d-flex justify-content-center mb-3">
         <Rating  
         value={book.rating || 0}
         text={`${book.numReviews || 0} Reviews`} />
          </div>
 
          

          <p>
            <strong>Category:</strong> {book.category}
          </p>

          <h3 className="text-success">
            ₹{book.price}
          </h3>
          <p>{book.description}</p>

          <p>
            <strong>Stock:</strong> {book.stock}
          </p>

          <button className="btn btn-success mb-4">
            Add to Cart
          </button>

          <hr />

<div className="card shadow-sm mt-4">
  <div className="card-body">

    <h3 className="mb-4">Write a Review</h3>

    {user ? (
      <>
        <div className="mb-3">
          <label className="form-label">
            Rating
          </label>

          <select
            className="form-select"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="5">⭐⭐⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="2">⭐⭐</option>
            <option value="1">⭐</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">
            Comment
          </label>

          <textarea
            className="form-control"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={submitReview}
        >
          Submit Review
        </button>
      </>
    ) : (
      <p>Please login to write a review.</p>
    )}

  </div>
</div>

<hr />


          <h3>Customer Reviews</h3>

          {book.reviews && book.reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            book.reviews?.map((review) => (
              <div
                key={review._id}
                className="card mb-3"
              >
                <div className="card-body">

                 <h5>{review.name}</h5>

                 <Rating  value={review.rating}
                         text=""/>

                  <p className="mt-2">
                    {review.comment}
                  </p>

                </div>
              </div>
            ))
          )}
            

        </div>

      </div>
     <hr className="my-5" />

<h3 className="mb-4">Related Books</h3>

{relatedBooks.length === 0 ? (
  <p>No related books found.</p>
) : (
  <div className="row">
    {relatedBooks.map((book) => (
      <BookCard
        key={book._id}
        book={book}
      />
    ))}
  </div>
)}


      
    </div>

    
  );
}

export default BookDetails;