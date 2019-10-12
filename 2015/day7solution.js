var fs = require("fs");
var path = require("path");

const textFile = path.join(__dirname, "problemSevenInput.txt");
const data = fs.readFileSync(textFile, "utf8");

function problemSevenSolution(data) {
  let instructions = data;
  // make into array of lines
  instructions = instructions.split("\n");

  instructions = instructions.map(instruction => {
    instruction = instruction.replace("RSHIFT", ">>>");
    instruction = instruction.replace("LSHIFT", "<<");
    instruction = instruction.replace("AND", "&");
    instruction = instruction.replace("OR", "|");
    instruction = instruction.replace("NOT", "~");
    return instruction;
  });

  console.log(instructions);
  // look for number on left side of "->"
  // take right side and replace all instances with left side
  instructions.forEach((instruction, i) => {
    const partsOfInstruction = instruction.split(" ");
    const firstPart = parseInt(partsOfInstruction[0], 10);

    if (!isNaN(firstPart) && partsOfInstruction[1].trim() === "->") {
      const searchFor = instruction.split("->")[1].trim() + " ";
      const replacement = instruction.split("->")[0].trim();
      console.log(
        instruction,
        searchFor,
        "searchFor",
        replacement,
        "replacement"
      );
      instructions = instructions.map((instruction, index) => {
        if (index === i) {
          return instruction;
        }
        let returnVal = instruction.replace(searchFor, replacement);
        // console.log("returnVal: ", returnVal);
        return returnVal;
      });
    }
  });

  console.log(instructions);
}

for (var i = 0; i < 10; i++) {
  problemSevenSolution(data);
}
