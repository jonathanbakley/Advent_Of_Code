var fs = require("fs");
var path = require("path");

const data = fs.readFileSync(
  path.resolve(__dirname, "./day14InputTEST.txt"),
  "utf8"
);

const instructions = data.split("\n");

function day14Solution(instructions) {
  // format horendous data
  const updatedInstructions = instructions.map(instruction =>
    instruction.split("=>")
  );
  const newInstructions = updatedInstructions.map(instruction => {
    const inputs = instruction[0].split(",");
    const [valueIn, nameIn] = instruction[1].trim().split(" ");
    inputsObject = {};
    outputObject = {};
    inputs.forEach(input => {
      const [value, name] = input.trim().split(" ");
      inputsObject[name] = parseInt(value, 10);
    });
    outputObject[nameIn] = parseInt(valueIn, 10);
    return [inputsObject, outputObject];
  });
  // console.log(newInstructions);

  let [[oneFuel]] = newInstructions.filter(
    instruction => instruction[1]["FUEL"]
  );
  let ores = newInstructions.filter(instruction => instruction[0]["ORE"]);

  // console.log(oneFuel);
  // console.log(ores);

  // const keysFuel = Object.keys(oneFuel);
  // const fuels = [];
  // perm(keysFuel).forEach(keySet => {
  //   const passedInFuel = {};
  //   keySet.forEach(key => {
  //     passedInFuel[key] = oneFuel[key];
  //   });
  //   // console.log(passedInFuel);
  //   const fuel = runMatchingCalculation(passedInFuel, ores, newInstructions, 0);
  //   fuels.push(fuel["ORE"]);
  // });

  // console.log(Math.min(...fuels));

  console.log(runMatchingCalculation(oneFuel, ores, newInstructions, 0));
  // 3. if onefuel.length equals current checking value
  // check to see if all inputs have ore values
  // false
  // call function again

  // true
  // add up common values
  // do final calculation
}

function runMatchingCalculation(oneFuel, ores, newInstructions, flag) {
  // check if value has corresponding ore value
  let oneFuelKeys = Object.keys(oneFuel);
  let oneFuelValues = Object.values(oneFuel);

  for (var i = 0; i < oneFuelKeys.length; i++) {
    // if flag is set we need to check all possible outcomes and pick best

    // no - move on
    if (!ores[oneFuelKeys[i]] && oneFuelKeys[i] !== "ORE") {
      // 1. look for case of value on right side and store input value
      const [[equevalentValue, valueProcduced]] = newInstructions.filter(
        instruction => {
          // console.log(instruction[1], oneFuelKeys[i]);
          return instruction[1][oneFuelKeys[i]] ? true : false;
        }
      );

      // 2. replace all inputs with of value with the stored input value
      // console.log("Inputs", equevalentValue);
      // console.log("Ouput", valueProcduced);
      const valueOfInputNeeded = oneFuelValues[i];
      const amountProduced = valueProcduced[oneFuelKeys[i]];
      // console.log("Needed", valueOfInputNeeded);
      // console.log("Produced", amountProduced);

      let numberOfCalcsToRun = Math.floor(valueOfInputNeeded / amountProduced);
      Object.keys(equevalentValue).forEach(key => {
        if (amountProduced > valueOfInputNeeded && flag) {
          // TODO: Fix variablility being added here
          oneFuel[key] = oneFuel[key]
            ? equevalentValue[key] + oneFuel[key]
            : equevalentValue[key];
        } else {
          oneFuel[key] = oneFuel[key]
            ? equevalentValue[key] * numberOfCalcsToRun + oneFuel[key]
            : equevalentValue[key] * numberOfCalcsToRun;
        }
      });

      if (numberOfCalcsToRun === 0 && flag) {
        numberOfCalcsToRun = 1;
      }
      oneFuel[oneFuelKeys[i]] =
        oneFuel[oneFuelKeys[i]] - numberOfCalcsToRun * amountProduced;
      if (oneFuel[oneFuelKeys[i]] <= 0) {
        delete oneFuel[oneFuelKeys[i]];
      }
    } else {
    }
  }
  if (Object.keys(oneFuel).length > 1) {
    // console.log(oneFuelKeys[0] === Object.keys(oneFuel)[0]);
    // console.log("Updated oneFuel", oneFuel);
    if (oneFuelKeys[0] === Object.keys(oneFuel)[0]) {
      // console.log(oneFuel);
      runMatchingCalculation(oneFuel, ores, newInstructions, 1);
    }
    runMatchingCalculation(oneFuel, ores, newInstructions, 0);
  }
  return oneFuel;
}

function perm(xs) {
  let ret = [];

  for (let i = 0; i < xs.length; i++) {
    let rest = perm(xs.slice(0, i).concat(xs.slice(i + 1)));

    if (!rest.length) {
      ret.push([xs[i]]);
    } else {
      for (let j = 0; j < rest.length; j++) {
        ret.push([xs[i]].concat(rest[j]));
      }
    }
  }
  return ret;
}

day14Solution(instructions);
