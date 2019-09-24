var input = "abcdef609043";
var inputPuzzle = "iwrupvqb";
var crypto = require("crypto");

function dayFourSolution(input) {
  for (var i = 1; i < 990000; i++) {
    testValue = input.concat(i.toString());
    const md5Solution = crypto
      .createHash("md5")
      .update(testValue)
      .digest("hex");
    if (md5Solution.substring(0, 5) == "00000") {
      console.log(md5Solution);
      return i;
    }
  }
}

function dayFourSolutionPart2(input) {
  for (var i = 1000000; i < 9999999; i++) {
    testValue = input.concat(i.toString());
    const md5Solution = crypto
      .createHash("md5")
      .update(testValue)
      .digest("hex");
    if (md5Solution.substring(0, 6) == "000000") {
      console.log(md5Solution);
      return i;
    }
  }
}

console.log(dayFourSolution(inputPuzzle));
console.log(dayFourSolutionPart2(inputPuzzle));
