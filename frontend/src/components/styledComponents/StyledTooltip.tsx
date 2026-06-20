import { Tooltip, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { colors } from "../../utils/Constants";

interface StyledTooltipProps {
  label: string;
  disabled?: boolean;
  children: React.ReactNode;
}

export default function StyledTooltip({
  label,
  disabled,
  children,
}: StyledTooltipProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const colorPalette =
    colorScheme === "light" ? theme.colors.light : theme.colors.dark;
  const position = "bottom";

  return (
    <Tooltip
      label={label}
      disabled={disabled}
      color={colorPalette[colors.SECONDARY_COLOR_1]}
      position={position}
      styles={{
        tooltip: {
          color: colorPalette[colors.PRIMARY_COLOR_0],
        },
      }}
    >
      {children}
    </Tooltip>
  );
}
