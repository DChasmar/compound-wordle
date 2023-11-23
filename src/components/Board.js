import React, { useContext } from "react";
import Letter from "./Letter";
import { AppContext } from "../App";

function Board() {
  const { tuple } = useContext(AppContext);
  const numRows = 4;

  return (
    <div>
      <div className="board-container" style={{gridTemplateColumns: `${100 * tuple[0] / (tuple[0] + tuple[1])}% ${tuple[1] / (100 * tuple[0] + tuple[1])}%`}}>
        <div className="board" style={{ width: `${60 * tuple[0]}px` }}>
        {Array.from({ length: numRows }, (_, rowIndex) => (
          <div className="row" style={{ gridTemplateColumns: `${'repeat(' + tuple[0] + ', 1fr)'}` }} key={rowIndex}>
            {Array.from({ length: tuple[0] }, (_, colIndex) => (
              <Letter key={colIndex} stage={0} letterPos={colIndex} attemptVal={rowIndex} />
            ))}
          </div>
        ))}
        </div>
        <div className="board" style={{ width: `${60 * tuple[1]}px`}}>
        {Array.from({ length: numRows }, (_, rowIndex) => (
          <div className="row" style={{ gridTemplateColumns: `${'repeat(' + tuple[1] + ', 1fr)'}` }} key={rowIndex}>
            {Array.from({ length: tuple[1] }, (_, colIndex) => (
              <Letter key={colIndex} stage={1} letterPos={colIndex} attemptVal={rowIndex} />
            ))}
          </div>
        ))}
        </div>
      </div>
      <div className="final-guess" style={{ gridTemplateColumns: `${'repeat(' + tuple[2] + ', 1fr)'}`, width: `${60 * tuple[2]}px` }}>
        {Array.from({ length: tuple[2] }, (_, colIndex) => (
          <Letter key={colIndex} stage={2} letterPos={colIndex} attemptVal={0} />
        ))}
      </div>
    </div>
  );
}

export default Board;