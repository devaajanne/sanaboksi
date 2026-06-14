import { Button, Text, type LoaderProps } from "@mantine/core";
import { useColorPalette } from "../../hooks/useColorPalette";
import { colorPaletteConstants } from "../../utility/Constants";
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
  const BUTTON_BORDER_WIDTH = 2;
  const BUTTON_MARGIN_TOP = "1rem";
  const BUTTON_TEXT_FONT_SIZE_SMALL = "1rem";
  const BUTTON_TEXT_FONT_SIZE_LARGE = "2rem";
  const buttonTextFontSize =
    renderLocation === "modal"
      ? undefined
      : isSmViewport
        ? BUTTON_TEXT_FONT_SIZE_SMALL
        : BUTTON_TEXT_FONT_SIZE_LARGE;

  return (
    <>
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
            backgroundColor:
              colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
            borderColor: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
            borderWidth: BUTTON_BORDER_WIDTH,
            marginTop: BUTTON_MARGIN_TOP,
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
    </>
  );
}
