var fs = require("fs");
var path = require("path");

const data = fs.readFileSync(
  path.resolve(__dirname, "./day13Input.txt"),
  "utf8"
);

const instructionsSet = data.split(",").map(Number);
let directionsArray = [];

/**
 * IntComputer that takes and input and instructions, supports 8 instructions
 * @param {array} instructions computer imput instructions as an array
 * @param {number} phaseSetting first input value
 * @param {number} input input to be used after first value
 * @param {boolean} first is this the first input
 * @param {number} index index of the instruction the computer is currently on
 *
 * Returns an array including:
 *  1. output value
 *  2. updated instructions set
 *  3. current index or 999999 if at the end of the instruction
 */
function intComputer(
  instructions,
  phaseSetting,
  input,
  first = true,
  index = 0
) {
  let i = index;
  let firstInput = first;
  let outputReturn;
  let relativeBase = 0;

  let arcadeInstruction = [];

  while (true) {
    // split instruction into parts (example) 10102 -> [1,0,1,2];
    const parsedInstruction = parseInstruction(instructions[i]);

    if (parsedInstruction[3] === 1) {
      executeInstructionAddMultiply(
        parsedInstruction,
        "+",
        instructions,
        i,
        relativeBase
      );
      i = i + 4;
    } else if (parsedInstruction[3] === 2) {
      executeInstructionAddMultiply(
        parsedInstruction,
        "*",
        instructions,
        i,
        relativeBase
      );
      i = i + 4;
    } else if (parsedInstruction[3] === 3) {
      if (parsedInstruction[2] === 2) {
        instructions[instructions[i + 1] + relativeBase] = input;
      } else {
        if (firstInput) {
          instructions[instructions[i + 1]] = phaseSetting;
        } else {
          instructions[instructions[i + 1]] = input;
        }
      }
      firstInput = false;
      i = i + 2;
    } else if (parsedInstruction[3] === 4) {
      if (parsedInstruction[2] === 2) {
        outputReturn =
          instructions[(instructions[i + 1] || 0) + relativeBase] || 0;
      } else if (parsedInstruction[2] === 0) {
        outputReturn = instructions[instructions[i + 1] || 0] || 0;
      } else {
        outputReturn = instructions[i + 1] || 0;
      }
      i = i + 2;
      // Day 13 Addition for game
      arcadeInstruction.push(outputReturn);
      if (arcadeInstruction.length === 3) {
        input = implementArcade(arcadeInstruction);
        arcadeInstruction = [];
      }
      phaseSetting = input;
      //
    } else if (parsedInstruction[3] === 5) {
      i = executeJump(parsedInstruction, 1, instructions, i, relativeBase);
    } else if (parsedInstruction[3] === 6) {
      i = executeJump(parsedInstruction, 0, instructions, i, relativeBase);
    } else if (parsedInstruction[3] == 7) {
      executeConditional(parsedInstruction, 1, instructions, i, relativeBase);
      i = i + 4;
    } else if (parsedInstruction[3] === 8) {
      executeConditional(parsedInstruction, 0, instructions, i, relativeBase);
      i = i + 4;
    } else if (parsedInstruction[3] === 9) {
      if (parsedInstruction[2] === 1) {
        relativeBase = relativeBase + (instructions[i + 1] || 0);
      } else if (parsedInstruction[2] === 0) {
        relativeBase =
          relativeBase + (instructions[instructions[i + 1] || 0] || 0);
      } else {
        relativeBase =
          relativeBase +
            instructions[(instructions[i + 1] || 0) + relativeBase] || 0;
      }
      i = i + 2;
    } else if (parsedInstruction[3] === 99) {
      // end
      break;
    } else {
      console.log("something likely went wrong");
    }
  }
  return [outputReturn, instructions, 999999];
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
  i,
  relativeI
) {
  let replaceVal;
  let val1 =
    parsedInstruction[2] === 1
      ? instructions[i + 1]
      : parsedInstruction[2] === 0
      ? instructions[instructions[i + 1]]
      : instructions[instructions[i + 1] + relativeI];
  let val2 =
    parsedInstruction[1] === 1
      ? instructions[i + 2]
      : parsedInstruction[1] === 0
      ? instructions[instructions[i + 2]]
      : instructions[instructions[i + 2] + relativeI];
  val1 = val1 === undefined ? 0 : val1;
  val2 = val2 === undefined ? 0 : val2;
  if (operation === "+") {
    replaceVal = val1 + val2;
  } else {
    replaceVal = val1 * val2;
  }
  if (parsedInstruction[0] === 1) {
    instructions[i + 3] = replaceVal;
  } else if (parsedInstruction[0] === 0) {
    instructions[instructions[i + 3]] = replaceVal;
  } else if (parsedInstruction[0] === 2) {
    instructions[instructions[i + 3] + relativeI] = replaceVal;
  }
}

function executeJump(parsedInstruction, jumpType, instructions, i, relativeI) {
  const isZero =
    parsedInstruction[2] === 1
      ? instructions[i + 1]
      : parsedInstruction[2] === 0
      ? instructions[instructions[i + 1]] || 0
      : instructions[instructions[i + 1] + relativeI] || 0;
  const comparisonToUse = jumpType ? isZero !== 0 : isZero === 0;
  if (comparisonToUse) {
    return parsedInstruction[1] === 1
      ? instructions[i + 2]
      : parsedInstruction[1] === 0
      ? instructions[instructions[i + 2]] || 0
      : instructions[instructions[i + 2] + relativeI] || 0;
  } else {
    return i + 3;
  }
}

function executeConditional(
  parsedInstruction,
  isLessThan,
  instructions,
  i,
  relativeI
) {
  let val1 =
    parsedInstruction[2] === 1
      ? instructions[i + 1]
      : parsedInstruction[2] === 0
      ? instructions[instructions[i + 1]]
      : instructions[instructions[i + 1] + relativeI];
  let val2 =
    parsedInstruction[1] === 1
      ? instructions[i + 2]
      : parsedInstruction[1] === 0
      ? instructions[instructions[i + 2]]
      : instructions[instructions[i + 2] + relativeI];
  val1 = val1 === undefined ? 0 : val1;
  val2 = val2 === undefined ? 0 : val2;
  const compare = isLessThan ? val1 < val2 : val1 === val2;
  let location;
  if (parsedInstruction[0] === 2) {
    location = instructions[i + 3] + relativeI;
  } else {
    location = instructions[i + 3];
  }
  if (compare) {
    instructions[location] = 1;
  } else {
    instructions[location] = 0;
  }
}

let arcadeMap = [];
let currentBallPosition = "";
let currentPaddle = "";
let finalScore = 0;

function implementArcade(arcadeInstruction) {
  if (arcadeInstruction[0] === -1 && arcadeInstruction[1] === 0) {
    finalScore = arcadeInstruction[2];
  } else {
    arcadeMap.push({
      location: `${arcadeInstruction[0]},${arcadeInstruction[1]}`,
      blockType: arcadeInstruction[2]
    });

    if (arcadeInstruction[2] === 3) {
      currentBallPosition = [arcadeInstruction[0], arcadeInstruction[1]];
    }
    if (arcadeInstruction[2] === 4) {
      currentPaddle = [arcadeInstruction[0], arcadeInstruction[1]];
    }
  }

  if (currentBallPosition[0] < currentPaddle[0]) {
    return 1;
  } else if (currentBallPosition[0] === currentPaddle[0]) {
    return 0;
  } else {
    return -1;
  }
}

function day13Solution(instructionsSet) {
  intComputer(instructionsSet, 1, 1);
  const subsetOfArcadeMap = arcadeMap.slice(0, 1050);
  const allBlocks = subsetOfArcadeMap.filter(
    arcadeSpot => arcadeSpot.blockType === 2
  );
  console.log("Part 1 Number of Blocks", allBlocks.length);
  console.log("Part 2 Final Score:", finalScore);
}

day13Solution(instructionsSet);
