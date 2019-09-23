var fs = require("fs");
var path = require("path");

const textFile = path.join(__dirname, "problemThreeInput.txt");
const data = fs.readFileSync(textFile, "utf8");

function dayThreeSolution(data) {
  const directions = data.split("");
  let currentLocation = [0, 0];

  const locations = directions.reduce(
    (locations, direction) => {
      switch (direction) {
        case ">":
          currentLocation = [currentLocation[0] + 1, currentLocation[1]];
          break;
        case "<":
          currentLocation = [currentLocation[0] - 1, currentLocation[1]];
          break;
        case "^":
          currentLocation = [currentLocation[0], currentLocation[1] + 1];
          break;
        case "v":
          currentLocation = [currentLocation[0], currentLocation[1] - 1];
          break;
      }
      const stringLocations = JSON.stringify(locations);
      const stringCurrent = JSON.stringify(currentLocation);
      if (stringLocations.indexOf(stringCurrent) === -1) {
        locations = locations.concat([currentLocation]);
      }
      return locations;
    },
    [[0, 0]]
  );

  return locations.length;
}

function dayThreeSolutionPartTwo(data) {
  const directions = data.split("");

  const santaDirections = directions.filter((direction, i) => i % 2 === 0);
  const roboSanataDirections = directions.filter((direction, i) => i % 2 === 1);

  let santaLocations = getAllLocations(santaDirections);
  let roboSanataLocations = getAllLocations(roboSanataDirections);

  santaLocations = santaLocations.map(String);
  roboSanataLocations = roboSanataLocations.map(String);

  const allLocations = santaLocations.concat(roboSanataLocations);
  const allUniqueLocations = allLocations.filter(
    (location, i, ar) => ar.indexOf(location) === i
  );

  return allUniqueLocations.length;
}

function getAllLocations(directions) {
  let currentLocation = [0, 0];
  const locations = directions.reduce(
    (locations, direction) => {
      switch (direction) {
        case ">":
          currentLocation = [currentLocation[0] + 1, currentLocation[1]];
          break;
        case "<":
          currentLocation = [currentLocation[0] - 1, currentLocation[1]];
          break;
        case "^":
          currentLocation = [currentLocation[0], currentLocation[1] + 1];
          break;
        case "v":
          currentLocation = [currentLocation[0], currentLocation[1] - 1];
          break;
      }
      const stringLocations = JSON.stringify(locations);
      const stringCurrent = JSON.stringify(currentLocation);
      if (stringLocations.indexOf(stringCurrent) === -1) {
        locations = locations.concat([currentLocation]);
      }
      return locations;
    },
    [[0, 0]]
  );

  return locations;
}

// console.log(dayThreeSolution(data));
console.log(dayThreeSolutionPartTwo(data));
