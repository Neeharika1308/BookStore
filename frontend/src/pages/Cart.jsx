import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const {
    cart,
    increaseQty,
    decreaseQty,
    removeFromCart,
  } = useContext(CartContext);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Shopping Cart</h2>

      {cart.length === 0 ? (
        <h4>Your cart is empty.</h4>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              className="card mb-3 p-3"
            >
              <div className="row align-items-center">

                <div className="col-md-3">
                  <img
                    src={item.image || "https://via.placeholder.com/150"}
                    alt={item.title}
                    className="img-fluid"
                  />
                </div>

                <div className="col-md-3">
                  <h5>{item.title}</h5>
                  <p>{item.author}</p>
                </div>

                <div className="col-md-2">
                  ₹{item.price}
                </div>

                <div className="col-md-2">

                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => decreaseQty(item._id)}
                  >
                    -
                  </button>

                  {item.quantity}

                  <button
                    className="btn btn-secondary ms-2"
                    onClick={() => increaseQty(item._id)}
                  >
                    +
                  </button>

                </div>

                <div className="col-md-2">

                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item._id)}
                  >
                    Remove
                  </button>

                </div>

              </div>
            </div>
          ))}

          <h3 className="mt-4">
            Total : ₹{totalPrice}
          </h3>
          <button className="btn btn-success mt-3" onClick={() => window.location.href = "/checkout"}>
          Proceed to Checkout
         </button>
        </>
      )}
    </div>
  );
}

export default Cart;