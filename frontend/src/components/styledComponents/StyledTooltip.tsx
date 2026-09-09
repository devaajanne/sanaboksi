import { Tooltip } from "@mantine/core";
import useColorPalette from "../../hook/useColorPalette";
import { colors } from "../../utils/Constants";

/**
 * Props for the StyledTooltip component.
 * @property label The tooltip text.
 * @property disabled Whether the tooltip is disabled.
 * @property children The element that receives the tooltip.
 */
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
