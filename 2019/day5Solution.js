var fs = require("fs");
var path = require("path");

const data = fs.readFileSync("day5Input.txt", "utf8");

const instructionsSet1 = data.split(",").map(Number);
const instructionsSet2 = [...instructionsSet1];

function day5SolutionPart1(instructions, input) {
  let i = 0;
  while (i !== 99) {
    // split instruction into parts (example) 10102 -> [1,0,1,2];
    const parsedInstruction = parseInstruction(instructions[i]);

    if (parsedInstruction[3] === 1) {
      executeInstructionAddMultiply(parsedInstruction, "+", instructions, i);
      i = i + 4;
    } else if (parsedInstruction[3] === 2) {
      executeInstructionAddMultiply(parsedInstruction, "*", instructions, i);
      i = i + 4;
    } else if (parsedInstruction[3] == 3) {
      instructions[instructions[i + 1]] = input;
      i = i + 2;
    } else if (parsedInstruction[3] == 4) {
      console.log("OUTPUT: ", instructions[instructions[i + 1]]);
      i = i + 2;
    } else if (parsedInstruction[3] === 99) {
      // end
      break;
    } else {
      console.log("something likely went wrong");
    }
  }
}

function day5SolutionPart2(instructions, input) {
  let i = 0;
  while (i !== 99) {
    // split instruction into parts (example) 10102 -> [1,0,1,2];
    const parsedInstruction = parseInstruction(instructions[i]);

    if (parsedInstruction[3] === 1) {
      executeInstructionAddMultiply(parsedInstruction, "+", instructions, i);
      i = i + 4;
    } else if (parsedInstruction[3] === 2) {
      executeInstructionAddMultiply(parsedInstruction, "*", instructions, i);
      i = i + 4;
    } else if (parsedInstruction[3] == 3) {
      instructions[instructions[i + 1]] = input;
      i = i + 2;
    } else if (parsedInstruction[3] == 4) {
      console.log("OUTPUT PART 2: ", instructions[instructions[i + 1]]);
      i = i + 2;
    } else if (parsedInstruction[3] == 5) {
      i = executeJump(parsedInstruction, 1, instructions, i);
    } else if (parsedInstruction[3] == 6) {
      i = executeJump(parsedInstruction, 0, instructions, i);
    } else if (parsedInstruction[3] == 7) {
      executeConditional(parsedInstruction, 1, instructions, i);
      i = i + 4;
    } else if (parsedInstruction[3] == 8) {
      executeConditional(parsedInstruction, 0, instructions, i);
      i = i + 4;
    } else if (parsedInstruction[3] === 99) {
      // end
      break;
    } else {
      console.log("something likely went wrong");
    }
  }
}

function parseInstruction(instructionAsNum) {
  let instruction = instructionAsNum.toString();
  const zerosToAdd = 5 - instruction.length;
  for (var i = zerosToAdd; i > 0; i--) {
    instruction = "0" + instruction;
  }
  instruction = instruction.split("");
  if (instruction[3] === "0") {
    instruction.splice(3, 1);
  } else {
    instruction[3] = instruction[3] + instruction[4];
    instruction.splice(4, 1);
  }
  return instruction.map(Number);
}

function executeInstructionAddMultiply(
  parsedInstruction,
  operation,
  instructions,
  i
) {
  let replaceVal;
  const val1 = parsedInstruction[2]
    ? instructions[i + 1]
    : instructions[instructions[i + 1]];
  const val2 = parsedInstruction[1]
    ? instructions[i + 2]
    : instructions[instructions[i + 2]];
  if (operation === "+") {
    replaceVal = val1 + val2;
  } else {
    replaceVal = val1 * val2;
  }
  if (parsedInstruction[0]) {
    instructions[i + 3] = replaceVal;
  } else {
    instructions[instructions[i + 3]] = replaceVal;
  }
}

function executeJump(parsedInstruction, jumpType, instructions, i) {
  const isZero = parsedInstruction[2]
    ? instructions[i + 1]
    : instructions[instructions[i + 1]];
  const comparisonToUse = jumpType ? isZero !== 0 : isZero === 0;
  if (comparisonToUse) {
    return parsedInstruction[1]
      ? instructions[i + 2]
      : instructions[instructions[i + 2]];
  } else {
    return i + 3;
  }
}

function executeConditional(parsedInstruction, isLessThan, instructions, i) {
  const val1 = parsedInstruction[2]
    ? instructions[i + 1]
    : instructions[instructions[i + 1]];
  const val2 = parsedInstruction[1]
    ? instructions[i + 2]
    : instructions[instructions[i + 2]];
  const compare = isLessThan ? val1 < val2 : val1 === val2;
  if (compare) {
    instructions[instructions[i + 3]] = 1;
  } else {
    instructions[instructions[i + 3]] = 0;
  }
}

day5SolutionPart1(instructionsSet1, 1);
day5SolutionPart2(instructionsSet2, 5);
