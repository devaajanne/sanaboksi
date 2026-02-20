export type FixedLetter = {
  fixedIndex: number;
  fixedLetter: string;
};

export type FixedLetters = FixedLetter[];

export type FixedLetterResponse = {
  wordLength: number;
  fixedLetters: FixedLetter[];
};

export type GameGrid = string[][];

/**
 * Validation results for each row in the game grid.
 * The key is the row index, and the value is whether the row is correct.
 * Example: { "0": true, "1": false }
 */
export type ValidationResults = Record<string, boolean> | undefined;
