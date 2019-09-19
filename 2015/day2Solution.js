var fs = require("fs");

const data = fs.readFileSync("problemTwoInput.txt", "utf8");

function day2Solution(data) {
  const dataRows = data.split("\n");
  const totalWrappingPaperNeeded = dataRows.reduce((totalArea, giftBox) => {
    dimensions = giftBox.split("x");
    sides = 2 * dimensions[0] * dimensions[1];
    front = 2 * dimensions[1] * dimensions[2];
    top = 2 * dimensions[0] * dimensions[2];
    area = sides + front + top + Math.min(sides / 2, front / 2, top / 2);

    // calculate ribbon
    const min = Math.min(...dimensions);
    let secondSmallestSide = dimensions.filter(
      (value, index) =>
        index != dimensions.indexOf(Math.min(...dimensions).toString())
    );
    let totalRibbon =
      dimensions[0] * dimensions[1] * dimensions[2] +
      2 * Math.min(...dimensions) +
      2 * Math.min(...secondSmallestSide);
    return totalArea + area;
  }, 0);

  return totalWrappingPaperNeeded;
}

function day2SolutionPart2(data) {
  const dataRows = data.split("\n");
  const totalRibbonNeededNeeded = dataRows.reduce((ribbonNeeded, giftBox) => {
    dimensions = giftBox.split("x");

    // calculate ribbon
    const min = Math.min(...dimensions);
    let secondSmallestSide = dimensions.filter(
      (value, index) =>
        index != dimensions.indexOf(Math.min(...dimensions).toString())
    );
    let totalRibbon =
      dimensions[0] * dimensions[1] * dimensions[2] +
      2 * Math.min(...dimensions) +
      2 * Math.min(...secondSmallestSide);
    console.log(totalRibbon, "total Ribbon");
    return ribbonNeeded + totalRibbon;
  }, 0);

  return totalRibbonNeededNeeded;
}

console.log(day2Solution(data));
console.log(day2SolutionPart2(data));
