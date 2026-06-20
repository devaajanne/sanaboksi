import { Tooltip } from "@mantine/core";
import { useColorPalette } from "../../hooks/useColorPalette";
import { colorPaletteConstants } from "../../utils/Constants";

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
      color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
      position={position}
      styles={{
        tooltip: {
          color: colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
        },
      }}
    >
      {children}
    </Tooltip>
  );
}
