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

  const registerAndReset = (updatedGuessColors) => {
    const newColors = [...boardColors];
    newColors[currAttempt.stage][currAttempt.attempt] = updatedGuessColors;
    setBoardColors(newColors);
    const allGreen = updatedGuessColors.every(value => value === 2);
    if (currAttempt.stage < 2) {
      if (allGreen || currAttempt.attempt === 3) {
        setCurrAttempt({ stage: currAttempt.stage + 1, attempt: 0, letter: 0 });
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
  };

  const findGrey = (wordGuess, updatedGuessColors, uniqueGreenLetters, uniqueYellowLetters) => {
    let newGreyLetters = greyLetters;
    for (let i = 0; i < wordGuess.length; i++) {
        if (wordGuess[i] !== "_") {
            newGreyLetters[currAttempt.stage].add(wordGuess[i])
            updatedGuessColors[i] = 0;
        }
    }
    // Remove values from newGreyLetters if they are also present in greenLetters or yellowLetters
    newGreyLetters[currAttempt.stage].forEach(key => {
      if (uniqueGreenLetters[currAttempt.stage].has(key) || uniqueYellowLetters[currAttempt.stage].has(key)) {
        newGreyLetters[currAttempt.stage].delete(key);
      }
    });
    setGreyLetters(newGreyLetters)
    registerAndReset(updatedGuessColors) 
}

  const findYellow = (wordGuess, compound, updatedGuessColors, uniqueGreenLetters) => {
    let newCompound = compound.join("")
    let newYellowLetters = yellowLetters;
    for (let i = 0; i < wordGuess.length; i++) {
        if (newCompound.includes(wordGuess[i]) && wordGuess[i] !== "_") {
            newYellowLetters[currAttempt.stage].add(wordGuess[i])
            updatedGuessColors[i] = 1;
            newCompound = newCompound.replace(wordGuess[i], "_");
            wordGuess[i] = "_";
        }
    }
    // Remove values from uniqueYellowLetters if they are also present in greenLetters
    newYellowLetters[currAttempt.stage].forEach(key => {
      if (uniqueGreenLetters[currAttempt.stage].has(key)) {
        newYellowLetters[currAttempt.stage].delete(key);
      }
    });
    setYellowLetters(newYellowLetters);
    findGrey(wordGuess, updatedGuessColors, uniqueGreenLetters, newYellowLetters)
  }

  const findGreen = (wordGuess) => {
    let newWordGuess = [...wordGuess];
    let updatedGuessColors = Array(tuple[currAttempt.stage]).fill(-1);
    let newGreenLetters = greenLetters;
    let compound = [...correctWord[currAttempt.stage]];
    for (let i = 0; i < tuple[currAttempt.stage]; i++) {
        if (newWordGuess[i] === correctWord[currAttempt.stage][i]) {
            newGreenLetters[currAttempt.stage].add(newWordGuess[i]);
            newWordGuess[i] = "_";
            compound[i] = "_";
            updatedGuessColors[i] = 2;
        }
    }
    setGreenLetters(newGreenLetters);
    findYellow(newWordGuess, compound, updatedGuessColors, newGreenLetters)
  }

  const onEnter = () => {
    if (currAttempt.letter !== tuple[currAttempt.stage]) return;
    disableKeyPressRef.current = true;

    let currWord = "";
    for (let i = 0; i < tuple[currAttempt.stage]; i++) {
      currWord += board[currAttempt.stage][currAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      findGreen(currWord.toLowerCase());
    } else {
      alert("Word not found");
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
    if (currAttempt.letter > tuple[currAttempt.stage]) return;
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
          playAgain
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