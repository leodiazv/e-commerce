import React from "react";
import "../styles/loading-screen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <svg className="loader" viewBox="0 0 100 100">
        <g className="points">
          <circle className="ciw" cx="50" cy="50" r="50" fill="#fff" />
          <circle className="ci2" cx="5" cy="50" r="4" />
          <circle className="ci1" cx="95" cy="50" r="4" />
        </g>
      </svg>
    </div>
  );
};

export default LoadingScreen;
