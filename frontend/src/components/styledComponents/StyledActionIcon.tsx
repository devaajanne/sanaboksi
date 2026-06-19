import { ActionIcon } from "@mantine/core";
import { useColorPalette } from "../../hooks/useColorPalette";
import { useViewportContext } from "../../context/ViewportContext";
import { colorPaletteConstants } from "../../utils/Constants";

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
  const strokeWidth = 1.5;
  const actionIconSizeSmall = "2.25rem";
  const actionIconSizeLarge = "4.5rem";
  const actionIconSize = isSmViewport
    ? actionIconSizeSmall
    : actionIconSizeLarge;

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
            color: disabled
              ? colorPalette[colorPaletteConstants.TERTIARY_COLOR_2]
              : colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
          },
        }}
      >
        {Icon && <Icon size={actionIconSize} strokeWidth={strokeWidth} />}
      </ActionIcon>
    </>
  );
}
