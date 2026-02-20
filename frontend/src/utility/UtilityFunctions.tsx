import type { GameGrid, ValidationResults } from "../types/Types";

/**
 * Checks if the game grid is valid (i.e., all fields are filled).
 * @param gameGrid The game grid to check.
 * @returns true if all fields are filled, false otherwise.
 */
const checkGameGridValidity = (gameGrid: GameGrid) => {
  if (!gameGrid || gameGrid.length === 0) {
    return false;
  }

  for (let rowIndex: number = 0; rowIndex < gameGrid.length; rowIndex++) {
    for (
      let columnIndex: number = 0;
      columnIndex < gameGrid[rowIndex].length;
      columnIndex++
    ) {
      if (
        gameGrid[rowIndex][columnIndex] === "" ||
        gameGrid[rowIndex][columnIndex].length == 0
      ) {
        return false;
      }
    }
  }
  return true;
};

/**
 * Checks if all words in the game grid are correct based on validation results.
 * @param validationResults Validation results map to check.
 * @returns true if all words are correct, false otherwise.
 */
const checkGameGridCorrectness = (validationResults: ValidationResults) => {
  if (!validationResults) {
    return false;
  }
  const rowCorrectness = Object.values(validationResults);
  if (rowCorrectness.length === 0) {
    return false;
  }

  return rowCorrectness.every((value) => value?.["correctWord"] === true);
};

export { checkGameGridValidity, checkGameGridCorrectness };
