var fs = require("fs");
var path = require("path");

const textFile = path.join(__dirname, "problemSixInput.txt");
const data = fs.readFileSync(textFile, "utf8");

function problemSixSolution(data) {
  lightsGrid = getInitialGrid();

  instructions = data.split("\n");

  instructions.forEach((instruction, i) => {
    instructionArray = instruction.split(" ");

    arrayOfEditedCells = getEditedGridCells(
      instructionArray[2],
      instructionArray[4]
    );
  });
}

function getInitialGrid() {
  let lightsGrid = [];
  for (var i = 0; i < 1000000; i++) {
    currentRow = Math.floor(i / 1000);
    lightsGrid.push({
      isOn: false,
      position: `${i - currentRow * 1000},${currentRow}`
    });
  }
  return lightsGrid;
}

function getEditedGridCells(start, end) {
  console.log("start end", start, end);
}

problemSixSolution(data);
