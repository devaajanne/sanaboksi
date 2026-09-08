import { useTranslation } from "react-i18next";
import { IconReload } from "@tabler/icons-react";
import StyledActionIcon from "../../styledComponents/StyledActionIcon";
import StyledTooltip from "../../styledComponents/StyledTooltip";

interface GameButtonReloadProps {
  isLoading: boolean;
  isCorrectGameGrid: boolean;
  reloadIconDisabled: boolean;
  handleNewGameGridLoading: () => void;
}

export function GameButtonReload({
  isLoading,
  isCorrectGameGrid,
  reloadIconDisabled,
  handleNewGameGridLoading,
}: GameButtonReloadProps) {
  const { t } = useTranslation();

  return (
    <>
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
    </>
  );
}
