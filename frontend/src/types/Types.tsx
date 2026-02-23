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
 * The key is the row index, and the value is a map of validation categories to booleans.
 * Example: { "0": { "correctWord": true, "duplicateWord": false } }
 */
export type ValidationResults =
  | Record<string, Record<string, boolean>>
  | undefined;

export const NotificationModalSource = {
  NoSource: 0,
  GameGridValidityCheck: 1,
  DuplicateWordsCheck: 2,
  IncorrectWords: 3,
  DuplicateWordsAndCorrectWordsCheck: 4,
  CorrectWords: 5,
} as const;

export type NotificationModalSource =
  (typeof NotificationModalSource)[keyof typeof NotificationModalSource];
