import {
  Group,
  Box,
  Title,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSunMoon } from "@tabler/icons-react";

export default function Header() {
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Group justify="space-between" align="center" w="100%">
      <Box />
      <Title>Sanaboksi</Title>
      <ActionIcon
        variant="subtle"
        color={colorScheme === "dark" ? "white" : "black"}
        onClick={() => toggleColorScheme()}
      >
        <IconSunMoon />
      </ActionIcon>
    </Group>
  );
}
