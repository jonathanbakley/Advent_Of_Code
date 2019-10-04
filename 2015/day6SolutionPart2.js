var fs = require("fs");
var path = require("path");

const textFile = path.join(__dirname, "problemSixInput.txt");
const data = fs.readFileSync(textFile, "utf8");

function problemSixSolution(data) {
  let arrayOfEditedCells = {};
  const instructions = data.split("\n");

  instructions.forEach((instruction, i) => {
    instructionArray = instruction.split(" ");

    const whatToDo =
      instructionArray[0] === "toggle"
        ? instructionArray[0]
        : instructionArray[1];
    const startPosition =
      instructionArray[0] === "toggle"
        ? instructionArray[1]
        : instructionArray[2];
    const endPosition =
      instructionArray[0] === "toggle"
        ? instructionArray[3]
        : instructionArray[4];

    console.log("1. Break up instruction DONE");
    arrayOfEditedCells = getEditedGridCells(
      arrayOfEditedCells,
      startPosition,
      endPosition,
      whatToDo
    );
    console.log("2. updated lights grid DONE for step " + i);
  });

  let totalOn = 0;
  Object.keys(arrayOfEditedCells).forEach(i => {
    totalOn = totalOn + arrayOfEditedCells[i];
  });
  return totalOn;
}

function getEditedGridCells(EditedCellsStart, start, end, whatToDo) {
  const xAndYPositionEnd = end.split(",");
  const xAndYPositionStart = start.split(",");

  const EditedCells = EditedCellsStart;

  const xEnd = parseInt(xAndYPositionEnd[0], 10);
  const yEnd = parseInt(xAndYPositionEnd[1], 10);

  let xStart = parseInt(xAndYPositionStart[0], 10);
  for (xStart; xStart <= xEnd; xStart++) {
    let yStart = parseInt(xAndYPositionStart[1], 10);
    for (yStart; yStart <= yEnd; yStart++) {
      if (EditedCells[`${xStart},${yStart}`]) {
        switch (whatToDo) {
          case "on":
            EditedCells[`${xStart},${yStart}`] =
              EditedCells[`${xStart},${yStart}`] + 1;
            break;
          case "off":
            EditedCells[`${xStart},${yStart}`] =
              EditedCells[`${xStart},${yStart}`] - 1;
            if (EditedCells[`${xStart},${yStart}`] <= 0) {
              delete EditedCells[`${xStart},${yStart}`];
            }
            break;
          case "toggle":
            EditedCells[`${xStart},${yStart}`] =
              EditedCells[`${xStart},${yStart}`] + 2;
            break;
        }
      } else {
        switch (whatToDo) {
          case "on":
            EditedCells[`${xStart},${yStart}`] = 1;
            break;
          case "toggle":
            EditedCells[`${xStart},${yStart}`] = 2;
            break;
        }
      }
    }
  }
  return EditedCells;
}

console.log(problemSixSolution(data));
