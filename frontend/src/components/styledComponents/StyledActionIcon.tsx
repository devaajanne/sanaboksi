import { ActionIcon } from "@mantine/core";
import { useColorPalette } from "../../hooks/useColorPalette";
import { useViewportContext } from "../../context/ViewportContext";
import { colorPaletteConstants } from "../../utility/Constants";

interface StyledActionIconProps {
  ariaLabel: string;
  onClick: () => void;
  icon?: React.ComponentType<{ size: string | number; strokeWidth: number }>;
  disabled?: boolean;
}

export default function StyledActionIcon({
  ariaLabel,
  onClick,
  icon: Icon,
  disabled,
}: StyledActionIconProps) {
  const colorPalette = useColorPalette();
  const { isSmViewport } = useViewportContext();
  const ICON_STROKE_WIDTH = 1.5;
  const ACTION_ICON_SIZE_SMALL = "2.25rem";
  const ACTION_ICON_SIZE_LARGE = "4.5rem";
  const actionIconSize = isSmViewport
    ? ACTION_ICON_SIZE_SMALL
    : ACTION_ICON_SIZE_LARGE;

  return (
    <>
      <ActionIcon
        aria-label={ariaLabel}
        variant="subtle"
        size={actionIconSize}
        onClick={onClick}
        disabled={disabled}
        styles={{
          root: {
            backgroundColor:
              colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
            color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
          },
        }}
      >
        {Icon && <Icon size={actionIconSize} strokeWidth={ICON_STROKE_WIDTH} />}
      </ActionIcon>
    </>
  );
}
