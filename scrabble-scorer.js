// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let myWord = input.question(`Enter a word to score: `);
   return myWord;
};

let simpleScorer = function(someWord) {
   score =  someWord.length;
   return score;
};

let vowelBonusScorer = function(someWord) {
   let score = 0;
   let vowels = ['a', 'e', 'i', 'o', 'u', 'y'];
   
   for (let i = 0; i < someWord.length; i++) {
      if (vowels.includes(someWord[i].toLowerCase())) {
         score += 3;
      } else {
         score += 1;
      }
   }
   return score;
};

let scrabbleScorer = function(someWord) {
   let score = 0;
   for (let i=0; i<someWord.length; i++) {
      score += newPointStructure[someWord[i].toLowerCase()]
   }
   return score;
};

let simpleScore = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
};

let vowelBonusScore = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};

let oldScrabbleScore = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [simpleScore, vowelBonusScore, oldScrabbleScore]
//simpleScorer, vowelBonusScore, and oldScrabbleScore are all initalized as aliases to anonymous functions - can they also then be declared as objects?? 

function scorerPrompt(someArray) {
   let response = -1;
   while (response < 0 || response > 2) {
      response = input.question(`Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: `)
   }
   return someArray[response]
};

function transform(someObject) {
   let newObject = {};
   for (pointValue in someObject) {
      for (let i=0; i<someObject[pointValue].length; i++) {
         newObject[someObject[pointValue][i].toLowerCase()] = Number(pointValue);
      }
   }
   return newObject 
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   userWord = initialPrompt();
   console.log(`the word entered is ${userWord}`)
   //console.log(scorerPrompt(scoringAlgorithms).scoringFunction(userWord))
   console.log(`Score for '${userWord}': ${scorerPrompt(scoringAlgorithms).scoringFunction(userWord)}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
