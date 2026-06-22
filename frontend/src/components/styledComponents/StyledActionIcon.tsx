import { ActionIcon } from "@mantine/core";
import { useViewportContext } from "../../context/ViewportContext";
import { colors } from "../../utils/Constants";
import useColorPalette from "../../hook/useColorPalette";

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
  const { xs, sm, md, l } = useViewportContext();
  const iconSize = xs ? 32 : sm ? 48 : md ? 64 : l ? 80 : 96;
  const strokeWidth = 1.25;

  return (
    <ActionIcon
      aria-label={ariaLabel}
      variant="subtle"
      size={iconSize}
      onClick={onClick}
      disabled={disabled}
      styles={{
        root: {
          backgroundColor: colorPalette[colors.PRIMARY_COLOR_0],
          color: disabled
            ? colorPalette[colors.TERTIARY_COLOR_2]
            : colorPalette[colors.SECONDARY_COLOR_1],
        },
      }}
    >
      {Icon && <Icon size={iconSize} strokeWidth={strokeWidth} />}
    </ActionIcon>
  );
}
