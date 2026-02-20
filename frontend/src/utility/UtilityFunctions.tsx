import type { GameGrid, ValidationResults } from "../types/Types";

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

const checkGameGridCorrectness = (validationResults: ValidationResults) => {
  if (!validationResults) {
    return false;
  }
  const rowCorrectness = Object.values(validationResults);
  if (rowCorrectness.every((value) => value === true)) {
    return true;
  }

  return false;
};

export { checkGameGridValidity, checkGameGridCorrectness };
