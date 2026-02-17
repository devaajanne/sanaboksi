import { useState, useEffect } from "react";
import type { FixedLetters, GameGrid } from "../types/Types";
import { getFixedLetters } from "../api/Api";
import SanaboksiGameRow from "./SanaboksiGameRow";

export default function SanaboksiGameGrid() {
  // Store the fixed letters configuration for each row (which index has which fixed letter)
  const [fixedLetters, setFixedLetters] = useState<FixedLetters>([]);
  // Store the actual game grid data (2D array of characters with dynamic dimensions)
  const [gameGrid, setGameGrid] = useState<GameGrid>([]);
  const [wordLength, setWordLength] = useState<number>(5);

  /**
   * Fetches fixed letters from the API and initializes the game grid
   * @param language - Language to fetch
   * @param wordLength - Number of letters (columns) to fetch
   * @param wordCount - Number of words (rows) to fetch
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
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Failed to fetch fixed letters: Unknown error");
      }
    }
  };

  const handleFieldChange = (
    rowIndex: number, // The row to update
    columnIndex: number, // The column to update
    value: string, // The value to update
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

  // Fetch fixed letters on component mount
  useEffect(() => {
    const initialFetch = async () => {
      await fetchFixedLetters("fi", 5, 5);
    };
    initialFetch();
  }, []);

  useEffect(() => {
    console.log(gameGrid);
  }, [gameGrid]);

  return (
    <>
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
            />
          ))}
    </>
  );
}
