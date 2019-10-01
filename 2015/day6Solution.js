var fs = require("fs");
var path = require("path");

const textFile = path.join(__dirname, "problemSixInput.txt");
const data = fs.readFileSync(textFile, "utf8");

function problemSixSolution(data) {
  let lightsGrid = getInitialGrid();
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
    arrayOfEditedCells = getEditedGridCells(startPosition, endPosition);
    console.log("2. Get Edited Cells DONE");
    lightsGrid = updateLightsGrid(lightsGrid, arrayOfEditedCells, whatToDo);
    console.log("3. updated lights grid DONE for step" + i);
  });

  let totalOn = 0;

  lightsGrid.map(light => {
    if (light.isOn === true) {
      totalOn = totalOn + 1;
    }
  });
  return totalOn;
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
  const xAndYPositionEnd = end.split(",");
  const xAndYPositionStart = start.split(",");

  const EditedCells = [];

  const xEnd = parseInt(xAndYPositionEnd[0], 10);
  const yEnd = parseInt(xAndYPositionEnd[1], 10);

  let xStart = parseInt(xAndYPositionStart[0], 10);
  for (xStart; xStart <= xEnd; xStart++) {
    let yStart = parseInt(xAndYPositionStart[1], 10);
    for (yStart; yStart <= yEnd; yStart++) {
      EditedCells.push(`${xStart},${yStart}`);
    }
  }
  return EditedCells;
}

function updateLightsGrid(lightsGrid, arrayOfEditedCells, whatToDo) {
  console.log("in updateLightGrid");
  const lightsGridUpdated = lightsGrid.map((light, i) => {
    if (arrayOfEditedCells.indexOf(light.position) != -1) {
      switch (whatToDo) {
        case "on":
          return { ...light, isOn: true };
        case "off":
          return { ...light, isOn: false };
        case "toggle":
          const isLightOn = !light.isOn;
          return { ...light, isOn: isLightOn };
      }
    }
    return light;
  });
  return lightsGridUpdated;
}

console.log(problemSixSolution(data));
