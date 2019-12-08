var fs = require("fs");
var path = require("path");

const data = fs.readFileSync("day8Input.txt", "utf8");

function day8SolutionPart1(data) {
  let layers = getLayers(data);
  for (var i = 0; i < data.length; i = i + 150) {
    layers.push(data.substring(i, i + 150));
  }
  let zeroCount = [];
  layers.forEach(layer => {
    zeroCount.push(layer.split("0").length - 1);
  });
  const leastZeroLayer = layers[zeroCount.indexOf(Math.min(...zeroCount))];

  const twoDigits = leastZeroLayer.split("2").length - 1;
  const oneDigits = leastZeroLayer.split("1").length - 1;
  console.log("Part 1 Solution:", twoDigits * oneDigits);
}

function day8SolutionPart2(data) {
  let layers = getLayers(data);
  let image = "";
  for (var k = 0; k < 150; k++) {
    let n = 0;
    while (layers[n].charAt(k) === "2") {
      n++;
    }
    image = image + layers[n].charAt(k);
  }
  image = image.replace(/0/gi, " ");
  console.log();
  for (var l = 0; l < 150; l = l + 25) {
    console.log(image.substring(l, l + 25));
  }
}

function getLayers(data) {
  let layers = [];
  for (var i = 0; i < data.length; i = i + 150) {
    layers.push(data.substring(i, i + 150));
  }
  return layers;
}

day8SolutionPart1(data);
day8SolutionPart2(data);
