import { Divider } from "@mantine/core";
import useColorPalette from "../../hook/useColorPalette";
import { colors } from "../../utils/Constants";

export default function StyledDivider() {
  const colorPalette = useColorPalette();
  const margin = "1rem";

  return (
    <Divider
      color={colorPalette[colors.SECONDARY_COLOR_1]}
      styles={{ root: { marginTop: margin, marginBottom: margin } }}
    />
  );
}
