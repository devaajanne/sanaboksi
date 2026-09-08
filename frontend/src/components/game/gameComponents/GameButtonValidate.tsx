import { useTranslation } from "react-i18next";
import useColorPalette from "../../../hook/useColorPalette";
import StyledButton from "../../styledComponents/StyledButton";
import { colors, languageConstants } from "../../../utils/Constants";

/**
 * Props for the GameButton component.
 * @property isValidGameGrid Whether the game grid is completely filled in.
 * @property isCorrectGameGrid Whether all words in the game grid are correct.
 * @property isLoading Whether a game grid operation is in progress.
 * @property handleGameGridValidation Callback for validating the current game grid.
 * @property fetchFixedLetters Callback for loading fixed letters for the selected language.
 */
interface GameButtonProps {
  isValidGameGrid: boolean;
  isCorrectGameGrid: boolean;
  isLoading: boolean;
  handleGameGridValidation: () => void;
  fetchFixedLetters: (language: string) => void;
}

export default function GameButton({
  isValidGameGrid,
  isCorrectGameGrid,
  isLoading,
  handleGameGridValidation,
  fetchFixedLetters,
}: GameButtonProps) {
  const { t } = useTranslation();
  const colorPalette = useColorPalette();

  return (
    <>
      {isValidGameGrid && isCorrectGameGrid ? (
        <StyledButton
          ariaLabel={t("GameGridButton.NewGame")}
          onClick={() => fetchFixedLetters(languageConstants.FI)}
          fullWidth
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
          fullWidth
          onClick={handleGameGridValidation}
          buttonText={t("GameGridButton.ValidateWords")}
          loading={isLoading}
          loaderProps={{
            type: "dots",
            color: colorPalette[colors.SECONDARY_COLOR_1],
          }}
        />
      )}
    </>
  );
}
