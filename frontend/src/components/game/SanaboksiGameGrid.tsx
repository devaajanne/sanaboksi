import { useState, useEffect, useCallback } from "react";
import {
  type FixedLetters,
  type GameGrid,
  type ValidationResults,
  NotificationModalSource,
} from "../../types/Types";
import { getFixedLetters, validateGameGrid } from "../../services/ApiService";
import SanaboksiGameRow from "./SanaboksiGameRow";
import {
  checkGameGridValidity,
  gameGridContainsOnlyUniqueWords,
  gameGridContainsOnlyCorrectWords,
  gameGridIsFilledIn,
} from "../../utils/UtilityFunctions";
import {
  Center,
  Container,
  Stack,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NotificationModal from "../modals/NotificationModal";
import {
  colors,
  gameConstants,
  languageConstants,
} from "../../utils/Constants";
import { useTranslation } from "react-i18next";
import { useGameContext } from "../../context/GameContext";
import { useViewportContext } from "../../context/ViewportContext";
import { IconReload } from "@tabler/icons-react";
import StyledTooltip from "../styledComponents/StyledTooltip";
import StyledButton from "../styledComponents/StyledButton";
import StyledActionIcon from "../styledComponents/StyledActionIcon";

/**
 * Main component for rendering and managing the Sanaboksi game grid.
 * Handles fetching, validation, and user interaction for the grid.
 * @returns The rendered game grid and controls.
 */
export default function SanaboksiGameGrid() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const colorPalette =
    colorScheme === "light" ? theme.colors.light : theme.colors.dark;
  const { xs, sm, md, l } = useViewportContext();
  const gameGridRowGap = xs ? 8 : sm ? 10 : md ? 12 : l ? 14 : 16;
  const gameGridMarginTop = xs ? 4 : sm ? 6 : md ? 8 : l ? 10 : 12;
  const gameGridMarginBottom = xs ? 24 : sm ? 30 : md ? 36 : l ? 42 : 48;
  const { t } = useTranslation();
  const { wordLength, notificationModalSource, setNotificationModalSource } =
    useGameContext();
  // Store the fixed letters configuration for each row (which index has which fixed letter)
  const [fixedLetters, setFixedLetters] = useState<FixedLetters>([]);
  // Store the actual game grid data (2D array of characters with dynamic dimensions)
  const [gameGrid, setGameGrid] = useState<GameGrid>([]);
  const [validationResults, setValidationResults] =
    useState<ValidationResults>(undefined);
  // Game grid is valid if all rows have no empty fields
  const [isValidGameGrid, setIsValidGameGrid] = useState<boolean>(false);
  // Game grid is correct if all rows have a validated and correct word
  const [isCorrectGameGrid, setIsCorrectGameGrid] = useState<boolean>(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const reloadIconDisabled = isLoading || isCorrectGameGrid;

  /**
   * Fetches fixed letters from the API and initializes the game grid.
   * @param language The language to fetch.
   * @param wordLength Number of letters (columns) to fetch.
   * @param wordCount Number of words (rows) to fetch.
   */
  const fetchFixedLetters = useCallback(
    async (language: string, wordCount: number) => {
      try {
        setIsLoading(true);
        setGameGrid([]);
        setFixedLetters([]);
        const data = await getFixedLetters(language, wordLength, wordCount);
        const fixedLetterData = data ? data.fixedLetters : [];

        setFixedLetters(fixedLetterData);
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
      } finally {
        setValidationResults(undefined);
        setIsValidGameGrid(false);
        setIsCorrectGameGrid(false);
        setIsLoading(false);
      }
    },
    [wordLength],
  );

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
        const validationResultsData = await validateGameGrid(
          gameGrid,
          languageConstants.FI,
        );
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

  const handleNewGameGridLoading = () => {
    try {
      if (gameGridIsFilledIn(gameGrid)) {
        handleNotificationModalOpen(NotificationModalSource.UnfinishedGrid);
      } else {
        if (!reloadIconDisabled)
          fetchFixedLetters(languageConstants.FI, gameConstants.WORD_COUNT_5);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(
          "Failed to handle new game grid loading: Unknown error",
        );
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
      await fetchFixedLetters(languageConstants.FI, gameConstants.WORD_COUNT_5);
    };
    initialFetch();
  }, [fetchFixedLetters]);

  return (
    <>
      <Container strategy="grid" aria-label={t("AriaLabel.SanaBoksiGameGrid")}>
        <Stack gap={gameGridRowGap} styles={{ root: { position: "relative" } }}>
          {fixedLetters.length === 0
            ? // Render empty game grid rows
              Array.from({ length: gameConstants.WORD_COUNT_5 }).map(
                (_, index) => (
                  <SanaboksiGameRow
                    key={index}
                    rowIndex={index}
                    isPlaceholder={true}
                    rowLength={wordLength}
                  />
                ),
              )
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

      <Container
        strategy="grid"
        styles={{
          root: {
            marginTop: gameGridMarginTop,
            marginBottom: gameGridMarginBottom,
          },
        }}
      >
        {isValidGameGrid && isCorrectGameGrid ? (
          <StyledButton
            ariaLabel={t("GameGridButton.NewGame")}
            onClick={() =>
              fetchFixedLetters(
                languageConstants.FI,
                gameConstants.WORD_COUNT_5,
              )
            }
            buttonText={t("GameGridButton.NewGame")}
            loading={isLoading}
            loaderProps={{
              type: "dots",
              color: colorPalette[colors.SECONDARY_COLOR_1],
            }}
          />
        ) : (
          <StyledButton
            ariaLabel={t("GameGridButton.ValidateWords")}
            onClick={handleGameGridValidation}
            buttonText={t("GameGridButton.ValidateWords")}
            loading={isLoading}
            loaderProps={{
              type: "dots",
              color: colorPalette[colors.SECONDARY_COLOR_1],
            }}
          />
        )}
      </Container>

      <Center>
        <StyledTooltip
          label={
            isCorrectGameGrid
              ? t("Tooltip.LoadNewGameByPressingNewGameTooltip")
              : t("Tooltip.LoadNewGameTooltip")
          }
          disabled={isLoading}
        >
          <StyledActionIcon
            ariaLabel={
              isCorrectGameGrid
                ? t("AriaLabel.LoadNewGameByPressingNewGame")
                : t("AriaLabel.LoadNewGame")
            }
            onClick={handleNewGameGridLoading}
            icon={IconReload}
            disabled={reloadIconDisabled}
          />
        </StyledTooltip>
      </Center>

      <NotificationModal
        source={notificationModalSource}
        opened={opened}
        onClose={close}
        onNewGridLoad={() =>
          fetchFixedLetters(languageConstants.FI, gameConstants.WORD_COUNT_5)
        }
      />
    </>
  );
}
