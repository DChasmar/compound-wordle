import React, { useContext, useEffect } from "react";
import { AppContext } from "../App";

function Letter({ stage, letterPos, attemptVal }) {
  const { board, boardColors, gameOver, tuple } = useContext(AppContext);
  const letter = board[stage][attemptVal][letterPos];
  const color = boardColors[stage][attemptVal][letterPos];
  const colorClassMap = {
    0: "cell-reveal absent",
    1: "cell-reveal present",
    2: "cell-reveal correct",
  };

  // useEffect(() => {
  //   if (won) console.log(`${stage}${attemptVal} is won`);
  // }, [gameOver]);

  return (
    <div 
    className={`letter ${colorClassMap[color] || ''}`}
    style={{
      ...(letter === " " ? { color: 'white', border: '0px' } : {}),
      animationDelay: `${300 * letterPos}ms`,
    }}
    >
      {letter}
    </div>
  );
}

export default Letter;