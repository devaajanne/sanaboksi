import { Divider } from "@mantine/core";
import { useColorPalette } from "../../hooks/useColorPalette";
import { colorPaletteConstants } from "../../utility/Constants";

export default function StyledDivider() {
  const colorPalette = useColorPalette();
  const margin = "1rem";

  return (
    <>
      <Divider
        color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
        styles={{
          root: {
            marginTop: margin,
            marginBottom: margin,
          },
        }}
      />
    </>
  );
}
