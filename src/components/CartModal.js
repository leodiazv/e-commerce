import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCartItemThunk, purchaseThunk } from "../redux/actions";
import "../styles/cart-modal.css";

const CartModal = ({ isCartOpen }) => {
  const userCart = useSelector((state) => state.userCart);

  const dispatch = useDispatch();

  const addPrices = () => {
    let lastPrice = 0;

    for (let i = 0; i < userCart.length; i++) {
      lastPrice += parseInt(userCart[i].price);
    }

    return lastPrice;
  };

  return (
    <div className={`cart-modal ${isCartOpen ? "is-open" : ""}`}>
      <h3>Carrito de compras</h3>

      <ul>
        {userCart.length === 0 ? (
          <p>El carrito esta vacio</p>
        ) : (
          userCart.map((item) => (
            <li key={item.id} className="cart-item">
              <Link to="/products/item.id">
                <h4>{item.brand}</h4>
                <p>{item.title}</p>
              </Link>
              <input
                type="text"
                value={item.productsInCart.quantity}
                onChange={(e) => e.target.value}
              />
              <p className="total-price">
                Total:
                <strong>${item.price * item.productsInCart.quantity}</strong>
              </p>

              <button onClick={() => dispatch(deleteCartItemThunk(item.id))}>
                <span className="material-icons-outlined">delete</span>
              </button>
            </li>
          ))
        )}
      </ul>
      <div className="checkout-container">
        <div>
          <p>Total </p>
          {`$ ${addPrices()}`}
        </div>
        <button onClick={() => dispatch(purchaseThunk())}>Checkout</button>
      </div>
    </div>
  );
};

export default CartModal;
