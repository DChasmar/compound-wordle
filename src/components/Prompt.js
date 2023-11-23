import React, { useContext, useState } from 'react';
import { AppContext } from '../App'

function Prompt() {
    const { hidePrompt } = useContext(AppContext);
    const [isVisible, setIsVisible] = useState(true); // Use state to manage visibility

    const iconGrid = [
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""],
        ["", "", "", "", ""]
    ];

    const iconColors = [
        [
            [0, 1, 1, 0, 0],
            [2, 0, 0, 1, 0],
            [2, 0, 1, 0, 1],
            [2, 2, 2, 0, 0]
        ],
        [
            [0, 2, 0, 0, 0],
            [1, 0, 0, 1, 0],
            [0, 2, 2, 0, 1],
            [1, 2, 2, 0, 2],
        ],
    ];

    const practice = () => {
      setIsVisible(false); // Trigger the fade-out effect
      setTimeout(() => hidePrompt(), 500);
    }

  return (
    <div className={`prompt ${isVisible ? '' : 'hidden'}`}>
        <div className='icon-container'>
            <div className="grid-container" style={{ gridTemplateRows: 'repeat(4, 1fr)', gap: 'min(0.8vh, 0.8vw)', padding: '20px'}}>
            {iconGrid.map((row, rowIndex) => (
                <div className="grid-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: 'min(0.8vh, 0.8vw)'}} key={rowIndex}>
                {row.map((_, columnIndex) => (
                    <div className="grid-cell" key={columnIndex}>
                        <div className="icon-circle"
                        id={iconColors[0][rowIndex][columnIndex] === 2 ? 'correct' : 
                        iconColors[0][rowIndex][columnIndex] === 1 ? 'almost' : 
                        iconColors[0][rowIndex][columnIndex] === 0 ? 'error' : undefined}></div>
                    </div>
                ))}
                </div>
            ))}
            </div>
            <div className="separator"></div>
            <div className="grid-container" style={{ gridTemplateRows: 'repeat(4, 1fr)', gap: 'min(0.8vh, 0.8vw)', padding: '20px'}}>
            {iconGrid.map((row, rowIndex) => (
                <div className="grid-row" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: 'min(0.8vh, 0.8vw)'}} key={rowIndex}>
                {row.map((_, columnIndex) => (
                    <div className="grid-cell" key={columnIndex}>
                        <div className="icon-circle" 
                        id={iconColors[1][rowIndex][columnIndex] === 2 ? 'correct' : 
                        iconColors[1][rowIndex][columnIndex] === 1 ? 'almost' : 
                        iconColors[1][rowIndex][columnIndex] === 0 ? 'error' : undefined}></div>
                    </div>
                ))}
                </div>
            ))}
            </div>
        </div>
        
        <h1 style={{color: 'black'}}>Compound Wordle</h1>
        <button className="play-button" onClick={practice}>
            Play
        </button>
    </div>
  );
}

export default Prompt;