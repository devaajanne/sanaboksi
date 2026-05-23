import {
  Container,
  Title,
  ActionIcon,
  useMantineColorScheme,
  Stack,
  Group,
} from "@mantine/core";
import {
  IconSun,
  IconMoon,
  IconSettings,
  IconHelpCircle,
} from "@tabler/icons-react";
import { useColorPalette } from "../../hooks/useColorPalette";
import { GameInstructionsModal } from "../modals/GameInstructionsModal";
import { GameSettingsModal } from "../modals/GameSettingsModal";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { colorPaletteConstants } from "../../utility/Constants";

export default function Header() {
  const colorPalette = useColorPalette();
  const { t } = useTranslation();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { headerMargin, iconSize, iconStrokeWidth, iconGap } = {
    headerMargin: 20,
    iconSize: "clamp(20px, 6vw, 35px)",
    iconStrokeWidth: 2,
    iconGap: 80,
  };
  const [
    openedGameInstructions,
    { open: openGameInstructions, close: closeGameInstructions },
  ] = useDisclosure(false);
  const [
    openedGameSettings,
    { open: openGameSettings, close: closeGameSettings },
  ] = useDisclosure(false);

  return (
    <Container
      fluid
      style={{ marginTop: headerMargin, marginBottom: headerMargin }}
    >
      <Stack align="center">
        <Title c={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}>
          Sanaboksi
        </Title>
        <Group gap={iconGap}>
          <ActionIcon
            aria-label={t("AriaLabel.OpenGameInstructions")}
            variant="subtle"
            size={iconSize}
            onClick={() => openGameInstructions()}
            styles={{
              root: {
                backgroundColor:
                  colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
                color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
              },
            }}
          >
            <IconHelpCircle size={iconSize} strokeWidth={iconStrokeWidth} />
          </ActionIcon>
          <ActionIcon
            aria-label={t("AriaLabel.OpenGameSettings")}
            variant="subtle"
            size={iconSize}
            onClick={() => openGameSettings()}
            styles={{
              root: {
                backgroundColor:
                  colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
                color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
              },
            }}
          >
            <IconSettings size={iconSize} strokeWidth={iconStrokeWidth} />
          </ActionIcon>
          <ActionIcon
            aria-label={t("AriaLabel.ToggleLightDarkMode")}
            variant="subtle"
            size={iconSize}
            onClick={() => toggleColorScheme()}
            styles={{
              root: {
                backgroundColor:
                  colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
                color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
              },
            }}
          >
            {colorScheme === "light" ? (
              <IconMoon size={iconSize} strokeWidth={iconStrokeWidth} />
            ) : (
              <IconSun size={iconSize} strokeWidth={iconStrokeWidth} />
            )}
          </ActionIcon>
        </Group>
      </Stack>
      <GameInstructionsModal
        opened={openedGameInstructions}
        onClose={closeGameInstructions}
      />
      <GameSettingsModal
        opened={openedGameSettings}
        onClose={closeGameSettings}
      />
    </Container>
  );
}
