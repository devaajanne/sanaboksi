import { Button, Text, type LoaderProps } from "@mantine/core";
import { useColorPalette } from "../../hooks/useColorPalette";
import { colorPaletteConstants } from "../../utils/Constants";
import { useViewportContext } from "../../context/ViewportContext";

interface StyledButtonProps {
  ariaLabel: string;
  onClick: () => void;
  buttonText: string;
  renderLocation?: string;
  size?: string;
  loading?: boolean;
  loaderProps?: LoaderProps;
}
export default function StyledButton({
  ariaLabel,
  onClick,
  buttonText,
  renderLocation,
  size,
  loading,
  loaderProps,
}: StyledButtonProps) {
  const colorPalette = useColorPalette();
  const { isSmViewport } = useViewportContext();
  const borderWidth = 2;
  const margintop = "1rem";
  const smallFontSize = "1rem";
  const largeFontSize = "2rem";
  const buttonTextFontSize =
    renderLocation === "modal"
      ? undefined
      : isSmViewport
        ? smallFontSize
        : largeFontSize;

  return (
    <Button
      aria-label={ariaLabel}
      onClick={onClick}
      color={colorPalette[colorPaletteConstants.PRIMARY_COLOR_0]}
      size={size}
      loading={loading}
      loaderProps={loaderProps}
      styles={{
        label: {
          color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
        },
        root: {
          backgroundColor: colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
          borderColor: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
          borderWidth: borderWidth,
          marginTop: margintop,
        },
      }}
    >
      <Text
        span
        styles={{
          root: {
            color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
            fontSize: buttonTextFontSize,
          },
        }}
      >
        {buttonText}
      </Text>
    </Button>
  );
}
