import React from "react";
import { useState, useEffect } from "react";
import GameBox from "../GameBox/GameBox";
import { io } from "socket.io-client";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../ContextProvider/AuthProvider";
import { toast } from "react-hot-toast";
import { FaChevronLeft } from "react-icons/fa";

const Endpoint = "https://tic-tac-toe-server-teds.onrender.com";
const socket = io(Endpoint, { transports: ["websocket"] });

const GameBord = () => {
  const { user, loading, setLoading } = useContext(AuthContext);
  const [gameData, setGameData] = useState(Array(9).fill(null));
  const [myGame, setMyGame] = useState({});
  const [plyerTurn, setPlyerTurn] = useState(true);
  const [isDisabled1, setIsDisabled1] = useState(myGame?.player1);
  const [gotWinner, setGotWinner] = useState(false);
  const [isWinner, setIsWinner] = useState("");
  const [gamer, setGamer] = useState({});

  const id = useParams();
  // console.log(myGame);
  // setInterval()
  useEffect(() => {
    setLoading(true);
    fetch(`https://tic-tac-toe-server-pi.vercel.app/game/${id?.id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setMyGame(data);
        setGotWinner(data.machCompleted);
        setIsWinner(data.winner);
        if (data?.turn) {
          setIsDisabled1(data?.player1);
          setPlyerTurn(data?.turn);
        } else {
          setIsDisabled1(data?.player2);
          setPlyerTurn(data?.turn);
        }
        socket.emit("room", { roomId: data?._id });
        if (data?.Game) {
          setGameData(data?.Game);
        }

        setLoading(false);
      });
  }, [id]);
  console.log(gotWinner);
  const game = (i) => {
    if (gotWinner) {
      return toast.success("Mach complete");
    }
    const newGameData = [...gameData];
    console.log(gotWinner);
    if (gotWinner === false) {
      newGameData[i] = plyerTurn ? "X" : "O";
      setGameData(newGameData);
      updateData(newGameData, !plyerTurn);
      setPlyerTurn(!plyerTurn);
      socket.emit("send-massage", { newGameData, room: `${id?.id}` });
      socket.emit("get-turn", { a: !plyerTurn, room: `${id?.id}` });

      if (
        newGameData[0] === newGameData[1] &&
        newGameData[1] === newGameData[2] &&
        newGameData[0] === newGameData[2] &&
        newGameData[0] !== null &&
        newGameData[1] !== null &&
        newGameData[2] !== null
      ) {
        setGotWinner(true);
        socket.emit("winner", { b: true, room: `${id?.id}` });
        if (newGameData[0] === "X") {
          addWinner(true, myGame?.player2);

          setIsWinner(myGame?.player2);
        } else {
          addWinner(true, myGame?.player1);

          setIsWinner(myGame?.player1);
        }
      } else if (
        newGameData[3] === newGameData[4] &&
        newGameData[4] === newGameData[5] &&
        newGameData[3] === newGameData[5] &&
        newGameData[3] !== null &&
        newGameData[4] !== null &&
        newGameData[5] !== null
      ) {
        setGotWinner(true);
        socket.emit("winner", { b: true, room: `${id?.id}` });
        if (newGameData[3] === "X") {
          addWinner(true, myGame?.player2);

          setIsWinner(myGame?.player2);
        } else {
          addWinner(true, myGame?.player1);

          setIsWinner(myGame?.player1);
        }
      } else if (
        newGameData[6] === newGameData[7] &&
        newGameData[7] === newGameData[8] &&
        newGameData[6] === newGameData[8] &&
        newGameData[6] !== null &&
        newGameData[7] !== null &&
        newGameData[8] !== null
      ) {
        setGotWinner(true);
        socket.emit("winner", { b: true, room: `${id?.id}` });
        if (newGameData[6] === "X") {
          addWinner(true, myGame?.player2);

          setIsWinner(myGame?.player2);
        } else {
          addWinner(true, myGame?.player1);

          setIsWinner(myGame?.player1);
        }
      } else if (
        newGameData[0] === newGameData[3] &&
        newGameData[3] === newGameData[6] &&
        newGameData[0] === newGameData[6] &&
        newGameData[0] !== null &&
        newGameData[3] !== null &&
        newGameData[6] !== null
      ) {
        setGotWinner(true);
        socket.emit("winner", { b: true, room: `${id?.id}` });
        if (newGameData[0] === "X") {
          addWinner(true, myGame?.player2);

          setIsWinner(myGame?.player2);
        } else {
          addWinner(true, myGame?.player1);

          setIsWinner(myGame?.player1);
        }
      } else if (
        newGameData[1] === newGameData[4] &&
        newGameData[7] === newGameData[8] &&
        newGameData[1] === newGameData[8] &&
        newGameData[1] !== null &&
        newGameData[4] !== null &&
        newGameData[7] !== null
      ) {
        setGotWinner(true);
        socket.emit("winner", { b: true, room: `${id?.id}` });
        if (newGameData[1] === "X") {
          addWinner(true, myGame?.player2);

          setIsWinner(myGame?.player2);
        } else {
          addWinner(true, myGame?.player1);

          setIsWinner(myGame?.player1);
        }
      } else if (
        newGameData[2] === newGameData[5] &&
        newGameData[5] === newGameData[8] &&
        newGameData[2] === newGameData[8] &&
        newGameData[2] !== null &&
        newGameData[5] !== null &&
        newGameData[8] !== null
      ) {
        setGotWinner(true);
        socket.emit("winner", { b: true, room: `${id?.id}` });
        if (newGameData[2] === "X") {
          addWinner(true, myGame?.player2);

          setIsWinner(myGame?.player2);
        } else {
          addWinner(true, myGame?.player1);

          setIsWinner(myGame?.player1);
        }
      } else if (
        newGameData[0] === newGameData[4] &&
        newGameData[4] === newGameData[8] &&
        newGameData[0] === newGameData[8] &&
        newGameData[0] !== null &&
        newGameData[4] !== null &&
        newGameData[8] !== null
      ) {
        setGotWinner(true);
        socket.emit("winner", { b: true, room: `${id?.id}` });
        if (newGameData[0] === "X") {
          addWinner(true, myGame?.player2);

          setIsWinner(myGame?.player2);
        } else {
          addWinner(true, myGame?.player1);

          setIsWinner(myGame?.player1);
        }
      } else if (
        newGameData[2] === newGameData[4] &&
        newGameData[4] === newGameData[6] &&
        newGameData[2] === newGameData[6] &&
        newGameData[2] !== null &&
        newGameData[4] !== null &&
        newGameData[6] !== null
      ) {
        setGotWinner(true);

        socket.emit("winner", { b: true, room: `${id?.id}` });
        if (newGameData[2] === "X") {
          addWinner(true, myGame?.player2);

          setIsWinner(myGame?.player2);
        } else {
          addWinner(true, myGame?.player1);

          setIsWinner(myGame?.player1);
        }
      } else {
        console.log("draw1");
        if (
          newGameData[0] !== null &&
          newGameData[2] !== null &&
          newGameData[3] !== null &&
          newGameData[4] !== null &&
          newGameData[5] !== null &&
          newGameData[6] !== null &&
          newGameData[7] !== null &&
          newGameData[8] !== null
        ) {
          console.log("draw");
          addDraw(true, true);
        }
      }
    }

    console.log();
  };

  useEffect(() => {
    setLoading(true);
    if (plyerTurn) {
      setIsDisabled1(myGame?.player1);
      // console.log(myGame, plyerTurn);
    } else {
      setIsDisabled1(myGame?.player2);
      // console.log(myGame?.player2, plyerTurn);
    }
    setLoading(false);
  }, [plyerTurn]);

  const updateData = (data, turn) => {
    setLoading(true);
    fetch(`https://tic-tac-toe-server-pi.vercel.app/game/${id?.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ data, turn }),
    })
      .then((res) => res.json())
      .then(() => {
        setLoading(false);
      });
  };
  const addDraw = (machCompleted, draw) => {
    setLoading(true);
    fetch(`https://tic-tac-toe-server-pi.vercel.app/draw/${id?.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ machCompleted, draw }),
    })
      .then((res) => res.json())
      .then(() => {
        setLoading(false);
      });
  };
  const addWinner = (machCompleted, winner) => {
    setLoading(true);
    fetch(`https://tic-tac-toe-server-pi.vercel.app/winner/${id?.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ machCompleted, winner }),
    })
      .then((res) => res.json())
      .then(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    socket.on("receive-massage", (data) => {
      setGameData(data.newGameData);
    });
    socket.on("send-turn", (data) => {
      setPlyerTurn(data.a);
    });
    socket.on("send-winner", (data) => {
      setGotWinner(data.b);
    });
    setLoading(false);
  }, [socket]);
  useEffect(() => {
    if (myGame?.player1 === user?.email) {
      fetch(`https://tic-tac-toe-server-pi.vercel.app/user/${myGame?.player2}`)
        .then((res) => res.json())
        .then((data) => {
          setGamer(data);
        });
    } else {
      fetch(`https://tic-tac-toe-server-pi.vercel.app/user/${myGame?.player1}`)
        .then((res) => res.json())
        .then((data) => {
          setGamer(data);
        });
    }
  }, [myGame?.player1, myGame?.player2, user]);
  return (
    <>
      {loading ? (
        <div className="w-16 mt-32 mx-auto h-16 border-4 border-dashed rounded-full animate-spin border-amber-400"></div>
      ) : (
        <div className="relative mx-auto p1-5 w-full sm:w-96">
          <div className="absolute top-5 left-2">
            <Link to={"/"}>
              <FaChevronLeft></FaChevronLeft>
            </Link>
          </div>
          <div>
            <p className="text-4xl mt-5 font-bold">Game with {gamer?.name}</p>
            <p className="text-xl my-2 font-bold">Your Piece</p>
            <p className="text-5xl font-bold">
              {myGame?.player2 === user?.email ? "X" : "O"}
            </p>
          </div>
          <div className=" flex justify-center mt-5 h-14 bg-orange-300 items-center">
            {gotWinner ? (
              isWinner === user?.email ? (
                "You win"
              ) : (
                "Your opponent win"
              )
            ) : myGame?.draw ? (
              `It's draw`
            ) : (
              <p className="text-xl font-bold">
                {plyerTurn
                  ? myGame?.player2 === user?.email
                    ? "your move"
                    : "Their move"
                  : myGame?.player1 === user?.email
                  ? "your move"
                  : "Their move"}
              </p>
            )}
            {/*  */}
          </div>
          <button className="grid grid-cols-3 rounded grid-rows-3 w-full mx-auto">
            {gameData.map((c, i) => (
              <GameBox
                key={i}
                game={game}
                i={i}
                isDisabled1={isDisabled1}
                data={c}
              ></GameBox>
            ))}
          </button>
        </div>
      )}
    </>
  );
};

export default GameBord;
