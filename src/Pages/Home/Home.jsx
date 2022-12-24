import React from "react";
import { useContext } from "react";
import { AuthContext } from "../ContextProvider/AuthProvider";
import MainHome from "../MainHome/MainHome";
import YourGames from "../YourGames/YourGames";

const Home = () => {
  const { user } = useContext(AuthContext);
  return <div>{user ? <YourGames></YourGames> : <MainHome></MainHome>}</div>;
};

export default Home;
