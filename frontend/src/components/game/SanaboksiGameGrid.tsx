import { useState, useEffect } from "react";
import {
  type FixedLetters,
  type GameGrid,
  type ValidationResults,
  NotificationModalSource,
} from "../../types/Types";
import { getFixedLetters, validateGameGrid } from "../../api/Api";
import SanaboksiGameRow from "./SanaboksiGameRow";
import {
  checkGameGridValidity,
  gameGridContainsOnlyUniqueWords,
  gameGridContainsOnlyCorrectWords,
} from "../../utility/UtilityFunctions";
import { Button, Container, Space, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NotificationModal from "../modals/NotificationModal";
import { useColorPalette } from "../../hooks/useColorPalette";
import { useTranslation } from "react-i18next";

/**
 * Main component for rendering and managing the Sanaboksi game grid.
 * Handles fetching, validation, and user interaction for the grid.
 * @returns The rendered game grid and controls.
 */
export default function SanaboksiGameGrid() {
  const colorPalette = useColorPalette();
  const { t } = useTranslation();
  // Store the fixed letters configuration for each row (which index has which fixed letter)
  const [fixedLetters, setFixedLetters] = useState<FixedLetters>([]);
  // Store the actual game grid data (2D array of characters with dynamic dimensions)
  const [gameGrid, setGameGrid] = useState<GameGrid>([]);
  const [wordLength, setWordLength] = useState<number>(5);
  const [validationResults, setValidationResults] =
    useState<ValidationResults>(undefined);
  // Game grid is valid if all rows have no empty fields
  const [isValidGameGrid, setIsValidGameGrid] = useState<boolean>(false);
  // Game grid is correct if all rows have a validated and correct word
  const [isCorrectGameGrid, setIsCorrectGameGrid] = useState<boolean>(false);
  const [notificationModalSource, setNotificationModalSource] =
    useState<NotificationModalSource>(NotificationModalSource.NoSource);
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      setIsLoading(true);
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
      setIsLoading(false);
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
        handleNotificationModalOpen(
          NotificationModalSource.GameGridValidityCheck,
        );
      } else {
        setIsLoading(true);
        const validationResultsData = await validateGameGrid(gameGrid, "fi");
        setValidationResults(validationResultsData);
        setIsValidGameGrid(true);

        const allWordsAreUnique = gameGridContainsOnlyUniqueWords(
          validationResultsData,
        );
        const allWordsAreCorrect = gameGridContainsOnlyCorrectWords(
          validationResultsData,
        );

        // Game grid contains duplicate words and incorrect words
        if (!allWordsAreUnique && !allWordsAreCorrect) {
          handleNotificationModalOpen(
            NotificationModalSource.DuplicateWordsAndIncorrectWords,
          );
          setIsCorrectGameGrid(false);
          setIsLoading(false);
          return;
        }
        // Game grid contains duplicate words
        if (!allWordsAreUnique) {
          handleNotificationModalOpen(NotificationModalSource.DuplicateWords);
          setIsCorrectGameGrid(false);
          setIsLoading(false);
          return;
        }
        // Game grid contains incorrect words
        if (!allWordsAreCorrect) {
          handleNotificationModalOpen(NotificationModalSource.IncorrectWords);
          setIsCorrectGameGrid(false);
          setIsLoading(false);
          return;
        }

        // Game grid contains only correct and non-duplicate words
        handleNotificationModalOpen(NotificationModalSource.CorrectWords);
        setIsCorrectGameGrid(true);
        setIsLoading(false);
        return;
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
   * Opens notification modal and sets the correct source
   * @param notificationModalSource notification source, determines the text shown in modal
   */
  const handleNotificationModalOpen = (
    notificationModalSource: NotificationModalSource,
  ) => {
    setNotificationModalSource(notificationModalSource);
    open();
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

  return (
    <>
      <Container strategy="grid" aria-label={t("AriaLabel.SanaBoksiGameGrid")}>
        <Stack gap={9} styles={{ root: { position: "relative" } }}>
          {fixedLetters.length === 0
            ? // Render empty game grid rows
              Array.from({ length: wordLength }).map((_, index) => (
                <SanaboksiGameRow
                  key={index}
                  rowIndex={index}
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
                      ? validationResults[rowIndex.toString()]?.[
                          "duplicateWord"
                        ]
                      : undefined
                  }
                />
              ))}
        </Stack>
      </Container>

      <Space h="lg" />

      <Container strategy="grid">
        {isValidGameGrid && isCorrectGameGrid ? (
          <Button
            onClick={() => fetchFixedLetters("fi", 5, 5)}
            loading={isLoading}
            loaderProps={{ type: "dots", color: colorPalette[2] }}
            size="lg"
            color={colorPalette[0]}
            styles={{
              label: {
                color: colorPalette[1],
              },
              root: {
                backgroundColor: colorPalette[0],
                borderColor: colorPalette[1],
                borderWidth: 3,
              },
            }}
          >
            {t("GameGridButton.NewGame")}
          </Button>
        ) : (
          <Button
            onClick={handleGameGridValidation}
            loading={isLoading}
            loaderProps={{ type: "dots", color: colorPalette[2] }}
            size="lg"
            color={colorPalette[0]}
            styles={{
              label: {
                color: colorPalette[1],
              },
              root: {
                backgroundColor: colorPalette[0],
                borderColor: colorPalette[1],
                borderWidth: 3,
              },
            }}
          >
            {t("GameGridButton.ValidateWords")}
          </Button>
        )}
      </Container>

      <NotificationModal
        source={notificationModalSource}
        opened={opened}
        onClose={close}
      />
    </>
  );
}
