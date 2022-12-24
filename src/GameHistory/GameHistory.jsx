import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Pages/ContextProvider/AuthProvider";
import { io } from "socket.io-client";

const Endpoint = "https://tic-tac-toe-server-teds.onrender.com";
const socket = io(Endpoint, { transports: ["websocket"] });

const GameHistory = ({ game }) => {
  const [getTurn, setGetTurn] = useState(true);
  useEffect(() => {
    socket.on("send-turn", (data) => {
      setGetTurn(data.a);
    });
  }, [socket]);
  const {
    player1,
    player2,
    winner,
    _id,
    Game,
    time,
    turn,
    machCompleted,
    draw,
  } = game;
  const [gameData, setGameData] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (player1 === user?.email) {
      fetch(`https://tic-tac-toe-server-pi.vercel.app/user/${player2}`)
        .then((res) => res.json())
        .then((data) => {
          setGameData(data);
        });
    } else {
      fetch(`https://tic-tac-toe-server-pi.vercel.app/user/${player1}`)
        .then((res) => res.json())
        .then((data) => {
          setGameData(data);
        });
    }
  }, [player1, player2, user, getTurn]);
  return (
    <div className="card  my-5 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Game with {gameData?.name}</h2>
        {draw ? (
          "It is a Draw"
        ) : (
          <div>
            {" "}
            {Game ? (
              <div>
                {" "}
                {machCompleted ? (
                  winner === user?.email ? (
                    "You won"
                  ) : (
                    "You lost"
                  )
                ) : (
                  <div>
                    {" "}
                    <p>
                      {turn
                        ? user?.email === player2
                          ? `${gameData?.name} just made their move !`
                          : "You have made your move!"
                        : user?.email === player1
                        ? `${gameData?.name} just made their move !`
                        : "You have made your move!"}
                    </p>
                    <p>
                      {turn
                        ? user?.email === player2
                          ? `It's your turn to play now`
                          : "Waiting for them"
                        : user?.email === player1
                        ? `It's your turn to play now`
                        : "Waiting for them"}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p>
                  {user?.email === player2
                    ? `Start the game`
                    : "Waiting for the starts"}
                </p>
              </div>
            )}
          </div>
        )}

        <p>{time}</p>
        <div className="card-actions ">
          <Link
            to={`/GameBord/${_id}`}
            className="btn w-11/12 mx-auto btn-warning"
          >
            {winner ? " View Game" : "Play"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameHistory;
