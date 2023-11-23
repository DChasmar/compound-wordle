import React, { useContext } from "react";
import { AppContext } from "../App";

function Letter({ stage, letterPos, attemptVal }) {
  const { board, boardColors } = useContext(AppContext);
  const letter = board[stage][attemptVal][letterPos];
  const color = boardColors[stage][attemptVal][letterPos];


  return (
    <div 
    className="letter" 
    id={color === 0 ? "error" : color === 1 ? "almost" : color === 2 ? "correct" : undefined}
    style={color >= 0 ? {color: 'white', border: '0px'} : undefined}
    >
      {letter}
    </div>
  );
}

export default Letter;