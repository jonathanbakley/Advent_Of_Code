function day4Solution(start, end) {
  let numberOfPasswords = end - start;

  for (var currentPass = start; currentPass < end; currentPass++) {
    const allAscending = checkForNoDecrease(currentPass);

    // uncomment checkForDuplicatePart1 and comment out checkForDuplicate for part 1
    // const isDuplicate = checkForDuplicate(currentPass);
    const isDuplicate = checkForDuplicatePart1(currentPass);

    if (!allAscending || !isDuplicate) {
      numberOfPasswords--;
    }
  }

  console.log("Part 1 Number of Passwords: ", numberOfPasswords);
}

function day4SolutionPart2(start, end) {
  let numberOfPasswords = end - start;

  for (var currentPass = start; currentPass < end; currentPass++) {
    const allAscending = checkForNoDecrease(currentPass);

    const isDuplicate = checkForDuplicate(currentPass);

    if (!allAscending || !isDuplicate) {
      numberOfPasswords--;
    }
  }

  console.log("Part 2 Number of Passwords: ", numberOfPasswords);
}

/**
 * Makes sure there is at least 2 adjacent numbers in an integer
 * The numbers must all not be more than 2.
 * @param {int} password 6 digit password
 */
function checkForDuplicate(password) {
  const passwordArray = password.toString().split("");
  let twoAdjacent = false;
  let doublesTest = [];
  passwordArray.forEach((passDigit, i) => {
    if (passDigit === passwordArray[i + 1]) {
      doublesTest.push(i);
    }
  });

  // Additional check added for part 2, this ensures one of the duplicates is actually
  // a duplicate and not a triple or more.
  doublesTest.forEach(index => {
    if (
      passwordArray[index] !== passwordArray[index + 2] &&
      passwordArray[index] !== passwordArray[index - 1]
    ) {
      twoAdjacent = true;
    }
  });

  return twoAdjacent;
}

/**
 * Makes sure there is at least 2 adjacent numbers in an integer
 * @param {int} password 6 digit password
 */
function checkForDuplicatePart1(password) {
  const passwordArray = password.toString().split("");
  let twoAdjacent = false;
  passwordArray.forEach((passDigit, i) => {
    if (passDigit === passwordArray[i + 1]) {
      twoAdjacent = true;
    }
  });

  return twoAdjacent;
}

/**
 * Makes sure that each digit is at least equivalent if not greater than the previous
 * @param {int} password 6 digit password
 */
function checkForNoDecrease(password) {
  const passwordArray = password.toString().split("");
  let alwaysAscending = true;
  passwordArray.forEach((passDigit, i) => {
    if (passDigit > passwordArray[i + 1]) {
      alwaysAscending = false;
    }
  });
  return alwaysAscending;
}

day4Solution(246540, 787419);
day4SolutionPart2(246540, 787419);
