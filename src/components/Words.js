import allWords from "../WordBank.json";
import words33 from "../CompoundWords/33Compounds.json";
import words34 from "../CompoundWords/34Compounds.json";
import words35 from "../CompoundWords/35Compounds.json";
import words43 from "../CompoundWords/43Compounds.json";
import words44 from "../CompoundWords/44Compounds.json";
import words45 from "../CompoundWords/45Compounds.json";
import words53 from "../CompoundWords/53Compounds.json";
import words54 from "../CompoundWords/54Compounds.json";
import words55 from "../CompoundWords/55Compounds.json";
import words56 from "../CompoundWords/56Compounds.json";
import words65 from "../CompoundWords/65Compounds.json";
import words66 from "../CompoundWords/66Compounds.json";

export const boardDefault = [
  [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
  ],
    [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""]
  ],
  [
    ["", "", "", "", "", "", "", "", "", ""]
  ]
];

export const boardColorsDefault = [
    [
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1]
    ],
    [
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1]
    ],
    [
      [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
    ]
];

export const generateWordSets = async () => {
  const wordSet = new Set(allWords.words);
  const compoundSets = {
    "33": new Set(words33.words),
    "34": new Set(words34.words),
    "35": new Set(words35.words),
    "43": new Set(words43.words),
    "44": new Set(words44.words),
    "45": new Set(words45.words),
    "53": new Set(words53.words),
    "54": new Set(words54.words),
    "55": new Set(words55.words),
    "56": new Set(words56.words),
    "65": new Set(words65.words),
    "66": new Set(words66.words)
  };

  const tuples = [
    { tuple: [3, 3], weight: 6 },
    { tuple: [3, 4], weight: 9 },
    { tuple: [3, 5], weight: 4 },
    { tuple: [4, 3], weight: 7 },
    { tuple: [4, 4], weight: 26 },
    { tuple: [4, 5], weight: 15 },
    { tuple: [5, 3], weight: 2.5 },
    { tuple: [5, 4], weight: 12.5 },
    { tuple: [5, 5], weight: 10 },
    { tuple: [5, 6], weight: 4 },
    { tuple: [6, 5], weight: 2.5 },
    { tuple: [6, 6], weight: 1.5 }
  ];

  // Calculate the total weight
  const totalWeight = tuples.reduce((sum, tuple) => sum + tuple.weight, 0);

  // Generate a random number between 0 and the total weight
  const randomNum = Math.random() * totalWeight;

  // Determine which tuple to select based on the random number
  let cumulativeWeight = 0;
  let chosenTuple;
  for (const tuple of tuples) {
    cumulativeWeight += tuple.weight;
    if (randomNum <= cumulativeWeight) {
      chosenTuple = tuple.tuple;
      break
    }
  }

  const setNumber = `${chosenTuple[0]}${chosenTuple[1]}`;
  const compoundWordSet = compoundSets[setNumber];

  const compoundWordArray = [...compoundWordSet];
  const randomCompoundWord = compoundWordArray[Math.floor(Math.random() * compoundWordArray.length)];

  return { wordSet, compoundSets, randomCompoundWord, chosenTuple };
};

export const chooseTuple = async () => {
  const tuples = [
    { tuple: [3, 3], weight: 6 },
    { tuple: [3, 4], weight: 9 },
    { tuple: [3, 5], weight: 4 },
    { tuple: [4, 3], weight: 7 },
    { tuple: [4, 4], weight: 26 },
    { tuple: [4, 5], weight: 15 },
    { tuple: [5, 3], weight: 2.5 },
    { tuple: [5, 4], weight: 12.5 },
    { tuple: [5, 5], weight: 10 },
    { tuple: [5, 6], weight: 4 },
    { tuple: [6, 5], weight: 2.5 },
    { tuple: [6, 6], weight: 1.5 }
  ];

  // Calculate the total weight
  const totalWeight = tuples.reduce((sum, tuple) => sum + tuple.weight, 0);

  // Generate a random number between 0 and the total weight
  const randomNum = Math.random() * totalWeight;

  // Determine which tuple to select based on the random number
  let cumulativeWeight = 0;
  let chosenTuple;
  for (const tuple of tuples) {
    cumulativeWeight += tuple.weight;
    if (randomNum <= cumulativeWeight) {
      chosenTuple = tuple.tuple;
      break
    }
  }
  
  const setNumber = `${chosenTuple[0]}${chosenTuple[1]}`;

  return { chosenTuple, setNumber };
};