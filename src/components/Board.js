import React, { useContext } from "react";
import Letter from "./Letter";
import { AppContext } from "../App";

function Board() {
  const { tuple } = useContext(AppContext);
  const numRows = 4;

  const scale = window.innerWidth <= 768 ? (window.innerWidth - 60) / tuple[2] : 60;

  return (
    <div>
      <div className="board-container" style={{gridTemplateColumns: `${100 * tuple[0] / tuple[2]}% ${100 * tuple[1] / tuple[2]}%`}}>
        <div className="board" style={{width: `${scale * tuple[0]}px`, height: `${(scale + 3) * 4}px`}}>
        {Array.from({ length: numRows }, (_, rowIndex) => (
          <div className="row1" style={{ gridTemplateColumns: `${'repeat(' + tuple[0] + ', 1fr)'}` }} key={rowIndex}>
            {Array.from({ length: tuple[0] }, (_, colIndex) => (
              <Letter key={colIndex} stage={0} letterPos={colIndex} attemptVal={rowIndex} />
            ))}
          </div>
        ))}
        </div>
        <div className="board" style={{width: `${scale * tuple[1]}px`, height: `${(scale + 3) * 4}px`}}>
        {Array.from({ length: numRows }, (_, rowIndex) => (
          <div className="row2" style={{ gridTemplateColumns: `${'repeat(' + tuple[1] + ', 1fr)'}` }} key={rowIndex}>
            {Array.from({ length: tuple[1] }, (_, colIndex) => (
              <Letter key={colIndex} stage={1} letterPos={colIndex} attemptVal={rowIndex} />
            ))}
          </div>
        ))}
        </div>
      </div>
      <div className="row3" style={{ gridTemplateColumns: `${'repeat(' + tuple[2] + ', 1fr)'}`, width: `${scale * tuple[2]}px`, height: `${scale + 16}px` }}>
        {Array.from({ length: tuple[2] }, (_, colIndex) => (
          <Letter key={colIndex} stage={2} letterPos={colIndex} attemptVal={0} />
        ))}
      </div>
    </div>
  );
}

export default Board;