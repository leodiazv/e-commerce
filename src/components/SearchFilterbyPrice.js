import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getProductsThunk } from "../redux/actions";

const SearchFilterByPrice = ({ priceFilter }) => {
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [isShowingPriceAlert, setIsShowingPriceAlert] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    if (priceTo < priceFrom) {
      setIsShowingPriceAlert(true);
    } else {
      priceFilter(priceFrom, priceTo);
      setIsShowingPriceAlert(false);
    }
    /* console.log(priceFrom, priceTo); */
  };
  return (
    <div>
      <div className="price-filter">
        <h3 className="filter-title">Price</h3>
        <form>
          <div>
            <label htmlFor="from">
              From
              <input
                type="number"
                id="from"
                value={priceFrom}
                onChange={(e) => setPriceFrom(e.target.value)}
                required
                placeholder=""
              />
            </label>
          </div>
          <div>
            <label htmlFor="to">
              To
              <input
                type="number"
                id="to"
                value={priceTo}
                onChange={(e) => setPriceTo(e.target.value)}
                required
              />
            </label>
          </div>

          <button onClick={submit} className="filter-price-button">
            Filter price
          </button>
        </form>
        {isShowingPriceAlert === true && <p>To price must be greater</p>}
      </div>
      <div className="category-filter"></div>
    </div>
  );
};

export default SearchFilterByPrice;
