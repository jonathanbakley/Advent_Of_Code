var fs = require("fs");
var path = require("path");

const textFile = path.join(__dirname, "problemFiveInput.txt");
const data = fs.readFileSync(textFile, "utf8");

function dayFiveSolution(data) {
  niceStringsCount = 0;
  eachString = data.split("\n");

  eachString.map((individualString, i) => {
    isStringNice = true;
    characters = individualString.split("");

    // vowel check "aeiou" min of 3
    let counter = 0;
    characters.forEach((character, i) => {
      if (["a", "e", "i", "o", "u"].indexOf(character) !== -1) {
        counter = counter + 1;
      }
    });
    if (counter < 3) {
      isStringNice = false;
    }
    // console.log(isStringNice, "vowel check");

    // double letter check
    let isDouble = false;
    characters.forEach((character, i) => {
      if (character == characters[i - 1]) {
        isDouble = true;
      }
    });
    if (!isDouble) {
      isStringNice = false;
    }
    // console.log(isStringNice, "double check");

    // invalid sequence check "ab", "cd", "pq", "xy"
    let hasInvalidSequence = false;
    characters.forEach((character, i) => {
      switch (character) {
        case "b":
          if (characters[i - 1] === "a") {
            hasInvalidSequence = true;
          }
          break;
        case "d":
          if (characters[i - 1] === "c") {
            hasInvalidSequence = true;
          }
          break;
        case "q":
          if (characters[i - 1] === "p") {
            hasInvalidSequence = true;
          }
          break;
        case "y":
          if (characters[i - 1] === "x") {
            hasInvalidSequence = true;
          }
          break;
      }
    });
    if (hasInvalidSequence === true) {
      isStringNice = false;
    }

    // console.log(isStringNice, "invalid string");
    if (isStringNice === true) {
      niceStringsCount = niceStringsCount + 1;
    }
  });

  return niceStringsCount;
}

function dayFiveSolutionPartTwo(data) {
  niceStringsCount = 0;
  eachString = data.split("\n");

  eachString.map((individualString, i) => {
    isStringNice = true;
    characters = individualString.split("");

    //
    let isTwoDuplicates = false;
    characters.forEach((character, i) => {
      const regexValue = `${characters[i - 1]}${character}`;
      const regexCompare = new RegExp(regexValue, "g");
      const counter = (individualString.match(regexCompare) || []).length;
      if (counter > 1) {
        isTwoDuplicates = true;
      }
    });
    if (!isTwoDuplicates) {
      isStringNice = false;
    }
    // console.log(isStringNice, "duplicate string check");

    // check for same character with one in between, example xyx and aia
    let sameChar = false;
    characters.forEach((character, i) => {
      if (character == characters[i - 2]) {
        sameChar = true;
      }
    });
    if (!sameChar) {
      isStringNice = false;
    }
    // console.log(isStringNice, "double check");

    if (isStringNice === true) {
      niceStringsCount = niceStringsCount + 1;
    }
  });

  return niceStringsCount;
}

console.log(dayFiveSolution(data));
console.log(dayFiveSolutionPartTwo(data));
