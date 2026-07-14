import { useEffect, useState } from "react";
import api from "../services/api";

function MyOrders() {
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
      <h2 className="mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <div className="alert alert-info">
          You haven't placed any orders yet.
        </div>
      ) : (
        orders.map((order) => (
          <div className="card mb-4" key={order._id}>
            <div className="card-body">

              <h5>Order ID</h5>
              <p>{order._id}</p>

              <h6>Total Price</h6>
              <p>₹{order.totalPrice}</p>

              <h6>Shipping Address</h6>
              <p>
                {order.shippingAddress.address},
                {" "}
                {order.shippingAddress.city},
                {" "}
                {order.shippingAddress.postalCode},
                {" "}
                {order.shippingAddress.country}
              </p>

              <h6>Books</h6>

              <ul>
                {order.orderItems.map((item) => (
                  <li key={item._id}>
                    {item.title} × {item.quantity}
                  </li>
                ))}
              </ul>

            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;