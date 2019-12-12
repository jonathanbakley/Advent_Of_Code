var fs = require("fs");
var path = require("path");

const data = fs.readFileSync(
  path.resolve(__dirname, "./day12Input.txt"),
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

  let allLocations = [moons];
  let matches = { x: 0, y: 0, z: 0 };
  // for 1000 times execute this
  for (var i = 0; i < 150000; i++) {
    // let i = 0;

    let update = {};
    // execute position and velocity change
    // 1. get new velocities
    step = allLocations[i];
    const newVForXMoonA = getNewVelocity(allLocations, i, "xLoc", 0);
    const newVForYMoonA = getNewVelocity(allLocations, i, "yLoc", 0);
    const newVForZMoonA = getNewVelocity(allLocations, i, "zLoc", 0);

    const newVForXMoonB = getNewVelocity(allLocations, i, "xLoc", 1);
    const newVForYMoonB = getNewVelocity(allLocations, i, "yLoc", 1);
    const newVForZMoonB = getNewVelocity(allLocations, i, "zLoc", 1);

    const newVForXMoonC = getNewVelocity(allLocations, i, "xLoc", 2);
    const newVForYMoonC = getNewVelocity(allLocations, i, "yLoc", 2);
    const newVForZMoonC = getNewVelocity(allLocations, i, "zLoc", 2);

    const newVForXMoonD = getNewVelocity(allLocations, i, "xLoc", 3);
    const newVForYMoonD = getNewVelocity(allLocations, i, "yLoc", 3);
    const newVForZMoonD = getNewVelocity(allLocations, i, "zLoc", 3);

    // 2. get new positions
    update = [
      {
        xLoc: allLocations[i][0].xLoc + newVForXMoonA + allLocations[i][0].xVel,
        yLoc: allLocations[i][0].yLoc + newVForYMoonA + allLocations[i][0].yVel,
        zLoc: allLocations[i][0].zLoc + newVForZMoonA + allLocations[i][0].zVel,
        xVel: allLocations[i][0].xVel + newVForXMoonA,
        yVel: allLocations[i][0].yVel + newVForYMoonA,
        zVel: allLocations[i][0].zVel + newVForZMoonA
      },
      {
        xLoc: allLocations[i][1].xLoc + newVForXMoonB + allLocations[i][1].xVel,
        yLoc: allLocations[i][1].yLoc + newVForYMoonB + allLocations[i][1].yVel,
        zLoc: allLocations[i][1].zLoc + newVForZMoonB + allLocations[i][1].zVel,
        xVel: allLocations[i][1].xVel + newVForXMoonB,
        yVel: allLocations[i][1].yVel + newVForYMoonB,
        zVel: allLocations[i][1].zVel + newVForZMoonB
      },
      {
        xLoc: allLocations[i][2].xLoc + newVForXMoonC + allLocations[i][2].xVel,
        yLoc: allLocations[i][2].yLoc + newVForYMoonC + allLocations[i][2].yVel,
        zLoc: allLocations[i][2].zLoc + newVForZMoonC + allLocations[i][2].zVel,
        xVel: allLocations[i][2].xVel + newVForXMoonC,
        yVel: allLocations[i][2].yVel + newVForYMoonC,
        zVel: allLocations[i][2].zVel + newVForZMoonC
      },
      {
        xLoc: allLocations[i][3].xLoc + newVForXMoonD + allLocations[i][3].xVel,
        yLoc: allLocations[i][3].yLoc + newVForYMoonD + allLocations[i][3].yVel,
        zLoc: allLocations[i][3].zLoc + newVForZMoonD + allLocations[i][3].zVel,
        xVel: allLocations[i][3].xVel + newVForXMoonD,
        yVel: allLocations[i][3].yVel + newVForYMoonD,
        zVel: allLocations[i][3].zVel + newVForZMoonD
      }
    ];

    // 3. add positions and velocities to array
    // part 2
    if (
      allLocations[0][0].zVel === allLocations[i][0].zVel &&
      allLocations[0][1].zVel === allLocations[i][1].zVel &&
      allLocations[0][2].zVel === allLocations[i][2].zVel &&
      allLocations[0][3].zVel === allLocations[i][3].zVel
    ) {
      matches.x = matches.x === 0 ? i : matches.x;
    }
    if (
      allLocations[0][0].xVel === allLocations[i][0].xVel &&
      allLocations[0][1].xVel === allLocations[i][1].xVel &&
      allLocations[0][2].xVel === allLocations[i][2].xVel &&
      allLocations[0][3].xVel === allLocations[i][3].xVel
    ) {
      matches.y = matches.y === 0 ? i : matches.y;
    }
    if (
      allLocations[0][0].yVel === allLocations[i][0].yVel &&
      allLocations[0][1].yVel === allLocations[i][1].yVel &&
      allLocations[0][2].yVel === allLocations[i][2].yVel &&
      allLocations[0][3].yVel === allLocations[i][3].yVel
    ) {
      matches.z = matches.z === 0 ? i : matches.x;
    }

    if (matches.x !== 0 && matches.y !== 0 && matches.z !== 0) {
      const lcm = calculateLCM(calculateLCM(matches.x, matches.y), matches.z);
      const universeHasReset = lcm * 2;
      console.log(matches, "LCM:", lcm);
      console.log("Part 2 Solution:", universeHasReset);
      break;
    }
    allLocations.push(update);
  }

  // run total energy calculation
  arrayForEnergyTotal = allLocations[1000];
  const moon1Energy = calculateMoonEnergy(arrayForEnergyTotal[0]);
  const moon2Energy = calculateMoonEnergy(arrayForEnergyTotal[1]);
  const moon3Energy = calculateMoonEnergy(arrayForEnergyTotal[2]);
  const moon4Energy = calculateMoonEnergy(arrayForEnergyTotal[3]);
  const totalEnergy = moon1Energy + moon2Energy + moon3Energy + moon4Energy;
  console.log("Part 1 Solution: ", totalEnergy);
}

function getIndices(string, findChar) {
  var indices = [];
  for (var i = 0; i < string.length; i++) {
    if (string[i] === findChar) indices.push(i);
  }
  return indices;
}

function calculateMoonEnergy(moon) {
  return (
    (Math.abs(moon.xLoc) + Math.abs(moon.yLoc) + Math.abs(moon.zLoc)) *
    (Math.abs(moon.xVel) + Math.abs(moon.yVel) + Math.abs(moon.zVel))
  );
}

function getNewVelocity(allLocations, index, axis, moon) {
  let others = [];
  switch (moon) {
    case 0:
      others = [1, 2, 3];
      break;
    case 1:
      others = [0, 2, 3];
      break;
    case 2:
      others = [0, 1, 3];
      break;
    case 3:
      others = [0, 1, 2];
      break;
  }

  let a =
    allLocations[index][moon][axis] < allLocations[index][others[0]][axis]
      ? 1
      : -1;
  a =
    allLocations[index][moon][axis] === allLocations[index][others[0]][axis]
      ? 0
      : a;

  let b =
    allLocations[index][moon][axis] < allLocations[index][others[1]][axis]
      ? 1
      : -1;
  b =
    allLocations[index][moon][axis] === allLocations[index][others[1]][axis]
      ? 0
      : b;

  let c =
    allLocations[index][moon][axis] < allLocations[index][others[2]][axis]
      ? 1
      : -1;
  c =
    allLocations[index][moon][axis] === allLocations[index][others[2]][axis]
      ? 0
      : c;
  return a + b + c;
}

function calculateLCM(x, y) {
  if (typeof x !== "number" || typeof y !== "number") return false;
  return !x || !y ? 0 : Math.abs((x * y) / gcd_two_numbers(x, y));
}

function gcd_two_numbers(x, y) {
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    var t = y;
    y = x % y;
    x = t;
  }
  return x;
}

day12Solution(eachMoon);
