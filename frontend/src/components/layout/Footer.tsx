import { Anchor, Center, Text } from "@mantine/core";
import { useColorPalette } from "../../hooks/useColorPalette";
import { colorPaletteConstants } from "../../utility/Constants";

export default function Footer() {
  const colorPalette = useColorPalette();
  const { footerMarginTop, footerMarginBotton } = {
    footerMarginTop: 20,
    footerMarginBotton: 5,
  };

  return (
    <Center
      style={{ marginTop: footerMarginTop, marginBottom: footerMarginBotton }}
    >
      <Text c={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}>
        [ Sanaboksi 2026 by{"  "}
        <Anchor
          href="https://github.com/devaajanne"
          c={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
          underline="always"
        >
          Janne Airaksinen
        </Anchor>{" "}
        ]
      </Text>
    </Center>
  );
}
