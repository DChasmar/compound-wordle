import React, { useContext } from "react";
import { AppContext } from "../App";

function Key({ keyVal, bigKey }) {
  const { currAttempt, gameOver, onSelectLetter, onDelete, onEnter, greenLetters, yellowLetters, greyLetters } =
    useContext(AppContext);

  const selectLetter = () => {
    if (gameOver.gameOver) return;
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  };

  const green = greenLetters[currAttempt.stage].has(keyVal.toLowerCase());
  const yellow = yellowLetters[currAttempt.stage].has(keyVal.toLowerCase());
  const grey = greyLetters[currAttempt.stage].has(keyVal.toLowerCase());
  const oneTrue = green || yellow || grey;

  return (
    <div
      className="key"
      id={bigKey ? "big" : green ? 'correct' : yellow ? 'almost' : grey ? 'error' : undefined}
      style={oneTrue ? {color: 'white'} : undefined}
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
}

export default Key;