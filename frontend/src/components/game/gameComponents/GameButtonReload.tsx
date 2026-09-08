import { useTranslation } from "react-i18next";
import { IconReload } from "@tabler/icons-react";
import StyledActionIcon from "../../styledComponents/StyledActionIcon";
import StyledTooltip from "../../styledComponents/StyledTooltip";

/**
 * Props for the GameButtonReload component.
 * @property isLoading Whether a game grid operation is in progress.
 * @property isCorrectGameGrid Whether all words in the game grid are correct.
 * @property reloadIconDisabled Whether the reload action is disabled.
 * @property handleNewGameGridLoading Callback for loading a new game grid.
 * @property margin The top margin for the reload action icon.
 */
interface GameButtonReloadProps {
  isLoading: boolean;
  isCorrectGameGrid: boolean;
  reloadIconDisabled: boolean;
  handleNewGameGridLoading: () => void;
  margin: number;
}

export function GameButtonReload({
  isLoading,
  isCorrectGameGrid,
  reloadIconDisabled,
  handleNewGameGridLoading,
  margin,
}: GameButtonReloadProps) {
  const { t } = useTranslation();

  return (
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
        margin={margin}
      />
    </StyledTooltip>
  );
}
