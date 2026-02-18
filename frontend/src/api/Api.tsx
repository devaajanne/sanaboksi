import axios from "axios";
import type {
  FixedLetterResponse,
  GameGrid,
  ValidationResults,
} from "../types/Types";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const getFixedLetters = async (
  language: string,
  wordLength: number,
  wordCount: number,
): Promise<FixedLetterResponse | undefined> => {
  const languageEnum = language.toUpperCase();

  try {
    const response = await axios.get(
      `${SERVER_URL}/api/fixed-letters/${languageEnum}/${wordLength}/${wordCount}`,
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const validateGameGrid = async (
  gameGrid: GameGrid,
  language: string,
): Promise<ValidationResults | undefined> => {
  const languageEnum = language.toUpperCase();
  try {
    const response = await axios.post(
      `${SERVER_URL}/api/validation/${languageEnum}`,
      {
        gameGrid,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.data.validationResults;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { getFixedLetters, validateGameGrid };
