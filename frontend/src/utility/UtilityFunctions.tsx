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
 * Checks if all words in the game grid are not duplicates based on validation results.
 * @param validationResults Validation results map to check.
 * @returns true if game grid does not contain duplicates, false otherwise.
 */
const gameGridContainsOnlyUniqueWords = (
  validationResults: ValidationResults,
) => {
  if (!validationResults) {
    return false;
  }
  const rowCorrectness = Object.values(validationResults);
  if (rowCorrectness.length === 0) {
    return false;
  }
  return rowCorrectness.every((value) => value?.["duplicateWord"] === false);
};

/**
 * Checks if all words in the game grid are correct based on validation results.
 * @param validationResults Validation results map to check.
 * @returns true if all words are correct, false otherwise.
 */
const gameGridContainsOnlyCorrectWords = (
  validationResults: ValidationResults,
) => {
  if (!validationResults) {
    return false;
  }
  const rowCorrectness = Object.values(validationResults);
  if (rowCorrectness.length === 0) {
    return false;
  }
  return rowCorrectness.every((value) => value?.["correctWord"] === true);
};

/**
 * Returns a promise that resolves after a specified delay.
 * Useful for introducing pauses in async functions (e.g., for UI effects).
 * @param delay The delay in milliseconds before the promise resolves.
 * @returns A promise that resolves after the given delay.
 */
function addWaitTime(delay: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export {
  checkGameGridValidity,
  gameGridContainsOnlyUniqueWords,
  gameGridContainsOnlyCorrectWords,
  addWaitTime,
};
