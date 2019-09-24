var fs = require("fs");
var path = require("path");

const data = fs.readFileSync("problemFiveInputTEST.txt", "utf8");

function dayFiveSolution(data) {
  eachString = data.split("\n");

  eachString.map((individualString, i) => {
    individualString.split("");

    // vowel check "aeiou" min of 3
    // individualString.map(()
    // double letter check

    // invalid sequence check "ab", "cd", "pq", "xy"
  });
}
