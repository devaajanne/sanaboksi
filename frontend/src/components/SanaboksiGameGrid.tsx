import { useState, useEffect } from "react";
import type { FixedLetters, GameGrid } from "../types/Types";
import { getFixedLetters } from "../api/Api";
import SanaboksiGameRow from "./SanaboksiGameRow";

export default function SanaboksiGameGrid() {
  // Store the fixed letters configuration for each row (which index has which fixed letter)
  const [fixedLetters, setFixedLetters] = useState<FixedLetters>([]);
  // Store the actual game grid data (5x5 array of characters)
  const [gameGrid, setGameGrid] = useState<GameGrid>([]);

  /**
   * Fetches fixed letters from the API and initializes the game grid
   * @param rowCount - Number of rows to fetch
   */
  const fetchFixedLetters = async (rowCount: number) => {
    try {
      const data = await getFixedLetters(rowCount);
      const letters = Array.isArray(data) ? data : [];

      setFixedLetters(letters);
      setGameGrid(
        letters.map((item) =>
          Array(5)
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

  // Fetch fixed letters on component mount
  useEffect(() => {
    const initialFetch = async () => {
      await fetchFixedLetters(5);
    };
    initialFetch();
  }, []);

  return (
    <>
      {fixedLetters.length === 0
        ? // Render empty game grid rows
          Array.from({ length: 5 }).map((_, index) => (
            <SanaboksiGameRow key={index} isEmpty={true} />
          ))
        : // Render game grid with fixed letters
          fixedLetters.map((fixedLetter, rowIndex) => (
            <SanaboksiGameRow
              key={rowIndex}
              fixedLetter={fixedLetter}
              rowData={gameGrid[rowIndex]}
            />
          ))}
    </>
  );
}
