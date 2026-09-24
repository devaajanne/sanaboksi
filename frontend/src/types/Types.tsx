export type FixedLetter = { fixedIndex: number; fixedLetter: string };

export type FixedLetters = FixedLetter[];

export type FixedLetterResponse = {
  wordLength: number;
  fixedLetters: FixedLetter[];
};

export type LetterGrid = string[][];

export type GameRowRef = {
  hasFocusedInput: () => boolean;
  pressVirtualKey: (key: string) => void;
  pressVirtualBackspace: () => void;
};

export type GameGridRef = Omit<GameRowRef, "hasFocusedInput">;

/**
 * Validation results for each row in the game grid.
 * The key is the row index, and the value is a map of validation categories to booleans.
 * Example: { "0": { "correctWord": true, "duplicateWord": false } }
 */
export type ValidationResults =
  Record<string, Record<string, boolean>> | undefined;

export const NotificationModalSource = {
  NoSource: 0,
  GameGridValidityCheck: 1,
  DuplicateWords: 2,
  IncorrectWords: 3,
  DuplicateWordsAndIncorrectWords: 4,
  CorrectWords: 5,
  UnfinishedGrid: 6,
  GameGridFetchFailed: 7,
  GameGridValidationFailed: 8
} as const;

export type NotificationModalSource =
  (typeof NotificationModalSource)[keyof typeof NotificationModalSource];

export type GameContextType = {
  wordLength: number;
  setWordLength: (wordLength: number) => void;
  notificationModalSource: NotificationModalSource;
  setNotificationModalSource: (
    notificationModalSource: NotificationModalSource
  ) => void;
};

type GameDifficulty = {
  wordLength: number;
  setWordLength: (wordLength: number) => void;
};

type FormFields = {
  formType: string;
  formTitle: string;
  formBody: string;
};

type UserDeviceInfo = {
  deviceType: string | undefined;
  os: string | undefined;
  browser: string | undefined;
  viewportHeight: number | undefined;
  viewportWidth: number | undefined;
};

export type BugReportOrFeedback = {
  formFields: FormFields;
  userDeviceInfo: UserDeviceInfo;
};

export type GameSettingsContextType = { gameDifficulty: GameDifficulty };

export type NotificationModalSourceType = {
  notificationModalSource: NotificationModalSource;
  setNotificationModalSource: (
    notificationModalSource: NotificationModalSource
  ) => void;
};

export type ViewportContextType = {
  viewportHeight: number;
  viewportWidth: number;
  xs: boolean;
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
  isMobile: boolean;
};
