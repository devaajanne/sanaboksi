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

// {rowIndex : isCorrect}, i.e. correct row 1 -> {0, true}
export type ValidationResults = Record<number, boolean>;
