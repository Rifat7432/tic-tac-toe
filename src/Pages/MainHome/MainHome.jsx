import React from "react";
import { Link } from "react-router-dom";

const MainHome = () => {
  return (
    <div className="w-1/4 mx-auto py-20">
      <div>
        <h4 className="text-3xl text-center italic">async</h4>
        <h2 className="text-5xl font-bold mt-10 text-center italic f">
          Tic Tac Toe
        </h2>
      </div>
      <div className="flex flex-col mt-52 pt-20">
        <Link to={"/Login"} className="btn btn-warning w-11/12 mx-auto mt-5">
          Login
        </Link>
        <Link to={"/SignUp"} className="btn btn-primary w-11/12 mx-auto mt-5">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default MainHome;
