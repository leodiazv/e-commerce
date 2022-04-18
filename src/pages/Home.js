import React from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { setIsLoading } from "../redux/actions";

const Home = () => {
  return (
    <div>
      <Navigate to="/products" />
    </div>
  );
};

export default Home;
