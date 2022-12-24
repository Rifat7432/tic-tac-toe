import React from "react";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../ContextProvider/AuthProvider";
import { FaChevronLeft } from "react-icons/fa";

const Joining = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const join = (event) => {
    event.preventDefault();
    const email = event.target.room.value;
    setLoading(true);
    fetch("https://tic-tac-toe-server-pi.vercel.app/game/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        player1: email,
        player2: user?.email,
        time: new Date().toLocaleString(),
        turn: true,
        machCompleted: false,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data?.acknowledged === false) {
          toast.error("invalid email ! , Please enter a valid email");
          event.target.reset();
        } else {
          navigate(`/GameBord/${data?._id}`);
        }
      });
  };
  return (
    <div className="w-96 mx-auto relative shadow-2xl bg-base-100 mt-16 py-16 px-10">
      <div className="absolute top-2 left-2">
        <Link to={"/"}>
          <FaChevronLeft></FaChevronLeft>
        </Link>
      </div>
      <h1 className="text-xl mt-2">Start A New Game</h1>
      <h1 className="text-4xl font-bold mt-5">
        Whom do you want to play with?
      </h1>
      <form onSubmit={join}>
        <input
          placeholder="Enter your opponent email"
          className="input input-bordered w-full max-w-xs mt-10"
          name="room"
          type="email"
        />
        <button className="btn btn-warning mt-32 w-11/12 mx-auto ">
          Start Game
        </button>
      </form>
    </div>
  );
};

export default Joining;
