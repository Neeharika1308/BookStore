import { useEffect, useState } from "react";
import api from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await api.get("/orders/myorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <h4>No Orders Yet</h4>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card p-3 mb-3">

            <h5>Order ID</h5>
            <p>{order._id}</p>

            <h6>Total Price</h6>
            <p>₹{order.totalPrice}</p>

            <h6>Shipping Address</h6>

            <p>
              {order.shippingAddress.fullName}
            </p>

            <p>
              {order.shippingAddress.address}
            </p>

            <p>
              {order.shippingAddress.city},{" "}
              {order.shippingAddress.state}
            </p>

            <hr />

            <h5>Books</h5>

            {order.orderItems.map((book, index) => (
              <div key={index}>
                <strong>{book.title}</strong>

                <p>
                  ₹{book.price} × {book.quantity}
                </p>
              </div>
            ))}

          </div>
        ))
      )}
    </div>
  );
}

export default Orders;