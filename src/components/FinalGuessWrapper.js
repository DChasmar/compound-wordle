import React, { useContext } from "react";
import Letter from "./Letter";
import { AppContext } from "../App";

function FinalGuessWrapper({ stage, letterPos, attemptVal }) {
  const { gameOver, boardColors } = useContext(AppContext);

  const won = gameOver.gameOver && boardColors[2].every((val) => val === 2);

  return (
    <div className={`final-guess-wrapper ${won ? 'winning-animation' : ''}`}>
      <Letter key={attemptVal} stage={stage} letterPos={letterPos} attemptVal={attemptVal} />
    </div>
  );
}

export default FinalGuessWrapper;