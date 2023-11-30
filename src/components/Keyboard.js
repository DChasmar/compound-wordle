import React, { useCallback, useEffect, useContext } from "react";
import Key from "./Key";
import { AppContext } from "../App";

function Keyboard() {
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"]
  ];

  const {
    currAttempt,
    gameOver,
    onSelectLetter,
    onEnter,
    onDelete,
    disableKeyPressRef
  } = useContext(AppContext);

  const handleKeyboard = useCallback(
    (event) => {
      if (disableKeyPressRef.current === true) return;
      if (event.key === "Enter") {
        onEnter();
      }
      if (!gameOver.gameOver) {
        if (event.key === "Backspace") {
          onDelete();
        } else {
          keys[0].forEach((key) => {
            if (event.key.toLowerCase() === key.toLowerCase()) {
              onSelectLetter(key);
            }
          });
          keys[1].forEach((key) => {
            if (event.key.toLowerCase() === key.toLowerCase()) {
              onSelectLetter(key);
            }
          });
          keys[2].forEach((key) => {
            if (event.key.toLowerCase() === key.toLowerCase()) {
              onSelectLetter(key);
            }
          });
        }
      }
    },
    [currAttempt]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keys[0].map((key) => {
          return <Key keyVal={key} key={key} />;
        })}
      </div>
      <div className="line2">
        {keys[1].map((key) => {
          return <Key keyVal={key} key={key} />;
        })}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey key={"ENTER"} />
        {keys[2].map((key) => {
          return <Key keyVal={key} key={key} />;
        })}
        <Key keyVal={"DELETE"} bigKey key={"DELETE"} />
      </div>
    </div>
  );
}

export default Keyboard;