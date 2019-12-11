var fs = require("fs");
var path = require("path");

const data = fs.readFileSync(
  path.resolve(__dirname, "./day11Input.txt"),
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
      input = implementPainting(outputReturn);
      phaseSetting = input;
      //   intComputer(instructions, 0, 0, false, i, relativeBase);
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

let robotLocation = [0, 0];
// 0 = up
// 1 = left
// 2 = down
// 3 = right
let pointing = 0;
let paintedLocations = [];
let currentColor;

function implementPainting(outputValue) {
  directionsArray.push(outputValue);

  if (directionsArray.length % 2 === 0) {
    // move robot location
    if (outputValue === 0) {
      // turn left
      pointing = pointing === 3 ? 0 : pointing + 1;
    } else {
      // turn right
      pointing = pointing === 0 ? 3 : pointing - 1;
    }
    // console.log(pointing);
    switch (pointing) {
      case 0:
        robotLocation[1] = robotLocation[1] + 1;
        break;
      case 1:
        robotLocation[0] = robotLocation[0] - 1;
        break;
      case 2:
        robotLocation[1] = robotLocation[1] - 1;
        break;
      case 3:
        robotLocation[0] = robotLocation[0] + 1;
        break;
      default:
        console.log("Something went wrong");
    }

    // handle currentColor
    const currentLocationIndex = paintedLocations.findIndex(
      item => item.location === robotLocation[0] + "," + robotLocation[1]
    );
    if (currentLocationIndex !== -1) {
      currentColor = paintedLocations[currentLocationIndex].color;
    } else {
      currentColor = 0;
    }
  } else {
    // painting operation
    const indexOfLocation = paintedLocations.findIndex(
      item => item.location === robotLocation[0] + "," + robotLocation[1]
    );

    if (indexOfLocation !== -1) {
      paintedLocations[indexOfLocation].color = outputValue;
    } else {
      paintedLocations.push({
        location: robotLocation[0] + "," + robotLocation[1],
        color: outputValue
      });
    }
  }
  return currentColor;
}

function day9Solution(instructionsSet) {
  intComputer(instructionsSet, 0, 0);
  console.log("PART 1:", paintedLocations.length);

  // reset globals for part 2
  directionsArray = [];
  robotLocation = [0, 0];
  pointing = 0;
  paintedLocations = [];
  currentColor;

  intComputer(instructionsSet, 1, 1);
  createOutput();
}

function createOutput() {
  let outputRegistration = [];
  for (var g = 0; g < paintedLocations.length; g++) {
    let [xVal, yVal] = paintedLocations[g].location.split(",");
    yVal = parseInt(yVal, 10) + 5;
    xVal = parseInt(xVal, 10);
    const color = paintedLocations[g].color;

    const paintColor = color === 1 ? "X" : " ";
    outputRegistration.push([xVal, yVal, paintColor]);
  }

  let grid = ["0", "0", "0", "0", "0", "0"];
  for (var r = 0; r < 6; r++) {
    for (var n = 0; n < 100; n++) {
      grid[r] = grid[r] + "0";
    }
  }

  outputRegistration.forEach(location => {
    grid[location[1]] =
      grid[location[1]].substring(0, location[0]) +
      location[2] +
      grid[location[1]].substring(location[0] + 1);
  });

  grid = grid.reverse();
  console.log("Part 2:");
  for (var b = 0; b < grid.length; b++) {
    console.log(grid[b].replace(/0/gi, " "));
  }
}

day9Solution(instructionsSet);
