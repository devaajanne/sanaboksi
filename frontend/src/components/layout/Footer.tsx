import { Center, Text } from "@mantine/core";
import { useColorPalette } from "../../hooks/useColorPalette";

export default function Footer() {
  const colorPalette = useColorPalette();
  const { footerMargin } = {
    footerMargin: 20,
  };

  return (
    <Center style={{ marginTop: footerMargin }}>
      <Text c={colorPalette[2]}>Sanaboksi</Text>
    </Center>
  );
}
