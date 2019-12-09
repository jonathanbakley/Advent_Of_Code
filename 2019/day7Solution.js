var fs = require("fs");
var path = require("path");

const data = fs.readFileSync("day7Input.txt", "utf8");

const instructionsSet = data.split(",").map(Number);

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

  while (true) {
    // split instruction into parts (example) 10102 -> [1,0,1,2];
    const parsedInstruction = parseInstruction(instructions[i]);

    if (parsedInstruction[3] === 1) {
      executeInstructionAddMultiply(parsedInstruction, "+", instructions, i);
      i = i + 4;
    } else if (parsedInstruction[3] === 2) {
      executeInstructionAddMultiply(parsedInstruction, "*", instructions, i);
      i = i + 4;
    } else if (parsedInstruction[3] == 3) {
      if (firstInput) {
        instructions[instructions[i + 1]] = phaseSetting;
      } else {
        instructions[instructions[i + 1]] = input;
      }
      firstInput = false;
      i = i + 2;
    } else if (parsedInstruction[3] == 4) {
      outputReturn = instructions[instructions[i + 1]];
      i = i + 2;
      return [outputReturn, instructions, i];
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

function day7Solution(instructionsSet, numberOfAmps) {
  console.time("Day 7 Part1");
  let i = numberOfAmps;
  let phasesArray = [];
  let outputs = [];
  while (i > 0) {
    phasesArray.push(i - 1);
    i--;
  }
  perm(phasesArray).forEach(phaseSet => {
    let input = 0;
    let output;
    for (var k = 0; k < phaseSet.length; k++) {
      const newInstructionsSet = [...instructionsSet];
      [output] = intComputer(newInstructionsSet, phaseSet[k], input);
      input = output;
    }
    outputs.push(output);
  });

  part1FuelAmount = Math.max(...outputs);
  console.log("output part 1", part1FuelAmount);
  console.timeEnd("Day 7 Part1");
}

function day7SolutionPart2(instructionsSet, numberOfAmps) {
  console.time("Day 7 Part2");
  let i = numberOfAmps;
  let phasesArray = [];
  let outputs = [];
  while (i > 0) {
    phasesArray.push(i - 1);
    i--;
  }
  perm([9, 8, 7, 6, 5]).forEach(phaseSet => {
    let input = 0;
    let output;
    let newInstructionsSetPerComputer = [];
    let currentInstruction = [0, 0, 0, 0, 0];
    let initialOutputs = [];
    for (var k = 0; k < phaseSet.length; k++) {
      newInstructionsSetPerComputer.push([...instructionsSet]);
    }
    var l = 0;
    while (currentInstruction[0] !== 999999) {
      for (var k = 0; k < phaseSet.length; k++) {
        let first = l === 0;
        [
          output,
          newInstructionsSetPerComputer[k],
          currentInstruction[k]
        ] = intComputer(
          newInstructionsSetPerComputer[k],
          phaseSet[k],
          input,
          first,
          currentInstruction[k]
        );
        input = output;
        if (k === 4) {
          initialOutputs.push(output);
        }
      }
      l++;
    }
    outputs.push(initialOutputs[initialOutputs.length - 2]);
  });

  const part2FuelAmount = Math.max(...outputs);
  console.log("output part 2", part2FuelAmount);
  console.timeEnd("Day 7 Part2");
}

day7Solution(instructionsSet, 5);
day7SolutionPart2(instructionsSet);

/**
 * I cannot take credit for this function as I got it from stack overflow
 * To solve this problem I needed a function to get all the permutations given an array.
 * This function does that for me.
 */
function perm(xs) {
  let ret = [];

  for (let i = 0; i < xs.length; i++) {
    let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

    if (!rest.length) {
      ret.push([xs[i]]);
    } else {
      for (let j = 0; j < rest.length; j++) {
        ret.push([xs[i]].concat(rest[j]));
      }
    }
  }
  return ret;
}
