import { Divider } from "@mantine/core";
import { colors } from "../../utils/Constants";
import useColorPalette from "../../hook/useColorPalette";

export default function StyledDivider() {
  const colorPalette = useColorPalette();
  const margin = "1rem";

  return (
    <Divider
      color={colorPalette[colors.SECONDARY_COLOR_1]}
      styles={{
        root: {
          marginTop: margin,
          marginBottom: margin,
        },
      }}
    />
  );
}
