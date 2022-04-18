import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserPurchaseThunk } from "../redux/actions";
import "../styles/purchases.css";
import { Link } from "react-router-dom";
import moment from "moment";

const Purchases = () => {
  const dispatch = useDispatch();
  const userPurchase = useSelector((state) => state.userPurchase);

  console.log(userPurchase);

  useEffect(() => {
    dispatch(getUserPurchaseThunk());
  }, []);

  return (
    <div className="purchases-container">
      <h1> My purchases</h1>

      {userPurchase.map((purchase) => (
        <div key={purchase.id} className="purchase">
          <h3>{moment(purchase.createdAt).format("LL")}</h3>

          <ul>
            {purchase.cart.products.map((item) => (
              <Link key={item.id} to={`/products/${item.id}`}>
                <li>
                  <p>{item.title}</p>
                  <div className="quantity">{item.productsInCart.quantity}</div>
                  <div className="price">
                    $ {item.price * item.productsInCart.quantity}
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Purchases;
