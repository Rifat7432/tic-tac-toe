import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import GameHistory from "../../GameHistory/GameHistory";
import { AuthContext } from "../ContextProvider/AuthProvider";

const YourGames = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [data, setData] = useState([]);
  useEffect(() => {
    setLoading(true);
    fetch(`https://tic-tac-toe-server-pi.vercel.app/myGame/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setData(data);
      });
  }, [loading,user?.email]);
  return (
    <div className="w-96 mx-auto">
      <h3 className="text-xl">Your Games</h3>
      {data.length > 0 ? (
        <div className="relative">
          
          {data.map((game) => (
            <GameHistory key={game?._id} game={game}></GameHistory>
          ))}
          <div className="fixed bottom-24 right-1/3">
            <Link to={"/Joining"} className="btn add">
              <strong className="text-xl"> + </strong>New Game
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-5xl font-bold f">No Games Found</h1>
          <Link to={"/Joining"} className="btn btn-warning ">
            Start A New Game
          </Link>
        </div>
      )}
    </div>
  );
};

export default YourGames;