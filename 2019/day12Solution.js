var fs = require("fs");
var path = require("path");

const data = fs.readFileSync(
  path.resolve(__dirname, "./day12InputTEST.txt"),
  "utf8"
);

const eachMoon = data.split("\n");

function day12Solution(moonLocations) {
  // setup moons
  let moons = moonLocations.map(moon => {
    const equals = getIndices(moon, "=");
    const comma = getIndices(moon, ",");
    return {
      xLoc: parseInt(moon.substring(equals[0] + 1, comma[0]), 10),
      yLoc: parseInt(moon.substring(equals[1] + 1, comma[1]), 10),
      zLoc: parseInt(moon.substring(equals[2] + 1, moon.lastIndexOf(">")), 10),
      xVel: 0,
      yVel: 0,
      zVel: 0
    };
  });
  console.log(moons);

  let allLocations = [moons];

  // for 1000 times execute this

  const update = {};
  // for each moon
  for (var m = 0; m < 4; m++) {
    // execute position and velocity change
    // 1. get new velocities
    step = allLocations[i];
    let a = allLocations[i][0]["xLoc"] < allLocations[i][1]["xLoc"] ? 1 : -1;
    a = allLocations[i][0][xLoc] === allLocations[i][1]["xLoc"] ? 0 : a;

    let b = allLocations[i][0]["xLoc"] < allLocations[i][2]["xLoc"] ? 1 : -1;
    b = allLocations[i][0][xLoc] === allLocations[i][2]["xLoc"] ? 0 : b;

    let c = allLocations[i][0]["xLoc"] < allLocations[i][3]["xLoc"] ? 1 : -1;
    c = allLocations[i][0]["xLoc"] === allLocations[i][3]["xLoc"] ? 0 : c;

    const newVelocityX = a + b + c;

    // 2. get new positions
  }

  // 3. add positions and velocities to array

  //

  // run total energy calculation
}

function getIndices(string, findChar) {
  var indices = [];
  for (var i = 0; i < string.length; i++) {
    if (string[i] === findChar) indices.push(i);
  }
  return indices;
}

day12Solution(eachMoon);
