import { ActionIcon } from "@mantine/core";
import { useViewportContext } from "../../context/viewportContext/ViewportContext";
import useColorPalette from "../../hook/useColorPalette";
import { colors } from "../../utils/Constants";

/**
 * Props for the StyledActionIcon component.
 * @property ariaLabel The accessible label for the action icon.
 * @property onClick Callback invoked when the icon is clicked.
 * @property icon Optional icon component to render.
 * @property disabled Whether the action icon is disabled.
 * @property margin Optional margin applied to the action icon.
 */
interface StyledActionIconProps {
  ariaLabel: string;
  onClick: () => void;
  icon: React.ComponentType<{ size: string | number; strokeWidth: number }>;
  disabled?: boolean;
  margin?: number;
}

export default function StyledActionIcon({
  ariaLabel,
  onClick,
  icon: Icon,
  disabled,
  margin,
}: StyledActionIconProps) {
  const colorPalette = useColorPalette();
  const { xs, sm, md, lg } = useViewportContext();
  const iconSize = xs ? 32 : sm ? 48 : md ? 64 : lg ? 80 : 96;
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
          margin: margin,
        },
      }}
    >
      {Icon && <Icon size={iconSize} strokeWidth={strokeWidth} />}
    </ActionIcon>
  );
}
