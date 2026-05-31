import {
  Container,
  Text,
  ActionIcon,
  useMantineColorScheme,
  Stack,
  Group,
  Tooltip,
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
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import {
  colorPaletteConstants,
  stylingConstants,
} from "../../utility/Constants";

export default function Header() {
  const colorPalette = useColorPalette();
  const { t } = useTranslation();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
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
  const isSmViewport = useMediaQuery(stylingConstants.SM_VIEWPORT_MAX_WIDTH);
  const headerTitleFontSize = isSmViewport
    ? stylingConstants.HEADER_TITLE_FONT_SIZE_SMALL
    : stylingConstants.HEADER_TITLE_FONT_SIZE_LARGE;
  const headerIconSize = isSmViewport
    ? stylingConstants.HEADER_ICON_SIZE_SMALL
    : stylingConstants.HEADER_ICON_SIZE_LARGE;
  const tooltipPosition = "bottom";

  return (
    <Container
      fluid
      styles={{
        root: {
          marginTop: stylingConstants.HEADER_MARGIN_TOP,
          marginBottom: stylingConstants.HEADER_MARGIN_BOTTOM,
        },
      }}
    >
      <Stack align="center" gap={stylingConstants.HEADER_MARGIN_BOTTOM}>
        <Text
          styles={{
            root: {
              color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
              fontSize: headerTitleFontSize,
            },
          }}
        >
          Sanaboksi
        </Text>
        <Group
          justify="space-between"
          wrap="nowrap"
          styles={{
            root: { width: "150%" },
          }}
        >
          <Tooltip
            label={t("Tooltip.GameInstructionsModalTooltip")}
            color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
            position={tooltipPosition}
            styles={{
              tooltip: {
                color: colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
              },
            }}
          >
            <ActionIcon
              aria-label={t("AriaLabel.OpenGameInstructions")}
              variant="subtle"
              size={headerIconSize}
              onClick={openGameInstructions}
              styles={{
                root: {
                  backgroundColor:
                    colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
                  color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
                },
              }}
            >
              <IconHelpCircle
                size={headerIconSize}
                strokeWidth={stylingConstants.ICON_STROKE_WIDTH}
              />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label={t("Tooltip.GameSettingsModalTooltip")}
            color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
            position={tooltipPosition}
            styles={{
              tooltip: {
                color: colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
              },
            }}
          >
            <ActionIcon
              aria-label={t("AriaLabel.OpenGameSettings")}
              variant="subtle"
              size={headerIconSize}
              onClick={openGameSettings}
              styles={{
                root: {
                  backgroundColor:
                    colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
                  color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
                },
              }}
            >
              <IconSettings
                size={headerIconSize}
                strokeWidth={stylingConstants.ICON_STROKE_WIDTH}
              />
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label={t("Tooltip.LightDarkModeToggleTooltip")}
            color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
            position={tooltipPosition}
            styles={{
              tooltip: {
                color: colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
              },
            }}
          >
            <ActionIcon
              aria-label={t("AriaLabel.ToggleLightDarkMode")}
              variant="subtle"
              size={headerIconSize}
              onClick={toggleColorScheme}
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
                  size={headerIconSize}
                  strokeWidth={stylingConstants.ICON_STROKE_WIDTH}
                />
              ) : (
                <IconSun
                  size={headerIconSize}
                  strokeWidth={stylingConstants.ICON_STROKE_WIDTH}
                />
              )}
            </ActionIcon>
          </Tooltip>
          <Tooltip
            label={t("Tooltip.GameInfoModalTooltip")}
            color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
            position={tooltipPosition}
            styles={{
              tooltip: {
                color: colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
              },
            }}
          >
            <ActionIcon
              aria-label={t("AriaLabel.ReadGameInfo")}
              variant="subtle"
              size={headerIconSize}
              onClick={openGameInfo}
              styles={{
                root: {
                  backgroundColor:
                    colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
                  color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
                },
              }}
            >
              <IconInfoCircle
                size={headerIconSize}
                strokeWidth={stylingConstants.ICON_STROKE_WIDTH}
              />
            </ActionIcon>
          </Tooltip>
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
