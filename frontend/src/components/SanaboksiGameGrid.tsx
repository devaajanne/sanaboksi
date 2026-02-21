import { useState, useEffect } from "react";
import type { FixedLetters, GameGrid, ValidationResults } from "../types/Types";
import { getFixedLetters, validateGameGrid } from "../api/Api";
import SanaboksiGameRow from "./SanaboksiGameRow";
import AlertBox from "./AlertBox";
import {
  checkGameGridValidity,
  checkGameGridCorrectness,
} from "../utility/UtilityFunctions";
import { Button } from "@mantine/core";

/**
 * Main component for rendering and managing the Sanaboksi game grid.
 * Handles fetching, validation, and user interaction for the grid.
 * @returns The rendered game grid and controls.
 */
export default function SanaboksiGameGrid() {
  // Store the fixed letters configuration for each row (which index has which fixed letter)
  const [fixedLetters, setFixedLetters] = useState<FixedLetters>([]);
  // Store the actual game grid data (2D array of characters with dynamic dimensions)
  const [gameGrid, setGameGrid] = useState<GameGrid>([]);
  const [wordLength, setWordLength] = useState<number>(5);
  const [validationResults, setValidationResults] =
    useState<ValidationResults>(undefined);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  // Game grid is valid if all rows have no empty fields
  const [isValidGameGrid, setIsValidGameGrid] = useState<boolean>(false);
  // Game grid is correct if all rows have a validated and correct word
  const [isCorrectGameGrid, setIsCorrectGameGrid] = useState<boolean>(false);

  /**
   * Fetches fixed letters from the API and initializes the game grid.
   * @param language The language to fetch.
   * @param wordLength Number of letters (columns) to fetch.
   * @param wordCount Number of words (rows) to fetch.
   */
  const fetchFixedLetters = async (
    language: string,
    wordLength: number,
    wordCount: number,
  ) => {
    try {
      const data = await getFixedLetters(language, wordLength, wordCount);
      const fixedLetterData = data ? data.fixedLetters : [];

      setFixedLetters(fixedLetterData);
      setWordLength(wordLength);
      setGameGrid(
        fixedLetterData.map((item) =>
          Array(wordLength)
            .fill("")
            .map((_, i) =>
              i === item.fixedIndex ? item.fixedLetter.toUpperCase() : "",
            ),
        ),
      );
      setValidationResults(undefined);
      setIsValidGameGrid(false);
      setIsCorrectGameGrid(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Failed to fetch fixed letters: Unknown error");
      }
    }
  };

  /**
   * Updates the value of a specific field in the game grid.
   * @param rowIndex The row index to update.
   * @param columnIndex The column index to update.
   * @param value The value to update.
   */
  const handleFieldChange = (
    rowIndex: number,
    columnIndex: number,
    value: string,
  ) => {
    // Only allow single letter strings
    if (typeof value !== "string" || value.length > 1) return;

    setGameGrid((currentGameGrid) => {
      const newGameGrid = currentGameGrid.map((row, i) =>
        i === rowIndex
          ? row.map((field, j) => (j === columnIndex ? value : field))
          : row,
      );
      return newGameGrid;
    });
  };

  /**
   * Validates the current game grid and the inputted words.
   */
  const handleGameGridValidation = async () => {
    try {
      if (!checkGameGridValidity(gameGrid)) {
        setIsValidGameGrid(false);
        setShowAlert(true);
      } else {
        setShowAlert(false);
        const validationResultsData = await validateGameGrid(gameGrid, "fi");
        setValidationResults(validationResultsData);
        setIsValidGameGrid(true);
        setIsCorrectGameGrid(checkGameGridCorrectness(validationResultsData));
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Failed to handle game grid validation: Unknown error");
      }
    }
  };

  /**
   * Fetches a game grid when the component mounts.
   */
  useEffect(() => {
    const initialFetch = async () => {
      await fetchFixedLetters("fi", 5, 5);
    };
    initialFetch();
  }, []);

  // Console.logs for dev, remove when deployed to production
  useEffect(() => {
    console.log("gameGrid:", gameGrid);
  }, [gameGrid]);

  useEffect(() => {
    console.log("validationResults:", validationResults);
  }, [validationResults]);

  return (
    <>
      {showAlert && (
        <AlertBox source="gameGridValidityCheck" setShowAlert={setShowAlert} />
      )}
      {fixedLetters.length === 0
        ? // Render empty game grid rows
          Array.from({ length: wordLength }).map((_, index) => (
            <SanaboksiGameRow
              key={index}
              isPlaceholder={true}
              rowLength={wordLength}
            />
          ))
        : // Render game grid with fixed letters
          fixedLetters.map((fixedLetter, rowIndex) => (
            <SanaboksiGameRow
              key={rowIndex}
              fixedLetter={fixedLetter}
              rowData={gameGrid[rowIndex]}
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
      {isValidGameGrid && isCorrectGameGrid ? (
        <Button onClick={() => fetchFixedLetters("fi", 5, 5)}>
          Play a new game
        </Button>
      ) : (
        <Button onClick={handleGameGridValidation}>Validate game grid</Button>
      )}
    </>
  );
}
