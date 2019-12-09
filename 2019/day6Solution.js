var fs = require("fs");
var path = require("path");

const data = fs.readFileSync("day6Input.txt", "utf8");

let newGraph = [];

function day6Solution(data) {
  const orbitArray = data.split("\n");
  let graph = {};

  let lookingForString = "COM";
  addPlanetToGraph(orbitArray, lookingForString, graph);
  // console.log(graph);

  traverseTree(graph, graph[lookingForString]);

  // removes unnecessary undefined values
  for (var b = 0; b < newGraph.length; b++) {
    newGraph[b] = newGraph[b].filter(planet => planet !== undefined);
  }
  // console.log(newGraph);

  // Get total count of orbits
  count = 0;
  newGraph.forEach(line => {
    if (line.length > 0) {
      count = count + line.length - 1;
    }
  });
  console.time("day6");
  // Part 2 Solution
  const orbitsFromSanta = distanceFromSanta(newGraph);
  console.log("Orbits From Santa:", orbitsFromSanta);
  console.log("COUNT: ", count);
  console.timeEnd("day6");
}

/**
 * Takes in an array of instructions and creates an object map or tree that can be traversed
 * @param {Array} orbitArray
 * @param {String} lookingForString
 * @param {Object} graph
 */
function addPlanetToGraph(orbitArray, lookingForString, graph) {
  const instructionsSetOutput = orbitArray.filter(data => {
    const [center, orbiting] = data.split(")");
    return lookingForString === center;
  });
  const instructionsSetInput = orbitArray.filter(data => {
    const [center, orbiting] = data.split(")");
    return lookingForString === orbiting;
  });
  const outputInstructions = instructionsSetOutput.map(instruction => {
    const splitInstruction = instruction.split(")");
    return splitInstruction[1];
  });
  const inputInstruction = instructionsSetInput.map(instruction => {
    const splitInstruction = instruction.split(")");
    return splitInstruction[0];
  });

  graph[lookingForString] = {
    in: [],
    out: []
  };
  graph[lookingForString].in = inputInstruction;
  graph[lookingForString].out = outputInstructions;

  lookForNext = graph[lookingForString].out;
  if (lookForNext.length > 0) {
    lookForNext.forEach(lookForStringNew => {
      addPlanetToGraph(orbitArray, lookForStringNew, graph);
    });
  }
}

/**
 * Goes through the object map creating an updated graph of countable orbits.
 * @param {Object} graph
 * @param {Object} current
 * @param {String} planet
 */
function traverseTree(graph, current, planet) {
  // push new array into newGraph containing all orbits backward
  let backwards = current;
  let singlePlanetList = [planet];
  //   console.log(current, planet);
  while (backwards && backwards.in) {
    singlePlanetList.push(backwards.in[0]);
    backwards = graph[backwards.in];
  }
  newGraph.push(singlePlanetList);

  for (const planet in current.out) {
    var ck = current.out[planet];
    var child = graph[ck];
    traverseTree(graph, child, ck);
  }
}

function distanceFromSanta(newGraph) {
  // Find Santa Line & Find you line
  const youAndSanta = newGraph.filter(
    line => line[0] === "YOU" || line[0] === "SAN"
  );

  youAndSanta[0].splice(0, 1);
  youAndSanta[1].splice(0, 1);

  for (var i = 0; i < youAndSanta[0].length; i++) {
    const indexOfMatch = youAndSanta[1].indexOf(youAndSanta[0][i]);
    if (indexOfMatch !== -1) {
      return i + indexOfMatch;
    }
  }
}

day6Solution(data);
