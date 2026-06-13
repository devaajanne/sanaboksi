import { Button, Text } from "@mantine/core";
import { useColorPalette } from "../../hooks/useColorPalette";

import {
  colorPaletteConstants,
  stylingConstants,
} from "../../utility/Constants";

interface StyledButtonProps {
  ariaLabel: string;
  onClick: () => void;
  buttonText: string;
}
export default function StyledButton({
  ariaLabel,
  onClick,
  buttonText,
}: StyledButtonProps) {
  const colorPalette = useColorPalette();

  return (
    <>
      <Button
        aria-label={ariaLabel}
        onClick={onClick}
        color={colorPalette[colorPaletteConstants.PRIMARY_COLOR_0]}
        styles={{
          label: {
            color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
          },
          root: {
            backgroundColor:
              colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
            borderColor: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
            borderWidth: stylingConstants.BORDER_WIDTH,
            marginTop: stylingConstants.MODAL_TEXT_MARGIN_TOP,
          },
        }}
      >
        <Text span>{buttonText}</Text>
      </Button>
    </>
  );
}
