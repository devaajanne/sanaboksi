import { ActionIcon } from "@mantine/core";
import { useColorPalette } from "../../hooks/useColorPalette";
import { useViewportContext } from "../../context/ViewportContext";
import {
  colorPaletteConstants,
  stylingConstants,
} from "../../utility/Constants";

interface StyledActionIconProps {
  ariaLabel: string;
  onClick: () => void;
  icon?: React.ComponentType<{ size: string | number; strokeWidth: number }>;
}

export default function StyledActionIcon({
  ariaLabel,
  onClick,
  icon: Icon,
}: StyledActionIconProps) {
  const colorPalette = useColorPalette();
  const { isSmViewport } = useViewportContext();
  const actionIconSize = isSmViewport
    ? stylingConstants.ACTION_ICON_SIZE_SMALL
    : stylingConstants.ACTION_ICON_SIZE_LARGE;

  return (
    <>
      <ActionIcon
        aria-label={ariaLabel}
        variant="subtle"
        size={actionIconSize}
        onClick={onClick}
        styles={{
          root: {
            backgroundColor:
              colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
            color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
          },
        }}
      >
        {Icon && (
          <Icon
            size={actionIconSize}
            strokeWidth={stylingConstants.ICON_STROKE_WIDTH}
          />
        )}
      </ActionIcon>
    </>
  );
}
