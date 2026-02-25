import {
  Group,
  Box,
  Title,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSunMoon } from "@tabler/icons-react";
import { useContext } from "react";
import { ColorPaletteContext } from "../context/ColorPaletteContext";

export default function Header() {
  const colorPalette = useContext(ColorPaletteContext);
  const { toggleColorScheme } = useMantineColorScheme();
  const { iconSize, iconStrokeWidth } = {
    iconSize: 40,
    iconStrokeWidth: 2,
  };

  return (
    <Group justify="space-between" align="center" w="100%">
      <Box />
      <Title c={colorPalette[2]}>Sanaboksi</Title>
      <ActionIcon
        variant="subtle"
        size={iconSize}
        onClick={() => toggleColorScheme()}
        styles={{
          root: {
            backgroundColor: colorPalette[0],
            color: colorPalette[2],
          },
        }}
      >
        <IconSunMoon size={iconSize} strokeWidth={iconStrokeWidth} />
      </ActionIcon>
    </Group>
  );
}
