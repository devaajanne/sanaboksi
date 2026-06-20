import {
  ActionIcon,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useViewportContext } from "../../context/ViewportContext";
import { colors } from "../../utils/Constants";

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
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const colorPalette =
    colorScheme === "light" ? theme.colors.light : theme.colors.dark;
  const { isSmViewport } = useViewportContext();
  const strokeWidth = 1.5;
  const actionIconSizeSmall = "2.25rem";
  const actionIconSizeLarge = "4.5rem";
  const actionIconSize = isSmViewport
    ? actionIconSizeSmall
    : actionIconSizeLarge;

  return (
    <ActionIcon
      aria-label={ariaLabel}
      variant="subtle"
      size={actionIconSize}
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
      {Icon && <Icon size={actionIconSize} strokeWidth={strokeWidth} />}
    </ActionIcon>
  );
}
