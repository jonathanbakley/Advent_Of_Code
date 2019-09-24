var input = "abcdef609043";
var crypto = require("crypto");

function dayFourSolution(input) {
  // Add numbers starting with 1

  const md5Solution = crypto
    .createHash("md5")
    .update(input)
    .digest("hex");
  console.log(md5Solution);
}

dayFourSolution(input);
