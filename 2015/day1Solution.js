var fs = require("fs");
var path = require("path");

const data = fs.readFileSync("problemOneInput.txt", "utf8");

function dayOneSolution(data) {
  dataArray = data.split("");
  let santaIsInBasement = 0;
  const floorSantaIsOn = dataArray.reduce((count, upOrDown, index) => {
    if (count === -1 && santaIsInBasement === 0) {
      santaIsInBasement = index;
    }
    if (upOrDown == "(") {
      return count + 1;
    } else {
      return count - 1;
    }
  }, 0);
  console.log("Santa in Basement", santaIsInBasement);
  return floorSantaIsOn;
}

const answer = dayOneSolution(data);
console.log(answer);
