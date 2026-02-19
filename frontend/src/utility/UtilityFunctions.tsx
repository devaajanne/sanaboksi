import type { GameGrid } from "../types/Types";

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

export { checkGameGridValidity };
