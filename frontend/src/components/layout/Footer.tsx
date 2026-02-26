import { Center, Text } from "@mantine/core";
import { useContext } from "react";
import { ColorPaletteContext } from "../context/ColorPaletteContext";

export default function Footer() {
  const colorPalette = useContext(ColorPaletteContext);
  const { footerMargin } = {
    footerMargin: 20,
  };

  return (
    <Center style={{ marginTop: footerMargin }}>
      <Text c={colorPalette[2]}>Sanaboksi</Text>
    </Center>
  );
}
