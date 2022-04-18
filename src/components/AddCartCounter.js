import React from "react";
import "../styles/product-detail.css";

const AddCartCounter = ({ counter, setCounter }) => {
  const reduceCounter = () => {
    counter > 1 && setCounter(counter - 1);
  };

  return (
    <div className="counter-container">
      <button onClick={() => reduceCounter()}>-</button>
      <p>{counter}</p>
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </div>
  );
};

export default AddCartCounter;
