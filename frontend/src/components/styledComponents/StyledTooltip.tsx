import { Tooltip } from "@mantine/core";
import { colors } from "../../utils/Constants";
import useColorPalette from "../../hook/useColorPalette";

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
  const colorPalette = useColorPalette();
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
