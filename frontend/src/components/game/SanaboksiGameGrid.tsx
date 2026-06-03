import { useState, useEffect, useCallback } from "react";
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
import {
  ActionIcon,
  Button,
  Center,
  Container,
  Space,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NotificationModal from "../modals/NotificationModal";
import { useColorPalette } from "../../hooks/useColorPalette";
import {
  colorPaletteConstants,
  gameConstants,
  languageConstants,
  stylingConstants,
} from "../../utility/Constants";
import { useTranslation } from "react-i18next";
import { useGameSettings } from "../../context/GameSettingsContext";
import { useViewport } from "../../context/ViewportContext";
import { IconReload } from "@tabler/icons-react";

/**
 * Main component for rendering and managing the Sanaboksi game grid.
 * Handles fetching, validation, and user interaction for the grid.
 * @returns The rendered game grid and controls.
 */
export default function SanaboksiGameGrid() {
  const colorPalette = useColorPalette();
  const { t } = useTranslation();
  const { wordLength } = useGameSettings();
  const { isSmViewport } = useViewport();
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
  const [notificationModalSource, setNotificationModalSource] =
    useState<NotificationModalSource>(NotificationModalSource.NoSource);
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const buttonTextFontSize = isSmViewport
    ? stylingConstants.BUTTON_TEXT_FONT_SIZE_SMALL
    : stylingConstants.BUTTON_TEXT_FONT_SIZE_LARGE;
  const headerIconSize = isSmViewport
    ? stylingConstants.HEADER_ICON_SIZE_SMALL
    : stylingConstants.HEADER_ICON_SIZE_LARGE;
  const tooltipPosition = stylingConstants.TOOLTIP_POSITION;
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
        <Stack
          gap={
            isSmViewport
              ? stylingConstants.GAME_GRID_ROW_GAP_SMALL
              : stylingConstants.GAME_GRID_ROW_GAP_LARGE
          }
          styles={{ root: { position: "relative" } }}
        >
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

      <Space h={isSmViewport ? "sm" : "lg"} />

      <Container
        strategy="grid"
        styles={{
          root: {
            marginTop: isSmViewport
              ? stylingConstants.GAME_GRID_BUTTON_MARGIN_TOP_SMALL
              : stylingConstants.GAME_GRID_BUTTON_MARGIN_TOP_LARGE,
            marginBottom: isSmViewport
              ? stylingConstants.GAME_GRID_BUTTON_MARGIN_BOTTOM_SMALL
              : stylingConstants.GAME_GRID_BUTTON_MARGIN_BOTTOM_LARGE,
          },
        }}
      >
        {isValidGameGrid && isCorrectGameGrid ? (
          <Button
            onClick={() =>
              fetchFixedLetters(
                languageConstants.FI,
                gameConstants.WORD_COUNT_5,
              )
            }
            loading={isLoading}
            loaderProps={{
              type: "dots",
              color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
            }}
            size={isSmViewport ? "lg" : "xl"}
            color={colorPalette[colorPaletteConstants.PRIMARY_COLOR_0]}
            styles={{
              label: {
                color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
              },
              root: {
                backgroundColor:
                  colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
                borderColor:
                  colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
                borderWidth: stylingConstants.BORDER_WIDTH,
              },
            }}
          >
            <Text
              span
              styles={{
                root: {
                  color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
                  fontSize: buttonTextFontSize,
                },
              }}
            >
              {t("GameGridButton.NewGame")}
            </Text>
          </Button>
        ) : (
          <Button
            onClick={handleGameGridValidation}
            loading={isLoading}
            loaderProps={{
              type: "dots",
              color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
            }}
            size={isSmViewport ? "lg" : "xl"}
            color={colorPalette[colorPaletteConstants.PRIMARY_COLOR_0]}
            styles={{
              label: {
                color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
              },
              root: {
                backgroundColor:
                  colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
                borderColor:
                  colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
                borderWidth: stylingConstants.BORDER_WIDTH,
              },
            }}
          >
            <Text
              span
              styles={{
                root: {
                  color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
                  fontSize: buttonTextFontSize,
                },
              }}
            >
              {t("GameGridButton.ValidateWords")}
            </Text>
          </Button>
        )}
      </Container>

      <Center>
        <Tooltip
          label={
            isCorrectGameGrid
              ? t("Tooltip.LoadNewGameGridByPressingNewGameTooltip")
              : t("Tooltip.LoadNewGameGridTooltip")
          }
          disabled={isLoading}
          color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
          position={tooltipPosition}
          styles={{
            tooltip: {
              color: colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
            },
          }}
        >
          <ActionIcon
            aria-label={
              isCorrectGameGrid
                ? t("AriaLabel.LoadNewGameGridByPressingNewGame")
                : t("AriaLabel.LoadNewGameGrid")
            }
            aria-disabled={reloadIconDisabled}
            variant="subtle"
            disabled={reloadIconDisabled}
            size={headerIconSize}
            onClick={() => {
              if (!reloadIconDisabled)
                fetchFixedLetters(
                  languageConstants.FI,
                  gameConstants.WORD_COUNT_5,
                );
            }}
            styles={{
              root: {
                backgroundColor:
                  colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
                color: reloadIconDisabled
                  ? colorPalette[colorPaletteConstants.TERTIARY_COLOR_2]
                  : colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
              },
            }}
          >
            <IconReload
              size={headerIconSize}
              strokeWidth={stylingConstants.ICON_STROKE_WIDTH}
            />
          </ActionIcon>
        </Tooltip>
      </Center>

      <NotificationModal
        source={notificationModalSource}
        opened={opened}
        onClose={close}
      />
    </>
  );
}
