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
