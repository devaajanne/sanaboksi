import { useTranslation } from "react-i18next";
import useColorPalette from "../../../hook/useColorPalette";
import StyledButton from "../../styledComponents/StyledButton";
import { colors, languageConstants } from "../../../utils/Constants";

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
