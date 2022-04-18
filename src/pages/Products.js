import React, { useEffect, useState } from "react";
import {
  addToCartThunk,
  deleteCartItemThunk,
  filterByProductNameThunk,
  filterCategoryThunk,
  getCategoriesThunk,
  getStoreProductsThunk,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import "../styles/products.css";

import { Link } from "react-router-dom";
import SearchFilterByPrice from "../components/SearchFilterbyPrice";

const Products = () => {
  const dispatch = useDispatch();

  const [productSearch, setProductSearch] = useState("");
  const storeProducts = useSelector((state) => state.storeProducts);
  const categories = useSelector((state) => state.categories);
  const [isFilterModalOn, setIsFilterModalOn] = useState(false);

  useEffect(() => {
    dispatch(getStoreProductsThunk());
    dispatch(getCategoriesThunk());
  }, []);

  //====== FILTER PRODUCTS BY PRICE =======
  const [products, setProducts] = useState(storeProducts);

  const priceFilter = (priceFrom, priceTo) => {
    setProducts(
      storeProducts.filter(
        (product) =>
          parseInt(product.price) > priceFrom &&
          parseInt(product.price) < priceTo
      )
    );
  };

  //=======================================

  const submitProductSearch = (e) => {
    e.preventDefault();
    dispatch(filterByProductNameThunk(productSearch));
  };

  const addToCart = (itemId) => {
    const itemData = {
      id: itemId,
      quantity: 1,
    };

    dispatch(addToCartThunk(itemData));
  };

  return (
    <div className="produts-container">
      <div className="search-box">
        <form onSubmit={submitProductSearch}>
          <input
            type="text"
            placeholder="Search by product name"
            value={productSearch}
            onChange={(e) => setProductSearch(e.target.value)}
          />
          <button>
            <span className="material-icons-outlined">search</span>
          </button>
        </form>
      </div>
      <button
        className="filter-button"
        onClick={() => setIsFilterModalOn(!isFilterModalOn)}
      >
        <span className="material-icons-outlined">filter_alt</span>
        <p>Filters</p>
      </button>
      <div
        className={`filter-modal ${isFilterModalOn ? "filter-is-open" : ""}`}
      >
        <button onClick={() => setIsFilterModalOn(!isFilterModalOn)}>
          <span className="material-icons-outlined close-button">close</span>
        </button>
        <h3>Filters</h3>
        <div className="filter-container">
          <SearchFilterByPrice priceFilter={priceFilter} />
        </div>
        <div className="filter-container">
          <h3 className="filter-title">Category</h3>
          <div>
            {categories?.map((category) => (
              <button
                className="filter-category"
                key={category.id}
                onClick={() => dispatch(filterCategoryThunk(category.id))}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <ul className="products-list">
        {storeProducts.length === 0 ? (
          <p>We have not found any matches with the search </p>
        ) : (
          (products.length > 0 ? products : storeProducts).map((product) => (
            <li key={product.id} className="product-card">
              <Link to={`/products/${product.id}`}>
                <div className="product-image">
                  <img src={product.productImgs?.[0]} alt="product" />
                </div>
                <div className="product-info">
                  <div>
                    <h3>{product.title}</h3>
                    <div>
                      <p>
                        <strong>Price</strong>
                      </p>
                      <h4>$ {product.price}</h4>
                    </div>
                  </div>
                </div>
              </Link>
              <button onClick={() => addToCart(product.id)}>
                <span className="material-icons-outlined">shopping_cart</span>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Products;
