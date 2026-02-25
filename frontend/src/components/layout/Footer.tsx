import { Center, Text } from "@mantine/core";
import { useContext } from "react";
import { ColorPaletteContext } from "../context/ColorPaletteContext";

export default function Footer() {
  const colorPalette = useContext(ColorPaletteContext);
  return (
    <Center>
      <Text c={colorPalette[2]}>Sanaboksi</Text>
    </Center>
  );
}
