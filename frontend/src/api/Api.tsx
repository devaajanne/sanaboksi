import axios from "axios";
import type { FixedLetters } from "../types/Types";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const getFixedLetters = async (
  count: number,
): Promise<FixedLetters | undefined> => {
  try {
    const response = await axios.get(
      `${SERVER_URL}/api/fixed-letters/${count}`,
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export { getFixedLetters };
