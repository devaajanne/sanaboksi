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
  IconInfoCircle,
} from "@tabler/icons-react";
import { useColorPalette } from "../../hooks/useColorPalette";
import { GameInstructionsModal } from "../modals/GameInstructionsModal";
import { GameSettingsModal } from "../modals/GameSettingsModal";
import { GameInfoModal } from "../modals/GameInfoModal";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import {
  colorPaletteConstants,
  stylingConstants,
} from "../../utility/Constants";

export default function Header() {
  const colorPalette = useColorPalette();
  const { t } = useTranslation();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { headerMargin, iconSize, iconGap } = {
    headerMargin: 20,
    iconSize: "clamp(20px, 6vw, 35px)",
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
  const [openedGameInfo, { open: openGameInfo, close: closeGameInfo }] =
    useDisclosure(false);

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
            <IconHelpCircle
              size={iconSize}
              strokeWidth={stylingConstants.ICON_STROKE_WIDTH}
            />
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
            <IconSettings
              size={iconSize}
              strokeWidth={stylingConstants.ICON_STROKE_WIDTH}
            />
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
            {colorScheme === stylingConstants.COLOR_SCHEME_LIGHT ? (
              <IconMoon
                size={iconSize}
                strokeWidth={stylingConstants.ICON_STROKE_WIDTH}
              />
            ) : (
              <IconSun
                size={iconSize}
                strokeWidth={stylingConstants.ICON_STROKE_WIDTH}
              />
            )}
          </ActionIcon>
          <ActionIcon
            aria-label={t("AriaLabel.ReadGameInfo")}
            variant="subtle"
            size={iconSize}
            onClick={() => openGameInfo()}
            styles={{
              root: {
                backgroundColor:
                  colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
                color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
              },
            }}
          >
            <IconInfoCircle
              size={iconSize}
              strokeWidth={stylingConstants.ICON_STROKE_WIDTH}
            />
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
      <GameInfoModal opened={openedGameInfo} onClose={closeGameInfo} />
    </Container>
  );
}
