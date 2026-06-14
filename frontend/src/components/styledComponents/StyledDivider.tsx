import { Divider } from "@mantine/core";
import { useColorPalette } from "../../hooks/useColorPalette";
import { colorPaletteConstants } from "../../utility/Constants";

export default function StyledDivider() {
  const colorPalette = useColorPalette();
  const DIVIDER_MARGIN_TOP = "1rem";
  const DIVIDER_MARGIN_BOTTOM = "1rem";

  return (
    <>
      <Divider
        color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
        styles={{
          root: {
            marginTop: DIVIDER_MARGIN_TOP,
            marginBottom: DIVIDER_MARGIN_BOTTOM,
          },
        }}
      />
    </>
  );
}
