import { Tooltip } from "@mantine/core";
import { useColorPalette } from "../../hooks/useColorPalette";
import {
  colorPaletteConstants,
  stylingConstants,
} from "../../utility/Constants";

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
  const tooltipPosition = stylingConstants.TOOLTIP_POSITION;

  return (
    <>
      <Tooltip
        label={label}
        disabled={disabled}
        color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
        position={tooltipPosition}
        styles={{
          tooltip: {
            color: colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
          },
        }}
      >
        {children}
      </Tooltip>
    </>
  );
}
