import type {
  FixedLetters,
  LetterGrid,
  ValidationResults,
} from "../../../types/Types";
import { gameConstants } from "../../../utils/Constants";
import GameRow from "./GameRow";

/**
 * Props for the GameGrid component.
 * @property fixedLetters The fixed letters and their positions for each row.
 * @property gameGrid The current letters entered in the game grid.
 * @property wordLength The number of letters in each word.
 * @property validationResults The validation results for each row, if available.
 * @property handleFieldChange Callback for updating a letter in the game grid.
 */
interface GameGridProps {
  fixedLetters: FixedLetters;
  gameGrid: LetterGrid;
  wordLength: number;
  validationResults?: ValidationResults;
  handleFieldChange: (
    rowIndex: number,
    columnIndex: number,
    value: string,
  ) => void;
}

export default function GameGrid({
  fixedLetters,
  gameGrid,
  wordLength,
  validationResults,
  handleFieldChange,
}: GameGridProps) {
  return (
    <>
      {fixedLetters.length === 0
        ? // Render empty game grid rows
          Array.from({ length: gameConstants.WORD_COUNT_5 }).map((_, index) => (
            <GameRow
              key={index}
              rowIndex={index}
              isPlaceholder={true}
              rowLength={wordLength}
            />
          ))
        : // Render game grid with fixed letters
          fixedLetters.map((fixedLetter, rowIndex) => (
            <GameRow
              key={rowIndex}
              fixedLetter={fixedLetter}
              rowData={gameGrid[rowIndex]}
              rowIndex={rowIndex}
              rowLength={wordLength}
              onFieldChange={(columnIndex, value) =>
                handleFieldChange(rowIndex, columnIndex, value)
              }
              isCorrect={
                validationResults
                  ? validationResults[rowIndex.toString()]?.["correctWord"]
                  : undefined
              }
              isDuplicate={
                validationResults
                  ? validationResults[rowIndex.toString()]?.["duplicateWord"]
                  : undefined
              }
            />
          ))}
    </>
  );
}
