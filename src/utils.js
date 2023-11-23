// export const findGrey = (wordGuess, updatedGuessColors, uniqueGreenKeys, uniqueYellowKeys) => {
//     if (turnCounter < 6) {
//         let newGreyKeys = [...greyKeys]
//         for (let i = 0; i < wordGuess.length; i++) {
//             if (wordGuess[i] !== "_") {
//                 newGreyKeys.push(wordGuess[i])
//                 updatedGuessColors[i] = 0;
//             }
//         }
//         let uniqueGreyKeys = [...new Set(newGreyKeys)];
//         // Remove values from uniqueGreyKeys if they are also present in greenKeys or yellowKeys
//         uniqueGreyKeys = uniqueGreyKeys.filter(key => !uniqueGreenKeys.includes(key) && !uniqueYellowKeys.includes(key));
//         setGreyKeys(uniqueGreyKeys)
//         if (turnCounter === 2) {
//             setStoredColorKeys({
//                 green: uniqueGreenKeys,
//                 yellow: uniqueYellowKeys,
//                 grey: uniqueGreyKeys,
//             });
//         }
//         if (turnCounter === 5) {
//             findFinalColorKeys(uniqueGreenKeys, uniqueYellowKeys, uniqueGreyKeys);
//         }
//         registerAndReset(updatedGuessColors) 
//     } else if (turnCounter === 6) {
//         let newGreyKeys = [...greyKeys]
//         for (let i = 0; i < wordGuess.length; i++) {
//         if (wordGuess[i] !== "_") {
//             newGreyKeys.push(wordGuess[i])
//             updatedGuessColors[i] = 0;
//         }
//         }
//         let uniqueGreyKeys = [...new Set(newGreyKeys)];
//         // Remove values from uniqueGreyKeys if they are also present in greenKeys or yellowKeys
//         uniqueGreyKeys = uniqueGreyKeys.filter(key => !uniqueGreenKeys.includes(key) && !uniqueYellowKeys.includes(key));
//         setGreyKeys(uniqueGreyKeys);
//         registerAndReset(updatedGuessColors);
//     }
// }

// export const findYellow = (wordGuess, compound, updatedGuessColors, uniqueGreenKeys) => {
//     if (turnCounter < 6) {
//         let newCompound = compound.join("")
//         let newYellowKeys = [...yellowKeys];
//         for (let i = 0; i < wordGuess.length; i++) {
//             if (newCompound.includes(wordGuess[i]) && wordGuess[i] !== "_") {
//                 newYellowKeys.push(wordGuess[i])
//                 updatedGuessColors[i] = 1;
//                 newCompound = newCompound.replace(wordGuess[i], "_");
//                 wordGuess[i] = "_";
//             }
//         }
//         let uniqueYellowKeys = [...new Set(newYellowKeys)];
//         // Remove values from uniqueYellowKeys if they are also present in greenKeys
//         uniqueYellowKeys = uniqueYellowKeys.filter(key => !uniqueGreenKeys.includes(key));
//         setYellowKeys(uniqueYellowKeys)
//         findGrey(wordGuess, updatedGuessColors, uniqueGreenKeys, uniqueYellowKeys)
//     } else if (turnCounter === 6) {
//         let newCorrectWord = compound.join("");
//         let newYellowKeys = [...yellowKeys];
//         for (let i = 0; i < wordGuess.length; i++) {
//             if (newCorrectWord.includes(wordGuess[i]) && wordGuess[i] !== "_") {
//                 newYellowKeys.push(wordGuess[i])
//                 updatedGuessColors[i] = 1;
//                 newCorrectWord = newCorrectWord.replace(wordGuess[i], "_");
//                 wordGuess[i] = "_";
//             }
//         }
//         let uniqueYellowKeys = [...new Set(newYellowKeys)];
//         // Remove values from uniqueYellowKeys if they are also present in greenKeys
//         uniqueYellowKeys = uniqueYellowKeys.filter(key => !uniqueGreenKeys.includes(key));
//         setYellowKeys(uniqueYellowKeys)
//         findGrey(wordGuess, updatedGuessColors, uniqueGreenKeys, uniqueYellowKeys)
//     }
// }

// export const findGreen = (wordGuess) => {
//     let newWordGuess = [...wordGuess];
//     let updatedGuessColors = [...board1Colors[currAttempt.attempt]];
//     let newGreenKeys = new Set([...greenKeys]);
//     let compound = correct1;
//     for (let i = 0; i < tuple[0]; i++) {
//         if (newWordGuess[i] === correct1[i]) {
//             newGreenKeys.add(newWordGuess[i]);
//             newWordGuess[i] = "_";
//             compound[i] = "_";
//             updatedGuessColors[i] = 2;
//         }
//     }
//     setGreenKeys(newGreenKeys);
//     findYellow(newWordGuess, compound, updatedGuessColors, newGreenKeys)
// }