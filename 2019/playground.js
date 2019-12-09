// switch (parsedInstruction[3]) {
//   case 1:
//     executeInstructionAddMultiply(parsedInstruction, "+", instructions, i);
//     i = i + 4;
//     break;
//   case 2:
//     executeInstructionAddMultiply(parsedInstruction, "*", instructions, i);
//     i = i + 4;
//     break;
//   case 3:
//     if (firstInput) {
//       instructions[instructions[i + 1]] = phaseSetting;
//     } else {
//       instructions[instructions[i + 1]] = input;
//     }
//     firstInput = false;
//     i = i + 2;
//     break;
//   case 4:
//     outputReturn = instructions[instructions[i + 1]];
//     i = i + 2;
//     return [outputReturn, instructions, i];
//     break;
//   case 5:
//     i = executeJump(parsedInstruction, 1, instructions, i);
//     break;
//   case 6:
//     i = executeJump(parsedInstruction, 0, instructions, i);
//     break;
//   case 7:
//     executeConditional(parsedInstruction, 1, instructions, i);
//     i = i + 4;
//     break;
//   case 8:
//     executeConditional(parsedInstruction, 0, instructions, i);
//     i = i + 4;
//     break;
//   case 9:
//     break;
//   case 99:
//     break;
// }
