import './App.css';
import React, { useState, createContext, useEffect, useRef } from "react";
import Prompt from './components/Prompt';
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import { boardDefault, boardColorsDefault, generateWordSets, chooseTuple } from "./components/Words";

export const AppContext = createContext();

function App() {
  const [currAttempt, setCurrAttempt] = useState({ stage: 0, attempt: 0, letter: 0 });
  const [board, setBoard] = useState(boardDefault);
  const [boardColors, setBoardColors] = useState(boardColorsDefault);
  const [tuple, setTuple] = useState([5, 5, 10]);
  
  const [wordSet, setWordSet] = useState(new Set());
  const [compoundSets, setCompoundSets] = useState({
    "33": new Set(),
    "34": new Set(),
    "35": new Set(),
    "43": new Set(),
    "44": new Set(),
    "45": new Set(),
    "53": new Set(),
    "54": new Set(),
    "55": new Set(),
    "56": new Set(),
    "65": new Set(),
    "66": new Set(),
  });

  const [correctWord, setCorrectWord] = useState(["", "", ""]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  const [greenLetters, setGreenLetters] = useState({
    0: new Set(),
    1: new Set(),
    2: new Set(),
  });
  const [yellowLetters, setYellowLetters] = useState({
    0: new Set(),
    1: new Set(),
    2: new Set(),
  });
  const [greyLetters, setGreyLetters] = useState({
    0: new Set(),
    1: new Set(),
    2: new Set(),
  });

  const disableKeyPressRef = useRef(false);

  useEffect(() => {
    const fetchDataAndInitialize = async () => {
      const wordSets = await generateWordSets();
      setWordSet(wordSets.wordSet);
      setCompoundSets({
        "33": new Set(wordSets.compoundSets[33]),
        "34": new Set(wordSets.compoundSets[34]),
        "35": new Set(wordSets.compoundSets[35]),
        "43": new Set(wordSets.compoundSets[43]),
        "44": new Set(wordSets.compoundSets[44]),
        "45": new Set(wordSets.compoundSets[45]),
        "53": new Set(wordSets.compoundSets[53]),
        "54": new Set(wordSets.compoundSets[54]),
        "55": new Set(wordSets.compoundSets[55]),
        "56": new Set(wordSets.compoundSets[56]),
        "65": new Set(wordSets.compoundSets[65]),
        "66": new Set(wordSets.compoundSets[66]),
      });
      const tempTuple = wordSets.chosenTuple;
      const tupleSum = wordSets.chosenTuple[0] + wordSets.chosenTuple[1];
      tempTuple.push(tupleSum);
      setTuple(tempTuple);
      setBoard([
        Array.from({ length: 4 }, () => Array(wordSets.chosenTuple[0]).fill("")), 
        Array.from({ length: 4 }, () => Array(wordSets.chosenTuple[1]).fill("")),
        Array.from({ length: 1 }, () => Array(tupleSum).fill(""))
      ])
      setBoardColors([
        Array.from({ length: 4 }, () => Array(wordSets.chosenTuple[0]).fill(-1)),
        Array.from({ length: 4 }, () => Array(wordSets.chosenTuple[1]).fill(-1)),
        Array.from({ length: 1 }, () => Array(tupleSum).fill(-1))
      ]);

      const firstPart = wordSets.randomCompoundWord.slice(0, wordSets.chosenTuple[0]);
      const secondPart = wordSets.randomCompoundWord.slice(wordSets.chosenTuple[0]);
      setCorrectWord([firstPart, secondPart, wordSets.randomCompoundWord]);
    }
  
    fetchDataAndInitialize();
  }, []);

  // useEffect(() => {
  //   console.log(correctWord);
  // }, [correctWord]);

  const mergeColors = (uniqueGreenLetters, uniqueYellowLetters, uniqueGreyLetters) => {
    let green2 = new Set();
    let yellow2 = new Set();
    let grey2 = new Set();
    greenLetters[0].forEach((value) => {
      green2.add(value);
    });
    uniqueGreenLetters.forEach((value) => {
      green2.add(value);
    });
    yellowLetters[0].forEach((value) => {
      if (!green2.has(value)) {
        yellow2.add(value);
      };
    });
    uniqueYellowLetters.forEach((value) => {
      if (!green2.has(value)) {
        yellow2.add(value);
      };
    });
    greyLetters[0].forEach((value) => {
      if (uniqueGreyLetters.has(value) && !green2.has(value) && !yellow2.has(value)) {
        grey2.add(value);
      }
    });
    setGreenLetters((prevGreenLetters) => ({
      ...prevGreenLetters,
      2: green2
    }));
    setYellowLetters((prevYellowLetters) => ({
      ...prevYellowLetters,
      2: yellow2
    }));
    setGreyLetters((prevGreyLetters) => ({
      ...prevGreyLetters,
      2: grey2
    }));
  };

  const gotBothWords = () => {
    disableKeyPressRef.current = true;
    const correctWordArray = correctWord[2].split("");
    const newBoard = [...board];
    for (let i = 0; i < tuple[2]; i++) newBoard[2][0][i] = correctWordArray[i].toUpperCase();
    setBoard(newBoard);
    setCurrAttempt({ stage: 2, attempt: 0, letter: tuple[2]});
    const newColors = [...boardColors];
    newColors[2] = Array.from({ length: 1 }, () => Array(tuple[2]).fill(2));
    setBoardColors(newColors);
    setTimeout(() => {
      setGameOver({ gameOver: true, guessedWord: true });
      disableKeyPressRef.current = false;
    }, 300 * (tuple[2] + 1));
  };

  const registerAndReset = (updatedGuessColors, uniqueGreenLetters, uniqueYellowLetters, uniqueGreyLetters) => {
    const newColors = [...boardColors];
    newColors[currAttempt.stage][currAttempt.attempt] = updatedGuessColors;
    setBoardColors(newColors);
    setTimeout(() => {
      setGreenLetters((prevGreenLetters) => ({
        ...prevGreenLetters,
        [currAttempt.stage]: uniqueGreenLetters
      }));
      setYellowLetters((prevYellowLetters) => ({
        ...prevYellowLetters,
        [currAttempt.stage]: uniqueYellowLetters
      }));
      setGreyLetters((prevGreyLetters) => ({
        ...prevGreyLetters,
        [currAttempt.stage]: uniqueGreyLetters
      }));
      const allGreen = updatedGuessColors.every(value => value === 2);
      if (currAttempt.stage < 2) {
        if (allGreen || currAttempt.attempt === 3) {
          if (currAttempt.attempt < 3) {
            const newBoard = [...board];
            for (let i = currAttempt.attempt + 1; i < 4; i++) {
              newBoard[currAttempt.stage][i] = Array(tuple[currAttempt.stage]).fill(" ");
            }
            setBoard(newBoard);
          }
          if (currAttempt.stage === 1) mergeColors(uniqueGreenLetters, uniqueYellowLetters, uniqueGreyLetters);
          const firstSolved = boardColors[0][3].every(value => value === 2) || board[0][3].every(value => value === " ");
          const secondSolved = boardColors[1][3].every(value => value === 2) || board[1][3].every(value => value === " ");
          if (firstSolved & secondSolved) gotBothWords();
          else setCurrAttempt({ stage: currAttempt.stage + 1, attempt: 0, letter: 0 });
        } else if (currAttempt.attempt < 3) {
          setCurrAttempt({ stage: currAttempt.stage, attempt: currAttempt.attempt + 1, letter: 0 });
        }
      } else if (currAttempt.stage === 2) {
        if (allGreen) {
          setGameOver({
            gameOver: true,
            guessedWord: true,
          });
        } else {
          setGameOver({
            gameOver: true,
            guessedWord: false,
          });
        }
      }
    }, 300 * (tuple[currAttempt.stage] + 1));
  };

  const findGrey = (wordGuess, updatedGuessColors, uniqueGreenLetters, uniqueYellowLetters) => {
    let newGreyLetters = new Set(greyLetters[currAttempt.stage]);
    for (let i = 0; i < wordGuess.length; i++) {
        if (wordGuess[i] !== "_") {
            newGreyLetters.add(wordGuess[i])
            updatedGuessColors[i] = 0;
        }
    }
    // Remove values from newGreyLetters if they are also present in greenLetters or yellowLetters
    newGreyLetters.forEach(key => {
      if (uniqueGreenLetters.has(key) || uniqueYellowLetters.has(key)) {
        newGreyLetters.delete(key);
      }
    });
    // setGreyLetters(newGreyLetters);
    registerAndReset(updatedGuessColors, uniqueGreenLetters, uniqueYellowLetters, newGreyLetters) 
}

  const findYellow = (wordGuess, compound, updatedGuessColors, uniqueGreenLetters) => {
    let newCompound = compound.join("");
    let newYellowLetters = new Set(yellowLetters[currAttempt.stage]);
    for (let i = 0; i < wordGuess.length; i++) {
        if (newCompound.includes(wordGuess[i]) && wordGuess[i] !== "_") {
            newYellowLetters.add(wordGuess[i]);
            updatedGuessColors[i] = 1;
            newCompound = newCompound.replace(wordGuess[i], "_");
            wordGuess[i] = "_";
        }
    }
    // Remove values from uniqueYellowLetters if they are also present in greenLetters
    newYellowLetters.forEach(key => {
      if (uniqueGreenLetters.has(key)) {
        newYellowLetters.delete(key);
      }
    });
    // setYellowLetters(newYellowLetters);
    findGrey(wordGuess, updatedGuessColors, uniqueGreenLetters, newYellowLetters)
  }

  const findGreen = (wordGuess) => {
    let newWordGuess = [...wordGuess];
    let updatedGuessColors = Array(tuple[currAttempt.stage]).fill(-1);
    let newGreenLetters = new Set(greenLetters[currAttempt.stage]);
    let compound = [...correctWord[currAttempt.stage]];
    for (let i = 0; i < tuple[currAttempt.stage]; i++) {
        if (newWordGuess[i] === correctWord[currAttempt.stage][i]) {
            newGreenLetters.add(newWordGuess[i]);
            newWordGuess[i] = "_";
            compound[i] = "_";
            updatedGuessColors[i] = 2;
        }
    }
    // setGreenLetters(newGreenLetters);
    findYellow(newWordGuess, compound, updatedGuessColors, newGreenLetters)
  }

  const onEnter = () => {
    if (gameOver.gameOver) return;
    if (currAttempt.letter !== tuple[currAttempt.stage]) return;
    disableKeyPressRef.current = true;

    let currWord = "";
    for (let i = 0; i < tuple[currAttempt.stage]; i++) {
      currWord += board[currAttempt.stage][currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      findGreen(currWord.toLowerCase());
    } else {
      const rowNumber = `row${currAttempt.stage + 1}`
      const rowElements = document.getElementsByClassName(rowNumber);
      const currentRowElement = rowElements[currAttempt.attempt];

      if (currentRowElement) {
        currentRowElement.classList.add('invalid');
        
        // Remove the invalid class after the animation duration
        setTimeout(() => {
          currentRowElement.classList.remove('invalid');
        }, 600);
      }
    }
    disableKeyPressRef.current = false;
  };

  const onDelete = () => {
    if (currAttempt.letter === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.stage][currAttempt.attempt][currAttempt.letter - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter - 1 });
  };

  const onSelectLetter = (key) => {
    if (currAttempt.letter >= tuple[currAttempt.stage]) return;
    const newBoard = [...board];
    newBoard[currAttempt.stage][currAttempt.attempt][currAttempt.letter] = key;
    setBoard(newBoard);
    setCurrAttempt({ ...currAttempt, letter: currAttempt.letter + 1});
  };

  const [showPrompt, setShowPrompt] = useState(true);

  const hidePrompt = () => {
    if (!showPrompt) return;
    setShowPrompt(false);
  };

  const playAgain = async () => {
    const newTuple = await chooseTuple();
    const compoundWordSet = compoundSets[newTuple.setNumber];
    const compoundWordArray = [...compoundWordSet];
    const randomCompoundWord = compoundWordArray[Math.floor(Math.random() * compoundWordArray.length)];

    const tupleSum = newTuple.chosenTuple[0] + newTuple.chosenTuple[1];
    newTuple.chosenTuple.push(tupleSum);
    setTuple(newTuple.chosenTuple);
    setBoard([
      Array.from({ length: 4 }, () => Array(newTuple.chosenTuple[0]).fill("")), 
      Array.from({ length: 4 }, () => Array(newTuple.chosenTuple[1]).fill("")),
      Array.from({ length: 1 }, () => Array(tupleSum).fill(""))
    ])
    setBoardColors([
      Array.from({ length: 4 }, () => Array(newTuple.chosenTuple[0]).fill(-1)),
      Array.from({ length: 4 }, () => Array(newTuple.chosenTuple[1]).fill(-1)),
      Array.from({ length: 1 }, () => Array(tupleSum).fill(-1))
    ]);

    const firstPart = randomCompoundWord.slice(0, newTuple.chosenTuple[0]);
    const secondPart = randomCompoundWord.slice(newTuple.chosenTuple[0]);
    setCorrectWord([firstPart, secondPart, randomCompoundWord]);

    setGreenLetters({
      0: new Set(),
      1: new Set(),
      2: new Set(),
    })

    setYellowLetters({
      0: new Set(),
      1: new Set(),
      2: new Set(),
    })

    setGreyLetters({
      0: new Set(),
      1: new Set(),
      2: new Set(),
    })

    setCurrAttempt({ stage: 0, attempt: 0, letter: 0 });

    setGameOver({
      gameOver: false,
      guessedWord: false,
    });

  };

  return (
    <div className="App">
      <nav>
        <h1>Compound Wordle</h1>
      </nav>
      <AppContext.Provider
        value={{
          hidePrompt,
          board,
          boardColors,
          tuple,
          currAttempt,
          setCurrAttempt,
          correctWord,
          onSelectLetter,
          onDelete,
          onEnter,
          gameOver,
          greenLetters,
          yellowLetters,
          greyLetters,
          playAgain,
          disableKeyPressRef
        }}>
        {showPrompt && <Prompt />}
        <div className='game'>
          <Board />
          {gameOver.gameOver ? <GameOver /> : <Keyboard />}
        </div>

      </AppContext.Provider>
    </div>

  );
}

export default App;