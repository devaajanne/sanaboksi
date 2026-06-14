import { Divider } from "@mantine/core";
import { useColorPalette } from "../../hooks/useColorPalette";

import {
  colorPaletteConstants,
  stylingConstants,
} from "../../utility/Constants";

export default function StyledDivider() {
  const colorPalette = useColorPalette();

  return (
    <>
      <Divider
        color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
        styles={{
          root: {
            marginTop: stylingConstants.MODAL_DIVIDER_MARGIN_TOP,
            marginBottom: stylingConstants.MODAL_DIVIDER_MARGIN_BOTTOM,
          },
        }}
      />
    </>
  );
}
