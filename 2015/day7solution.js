var fs = require("fs");
var path = require("path");

const textFile = path.join(__dirname, "problemSevenInput.txt");
const data = fs.readFileSync(textFile, "utf8");

function problemSevenSolution(data) {
  let instructions = data;
  // make into array of lines
  instructions = instructions.split("\n");

  // replace operators
  instructions = instructions.map(instruction => {
    instruction = instruction.replace("RSHIFT", ">>>");
    instruction = instruction.replace("LSHIFT", "<<");
    instruction = instruction.replace("AND", "&");
    instruction = instruction.replace("OR", "|");
    instruction = instruction.replace("NOT", "~");
    instruction = " " + instruction + " ";
    return instruction;
  });

  console.log(instructions);

  for (var i = 0; i < 100; i++) {
    // look for number on left side of "->"
    // take right side and replace all instances with left side
    instructions.forEach((instruction, i) => {
      const partsOfInstruction = instruction.split(" ");
      const firstPart = parseInt(partsOfInstruction[1], 10);

      // console.log(firstPart, partsOfInstruction[2].trim());

      if (!isNaN(firstPart) && partsOfInstruction[2].trim() === "->") {
        console.log("TEST in if statement");
        const searchFor = " " + instruction.split("->")[1].trim() + " ";
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

    // Evaluate expressions
    instructions = instructions.map(instruction => {
      const possibleEval = instruction.split("->")[0].trim();
      try {
        const evaluatedInstruction = eval(possibleEval);
        return evaluatedInstruction + "->" + instruction.split("->")[1];
      } catch (e) {
        // console.log(e);
        return instruction;
      }
    });
    console.log("TEST", instructions[0]);
  }
  console.log(instructions);
}

problemSevenSolution(data);
