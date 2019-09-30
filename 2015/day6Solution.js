var fs = require("fs");
var path = require("path");

const textFile = path.join(__dirname, "problemSixInputTEST.txt");
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
    const startPosistion =
      instructionArray[0] === "toggle"
        ? instructionArray[1]
        : instructionArray[2];
    const endPosition =
      instructionArray[0] === "toggle"
        ? instructionArray[3]
        : instructionArray[4];
    arrayOfEditedCells = getEditedGridCells(startPosistion, endPosition);

    lightsGrid = updateLightsGrid(lightsGrid, arrayOfEditedCells, whatToDo);
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
  console.log("start", start, end, "end");
  const xAndYPositonEnd = end.split(",");
  const xAndYPositonStart = start.split(",");

  const EditedCells = [];

  let xStart = xAndYPositonStart[0];
  // console.log(xStart, "xStart", xAndYPositonStart[1], "yStart");
  for (xStart; xStart <= xAndYPositonEnd[0]; xStart++) {
    let yStart = xAndYPositonStart[1];
    console.log(xStart, "xStart", yStart, "yStart");
    for (yStart; yStart <= xAndYPositonEnd[1]; yStart++) {
      console.log(xStart, "xStart", yStart, "yStart");
      // FIX ISSUE HERE
      EditedCells.push(`${xStart},${yStart}`);
    }
  }
  console.log("edited cells", EditedCells);
  return EditedCells;
}

function updateLightsGrid(lightsGrid, arrayOfEditedCells, whatToDo) {
  // console.log(lightsGrid, arrayOfEditedCells, whatToDo);
  console.log("IN FUNC", arrayOfEditedCells, whatToDo);
  const lightsGridUpdated = lightsGrid.map((light, i) => {
    // console.log("light", light);
    if (arrayOfEditedCells.indexOf(light.position) != -1) {
      console.log("light", light, whatToDo, arrayOfEditedCells);
      switch (whatToDo) {
        case "on":
          // console.log("light on", light, whatToDo, { ...light, isOn: true });
          return { ...light, isOn: true };
        case "off":
          // console.log("light off", light, whatToDo, { ...light, isOn: false });
          return { ...light, isOn: false };
        case "toggle":
          const isLightOn = !light.isOn;
          return { ...light, isOn: isLightOn };
      }
    }
    return light;
  });
  // console.log(lightsGridUpdated, "updated");
  return lightsGridUpdated;
}

console.log(problemSixSolution(data));
