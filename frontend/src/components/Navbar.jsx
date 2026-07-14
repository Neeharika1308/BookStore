import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const navigate = useNavigate();
  const { cart } = useContext(CartContext);

  const user = JSON.parse(localStorage.getItem("user"));

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
    <div className="container">

      <Link className="navbar-brand fw-bold" to="/">
        Book Store
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">

        <ul className="navbar-nav me-auto">

          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              Cart ({cart.length})
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/wishlist">
               Wishlist
            </Link>
           </li>

          <li className="nav-item">
            <Link className="nav-link" to="/orders">
              My Orders
            </Link>
          </li>

          {user?.isAdmin && (
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Admin
              </Link>
            </li>
          )}
          <li className="nav-item">
          <Link className="nav-link" to="/profile">
           Profile
         </Link>
         </li>
         <li className="nav-item">
        <Link className="nav-link" to="/about">
         About
       </Link>
         </li>

      <li className="nav-item">
      <Link className="nav-link" to="/contact">
        Contact
     </Link>
     </li>

        </ul>

        <ul className="navbar-nav">

          {user ? (
            <>
              <li className="nav-item">
                <span className="nav-link">
                  Hi, {user.name}
                </span>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-danger ms-2"
                  onClick={logoutHandler}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}

        </ul>

      </div>

    </div>
  </nav>
);
}

export default Navbar;