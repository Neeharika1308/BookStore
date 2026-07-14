import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const navigate = useNavigate();

  const { cart, clearCart } = useContext(CartContext);


  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      await api.post(
        "/orders",
        {
          orderItems: cart,
          shippingAddress,
          totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      clearCart();
      alert("Order Placed Successfully!");

      navigate("/orders");
    } catch (error) {
      alert(error.response?.data?.message || "Order Failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>

      <form onSubmit={placeOrder}>
        <input
          className="form-control mb-3"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="state"
          placeholder="State"
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="pincode"
          placeholder="Pincode"
          onChange={handleChange}
        />

        <button className="btn btn-success">
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;