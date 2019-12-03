var fs = require("fs");
var path = require("path");

const data = fs.readFileSync("day3Input.txt", "utf8");

function day3Solution(data) {
  const wires = data.split("\n");
  let wire1 = wires[0].split(",");
  let wire2 = wires[1].split(",");

  let wire1Grid = ["0,0"];
  let wire2Grid = ["0,0"];
  for (var i = 0; i < wire1.length; i++) {
    wire1Grid = addInstructionToGrid(wire1Grid, wire1[i]);
  }
  for (var i = 0; i < wire2.length; i++) {
    wire2Grid = addInstructionToGrid(wire2Grid, wire2[i]);
  }

  const steps = [];
  const duplicates = wire1Grid.filter((location, i) => {
    const index = wire2Grid.indexOf(location);
    if (index != -1 && i !== 0) {
      // This is used for PART2 of the Day 3 solution
      steps.push(i + index);
      return true;
    }
    return false;
  });

  const distances = duplicates.map(duplicate => {
    const parts = duplicate.split(",");
    const distance =
      Math.abs(parseInt(parts[0], 10)) + Math.abs(parseInt(parts[1], 10));
    if (distance === 0) {
      return 1000000;
    }
    return distance;
  });

  console.log("Day 3 Part 2 Steps", Math.min(...steps));
  console.log("Day 3 Part 1 Distance", Math.min(...distances));
  return "success";
}

/**
 * Adds all the locations to the wireGrid based on the passed in instruction
 * @param {array} wireGrid Array of all locations visited example ["0,0", "0,1",...]
 * @param {string} instruction Executed instruction example "R34"
 */
function addInstructionToGrid(wireGrid, instruction) {
  const numberOfMoves = parseInt(instruction.substr(1), 10);
  let xValue = 0;
  let yValue = 0;
  xValue = parseInt(wireGrid[wireGrid.length - 1].split(",")[0], 10);
  yValue = parseInt(wireGrid[wireGrid.length - 1].split(",")[1], 10);
  for (var i = 1; i < numberOfMoves + 1; i++) {
    switch (instruction.charAt(0)) {
      case "R":
        wireGrid.push(`${xValue + i},${yValue}`);
        break;
      case "L":
        wireGrid.push(`${xValue - i},${yValue}`);
        break;
      case "U":
        wireGrid.push(`${xValue},${yValue + i}`);
        break;
      case "D":
        wireGrid.push(`${xValue},${yValue - i}`);
        break;
      default:
        break;
    }
  }
  return wireGrid;
}

day3Solution(data);
