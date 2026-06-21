import { Divider, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { colors } from "../../utils/Constants";

export default function StyledDivider() {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const colorPalette =
    colorScheme === "light" ? theme.colors.light : theme.colors.dark;
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
