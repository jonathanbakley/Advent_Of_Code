var fs = require("fs");
var path = require("path");

const data = fs.readFileSync("day1Input.txt", "utf8");

const modules = data.split("\n");

const total = modules.reduce((total, singleModule) => {
  let remander = Math.floor(singleModule / 3) - 2;
  let moduleTotal = 0;
  while (remander > 0) {
    moduleTotal = moduleTotal + remander;
    remander = Math.floor(remander / 3) - 2;
  }
  return total + moduleTotal;
}, 0);

console.log("Day 1 Solution: ", total);
