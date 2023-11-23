import React, { useContext } from "react";
import { AppContext } from "../App";

function GameOver() {
  const { gameOver, correctWord, playAgain } = useContext(AppContext);
  const anotherOne = () => {
    playAgain();
  };
  return (
    <div className="game-over">
      <h3>
        {gameOver.guessedWord
          ? "Correct!"
          : "Nice try."}
      </h3>
      <h1>{correctWord[2].toUpperCase()}</h1>
      <button className="play-button" onClick={anotherOne}>
            Play
        </button>
    </div>
  );
}

export default GameOver;