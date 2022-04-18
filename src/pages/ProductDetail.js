import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { AddCartCounter, AddItemError } from "../components";
import {
  addToCartThunk,
  getStoreProductsThunk,
  setIsCartOpen,
} from "../redux/actions";
import "../styles/product-detail.css";

const ProductDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStoreProductsThunk());
    dispatch(setIsCartOpen(false));
  }, [dispatch]);

  const products = useSelector((state) => state.storeProducts);
  const product = products.find((product) => product.id === Number(id));

  const suggestedProducts = products.filter(
    (sugPro) =>
      sugPro.category.name === product.category.name && sugPro.id !== product.id
  );

  // Add to cart functions

  const [counter, setCounter] = useState(1);
  const [isAddToCartError, setIsAddToCartError] = useState(false);

  const addToCart = (e) => {
    e.preventDefault();

    const itemData = {
      id: id,
      quantity: counter,
    };

    dispatch(addToCartThunk(itemData));
  };

  console.log(products);

  return (
    <div>
      <div className="product-container">
        <img src={product?.productImgs[0]} alt="product" />
        <div className="product-info">
          <h2>{product?.title}</h2>
        </div>
        <div className="product-options">
          <div className="product-price">
            <div className="price-label">
              <p>Price</p>
              <strong>$ {product?.price}</strong>
            </div>
          </div>
          <div className="add-cart-container">
            <p>Quantity</p>
            <AddCartCounter counter={counter} setCounter={setCounter} />
          </div>
        </div>
        <button className="add-cart-button" onClick={addToCart}>
          Add to Cart
        </button>
        <p className="product-description">{product?.description}</p>
        <div className="product-suggest-container">
          {suggestedProducts.map((product) => (
            <div className="suggested-product">
              <Link key={product.id} to={`/products/${product.id}`}>
                <img src={product.productImgs[0]} alt="suggested product" />
                <div className="product-info">
                  <h3>{product.title}</h3>
                  <div className="product-options">
                    <div className="product-price">
                      <p>Price</p>
                      {`$ ${product?.price}`}
                    </div>
                    <div className="add-to-card">
                      <button onClick={() => addToCart(product.id)}>
                        <span className="material-icons-outlined">
                          shopping_cart
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
