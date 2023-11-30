import React, { useContext } from "react";
import { AppContext } from "../App";

function Letter({ stage, letterPos, attemptVal }) {
  const { board, boardColors } = useContext(AppContext);
  const letter = board[stage][attemptVal][letterPos];
  const color = boardColors[stage][attemptVal][letterPos];
  const colorClassMap = {
    0: "cell-reveal absent",
    1: "cell-reveal present",
    2: "cell-reveal correct",
  };


  return (
    <div 
    className={`letter ${colorClassMap[color] || ''}`}
    style={{
      ...(letter === " " ? { color: 'white', border: '0px' } : {}),
      animationDelay: `${350 * letterPos}ms`,
    }}
    >
      {letter}
    </div>
  );
}

export default Letter;