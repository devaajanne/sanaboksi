import { Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGameSettingsContext } from "../../context/gameSettingsContext/GameSettingsContext";
import { useNotificationModalSourceContext } from "../../context/notificationModalSourceContext/NotificationModalSourceContext";
import { useViewportContext } from "../../context/viewportContext/ViewportContext";
import { getFixedLetters, validateGameGrid } from "../../services/ApiService";
import {
  NotificationModalSource,
  type FixedLetters,
  type GameGridRef,
  type LetterGrid,
  type ValidationResults
} from "../../types/Types";
import { languageConstants } from "../../utils/Constants";
import {
  checkGameGridValidity,
  gameGridContainsOnlyCorrectWords,
  gameGridContainsOnlyUniqueWords,
  gameGridIsFilledIn
} from "../../utils/UtilityFunctions";
import NotificationModal from "../modals/NotificationModal";
import { GameButtonReload } from "./gameComponents/GameButtonReload";
import GameButtonValidate from "./gameComponents/GameButtonValidate";
import GameGrid from "./gameComponents/GameGrid";
import VirtualKeyboard from "./gameComponents/VirtualKeyboard";

export default function Game() {
  const { xs, sm, md, lg, isMobile } = useViewportContext();
  const [opened, { open, close }] = useDisclosure(false);
  const { notificationModalSource, setNotificationModalSource } =
    useNotificationModalSourceContext();
  const {
    gameDifficulty: { wordLength }
  } = useGameSettingsContext();
  // Store the fixed letters configuration for each row (which index has which fixed letter)
  const [fixedLetters, setFixedLetters] = useState<FixedLetters>([]);
  // Store the actual game grid data (2D array of characters with dynamic dimensions)
  const [gameGrid, setGameGrid] = useState<LetterGrid>([]);
  // Ref used to send virtual keyboard actions to the game grid.
  const gameGridRef = useRef<GameGridRef | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [validationResults, setValidationResults] =
    useState<ValidationResults>(undefined);
  // Game grid is valid if all rows have no empty fields
  const [isValidGameGrid, setIsValidGameGrid] = useState<boolean>(false);
  // Game grid is correct if all rows have a validated and correct word
  const [isCorrectGameGrid, setIsCorrectGameGrid] = useState<boolean>(false);
  const reloadIconDisabled = isLoading || isCorrectGameGrid;
  const gameGridRowGap = xs ? 8 : sm ? 10 : md ? 12 : lg ? 14 : 16;
  const gameButtonReloadMargin = gameGridRowGap * 2;

  /**
   * Opens notification modal and sets the correct source
   * @param notificationModalSource notification source, determines the text shown in modal
   */
  const handleNotificationModalOpen = useCallback(
    (source: NotificationModalSource) => {
      setNotificationModalSource(source);
      open();
    },
    [setNotificationModalSource, open]
  );

  /**
   * Fetches fixed letters from the API and initializes the game grid.
   * @param language The language to fetch.
   */
  const fetchFixedLetters = useCallback(
    async (language: string) => {
      try {
        setIsLoading(true);
        setGameGrid([]);
        setFixedLetters([]);

        const fixedLetterResponse = await getFixedLetters(language, wordLength);
        if (!fixedLetterResponse?.fixedLetters?.length) {
          handleNotificationModalOpen(
            NotificationModalSource.GameGridFetchFailed
          );
          return;
        }

        const fixedLetterData = fixedLetterResponse.fixedLetters;
        setFixedLetters(fixedLetterData);
        setGameGrid(
          fixedLetterData.map((item) =>
            Array(wordLength)
              .fill("")
              .map((_, i) =>
                i === item.fixedIndex ? item.fixedLetter.toUpperCase() : ""
              )
          )
        );
      } catch {
        handleNotificationModalOpen(
          NotificationModalSource.GameGridFetchFailed
        );
        return;
      } finally {
        setValidationResults(undefined);
        setIsValidGameGrid(false);
        setIsCorrectGameGrid(false);
        setIsLoading(false);
      }
    },
    [wordLength, handleNotificationModalOpen]
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
    value: string
  ) => {
    // Only allow single letter strings
    if (typeof value !== "string" || value.length > 1) return;

    setGameGrid((currentGameGrid) => {
      const newGameGrid = currentGameGrid.map((row, i) =>
        i === rowIndex
          ? row.map((field, j) => (j === columnIndex ? value : field))
          : row
      );

      return newGameGrid;
    });
  };

  /**
   * Forwards a virtual letter key press to the game grid.
   * @param key The letter pressed on the virtual keyboard.
   */
  const handleOnVirtualKeyPress = (key: string) => {
    gameGridRef.current?.pressVirtualKey(key);
  };

  /**
   * Forwards a virtual backspace press to the game grid.
   */
  const handleOnVirtualBackspacePress = () => {
    gameGridRef.current?.pressVirtualBackspace();
  };

  /**
   * Validates the current game grid and the inputted words.
   */
  const handleGameGridValidation = async () => {
    try {
      if (!checkGameGridValidity(gameGrid)) {
        setIsValidGameGrid(false);
        handleNotificationModalOpen(
          NotificationModalSource.GameGridValidityCheck
        );
      } else {
        setIsLoading(true);
        const validationResultsData = await validateGameGrid(
          gameGrid,
          languageConstants.FI
        );

        if (validationResultsData === undefined) {
          handleNotificationModalOpen(
            NotificationModalSource.GameGridValidationFailed
          );
          return;
        }

        setValidationResults(validationResultsData);
        setIsValidGameGrid(true);

        const allWordsAreUnique = gameGridContainsOnlyUniqueWords(
          validationResultsData
        );
        const allWordsAreCorrect = gameGridContainsOnlyCorrectWords(
          validationResultsData
        );

        // Game grid contains duplicate words and incorrect words
        if (!allWordsAreUnique && !allWordsAreCorrect) {
          handleNotificationModalOpen(
            NotificationModalSource.DuplicateWordsAndIncorrectWords
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
    } catch {
      handleNotificationModalOpen(
        NotificationModalSource.GameGridValidationFailed
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Loads a new game grid.
   */
  const handleNewGameGridLoading = async () => {
    try {
      if (gameGridIsFilledIn(gameGrid)) {
        handleNotificationModalOpen(NotificationModalSource.UnfinishedGrid);
      } else {
        if (!reloadIconDisabled) await fetchFixedLetters(languageConstants.FI);
      }
    } catch {
      handleNotificationModalOpen(NotificationModalSource.GameGridFetchFailed);
    }
  };

  /**
   * Fetches a game grid when the component mounts.
   */
  useEffect(() => {
    const initialFetch = async () => {
      await fetchFixedLetters(languageConstants.FI);
    };
    initialFetch();
  }, [fetchFixedLetters]);

  return (
    <>
      <Stack
        gap={gameGridRowGap}
        align="center"
        styles={{ root: { position: "relative", width: "fit-content" } }}
      >
        <GameGrid
          fixedLetters={fixedLetters}
          gameGrid={gameGrid}
          wordLength={wordLength}
          validationResults={validationResults}
          handleFieldChange={handleFieldChange}
          ref={gameGridRef}
        />

        <GameButtonReload
          isLoading={isLoading}
          isCorrectGameGrid={isCorrectGameGrid}
          reloadIconDisabled={reloadIconDisabled}
          handleNewGameGridLoading={handleNewGameGridLoading}
          margin={gameButtonReloadMargin}
        />

        {isMobile && (
          <VirtualKeyboard
            onKeyPress={handleOnVirtualKeyPress}
            onBackspacePress={handleOnVirtualBackspacePress}
          />
        )}

        <GameButtonValidate
          isValidGameGrid={isValidGameGrid}
          isCorrectGameGrid={isCorrectGameGrid}
          isLoading={isLoading}
          handleGameGridValidation={handleGameGridValidation}
          fetchFixedLetters={fetchFixedLetters}
        />
      </Stack>

      <NotificationModal
        source={notificationModalSource}
        opened={opened}
        onClose={close}
        onNewGridLoad={() => fetchFixedLetters(languageConstants.FI)}
        onValidationRetry={handleGameGridValidation}
      />
    </>
  );
}
