import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserCartThunk, loginThunk, setIsCartOpen } from "../redux/actions";
import CartModal from "./CartModal";
import "../styles/nav.css";

const NavBar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginError, setLoginError] = useState("");
  const isCartOpen = useSelector((state) => state.isCartOpen);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    const loginCredentials = {
      email,
      password,
    };

    dispatch(loginThunk(loginCredentials))
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        setLoginError("");
        setIsLoginOpen(false);
      })
      .catch((error) => {
        setLoginError(error.response.data.message);
      });
  };

  const openCart = () => {
    dispatch(setIsCartOpen(!isCartOpen));
    dispatch(getUserCartThunk());
  };

  return (
    <div>
      <nav>
        <Link to="/products">
          <h2>e-commerce</h2>
        </Link>
        <div>
          <button onClick={() => setIsLoginOpen(!isLoginOpen)}>
            <span className="material-icons-outlined">account_circle</span>
          </button>

          <button
            onClick={() =>
              localStorage.getItem("token")
                ? navigate("/purchases")
                : setIsLoginOpen(!isLoginOpen)
            }
          >
            <span className="material-icons-outlined">inventory_2</span>
          </button>

          <button
            onClick={() =>
              localStorage.getItem("token") ? openCart() : setIsLoginOpen(true)
            }
          >
            <span className="material-icons-outlined">shopping_cart</span>
          </button>

          <CartModal isCartOpen={isCartOpen} />
        </div>
      </nav>

      {isLoginOpen && (
        <div className="login-container">
          <div className="user-image">
            <span class="material-icons-outlined">account_circle</span>
          </div>

          <form onSubmit={login}>
            {localStorage.getItem("token") ? (
              <button
                type="button"
                onClick={() => {
                  localStorage.setItem("token", "");
                  setIsLoginOpen(false);
                  navigate("/products");
                }}
              >
                Log out
              </button>
            ) : (
              <div>
                <div className="test-login-info">
                  <h3>Test data</h3>
                  <p>
                    <span class="material-icons-outlined">email</span>
                    leo@gmail.com
                  </p>
                  <p>
                    <span class="material-icons-outlined">lock</span>
                    pass1234
                  </p>
                </div>
                <div className="login-form-container">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button>Login</button>
                  <p>{loginError}</p>
                </div>
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default NavBar;
