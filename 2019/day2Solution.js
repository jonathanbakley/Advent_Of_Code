var fs = require("fs");
var path = require("path");

const data = fs.readFileSync("day2Input.txt", "utf8");

const instructionsSet = data.split(",").map(Number);

function day2SolutionPart1(instructions) {
  let i = 0;
  while (i !== 99) {
    if (instructions[i] === 1) {
      const replaceVal =
        instructions[instructions[i + 1]] + instructions[instructions[i + 2]];
      instructions[instructions[i + 3]] = replaceVal;
    } else if (instructions[i] === 2) {
      const replaceVal =
        instructions[instructions[i + 1]] * instructions[instructions[i + 2]];
      instructions[instructions[i + 3]] = replaceVal;
    } else if (instructions[i] === 99) {
      // end
      break;
    } else {
      console.log("something likely went wrong");
    }
    i = i + 4;
  }
  return instructions[0];
}

function day2SolutionPart2(instructions) {
  let i = 10;
  let k = 10;
  const initialInstructions = [...instructions];
  while (i < 99) {
    while (k < 99) {
      instructions = [...initialInstructions];
      instructions[1] = i;
      instructions[2] = k;
      day2SolutionPart1(instructions);
      k++;
      if (instructions[0] === 19690720) {
        return instructions[1].toString() + instructions[2].toString();
      }
    }
    i++;
    k = 10;
  }
}

console.log(day2SolutionPart1(instructionsSet));
console.log(day2SolutionPart2(instructionsSet));
