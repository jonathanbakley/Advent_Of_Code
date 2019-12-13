var fs = require("fs");
var path = require("path");

const data = fs.readFileSync(
  path.resolve(__dirname, "./day10Input.txt"),
  "utf8"
);

function day10Solution(data) {
  let parsedData = data.split("\n");
  let asteroids = [];
  parsedData.forEach((line, xIndex) => {
    let splitLine = line.split("");
    for (var i = 0; i < splitLine.length; i++) {
      if (splitLine[i] === "#") {
        asteroids.push([i, xIndex]);
      }
    }
  });
  let slopesArray = [];
  asteroids.forEach((asteroid, index) => {
    slopesArray.push([]);

    for (var k = 0; k < asteroids.length; k++) {
      if (index !== k) {
        let x = asteroids[k][0] - asteroid[0];
        let y = asteroids[k][1] - asteroid[1];
        let slope;
        if (x === 0) {
          slope = y > 0 ? 100000 : -100000;
        } else {
          slope = y / x;
        }
        let quad;
        // in quads 2 or 4
        if (slope < 0) {
          // in quad 2
          if (y < 0) {
            quad = 2;
          } else {
            quad = 4;
          }
        }

        // in quads 2 or 4
        if (slope > 0) {
          // in quad 2
          if (y < 0) {
            quad = 3;
          } else {
            quad = 1;
          }
        }

        if (slope === 0) {
          if (x < 0) {
            quad = 4;
          } else {
            quad = 2;
          }
        }

        quad = slope === -100000 ? 2 : quad;
        quad = slope === 100000 ? 1 : quad;

        const matches = slopesArray[index].filter(
          item => item.slope === slope && item.quad === quad
        ).length;
        if (matches === 0) {
          slopesArray[index].push({
            slope: slope,
            quad: quad,
            location: asteroids[k]
          });
        }
      }
    }
  });
  const visibleAsteroids = slopesArray.map(singleArray => singleArray.length);

  // location of most visible asteroids
  const mostVisible = visibleAsteroids.indexOf(Math.max(...visibleAsteroids));
  console.log("Part 1 Location:", asteroids[mostVisible]);
  // total number of max visible
  console.log("Part 1 Total Visible:", Math.max(...visibleAsteroids));

  day10SolutionPart2(slopesArray[mostVisible]);
}

function day10SolutionPart2(slopesAndQuad) {
  const quad4 = getQuadSlopes(4, slopesAndQuad);
  const quad1 = getQuadSlopes(1, slopesAndQuad);
  const quad2 = getQuadSlopes(2, slopesAndQuad);
  const quad3 = getQuadSlopes(3, slopesAndQuad);

  const sorted = quad2
    .concat(quad1)
    .concat(quad4)
    .concat(quad3);

  const solutionFormatted =
    sorted[199].location[0] * 100 + sorted[199].location[1];
  console.log("Part 2:", sorted[200 - 1]);
  console.log("Part 2 Solution:", solutionFormatted);
}

function getQuadSlopes(num, slopesAndQuad) {
  const quad = slopesAndQuad.filter(item => item.quad === num);
  return quad.sort((a, b) => {
    const slopeA = a.slope;
    const slopeB = b.slope;

    if (slopeA > slopeB) {
      return 1;
    }
    return -1;
  });
}

day10Solution(data);
