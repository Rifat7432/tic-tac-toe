import React from "react";
import { useContext } from "react";
import { AuthContext } from "../ContextProvider/AuthProvider";

const GameBox = ({ data, i, game, isDisabled1 }) => {
  const { user } = useContext(AuthContext);

  return (
    <button
      disabled={data !== null ? true : isDisabled1 === user?.email}
      onClick={() => game(i)}
      className="border-4 border-orange-300 text-5xl  font-bold h-40  flex justify-center items-center hover:bg-slate-200"
    >
      {data}
    </button>
  );
};

export default GameBox;
