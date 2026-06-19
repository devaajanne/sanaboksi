import {
  Container,
  Text,
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
import { useColorPalette } from "../hooks/useColorPalette";
import { GameInstructionsModal } from "../components/modals/GameInstructionsModal";
import { GameSettingsModal } from "../components/modals/GameSettingsModal";
import { GameInfoModal } from "../components/modals/GameInfoModal";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { colorPaletteConstants, stylingConstants } from "../utils/Constants";
import { useViewportContext } from "../context/ViewportContext";
import StyledActionIcon from "../components/styledComponents/StyledActionIcon";
import StyledTooltip from "../components/styledComponents/StyledTooltip";

export default function Header() {
  const colorPalette = useColorPalette();
  const { t } = useTranslation();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { isSmViewport } = useViewportContext();
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
  const headerTitleFontSizeSmall = "2rem";
  const headerTitleFontSizeLarge = "4rem";
  const headerTitleFontSize = isSmViewport
    ? headerTitleFontSizeSmall
    : headerTitleFontSizeLarge;
  const headerMarginTop = "2vh";
  const headerMarginBottom = "3vh";

  return (
    <Container
      fluid
      styles={{
        root: {
          marginTop: headerMarginTop,
          marginBottom: headerMarginBottom,
        },
      }}
    >
      <Stack align="center" gap={headerMarginBottom}>
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
          <StyledTooltip label={t("Tooltip.GameInstructionsModalTooltip")}>
            <StyledActionIcon
              ariaLabel={t("AriaLabel.OpenGameInstructions")}
              onClick={openGameInstructions}
              icon={IconHelpCircle}
            />
          </StyledTooltip>
          <StyledTooltip label={t("Tooltip.GameSettingsModalTooltip")}>
            <StyledActionIcon
              ariaLabel={t("AriaLabel.OpenGameSettings")}
              onClick={openGameSettings}
              icon={IconSettings}
            />
          </StyledTooltip>
          <StyledTooltip
            label={
              colorScheme === stylingConstants.COLOR_SCHEME_LIGHT
                ? t("Tooltip.ToggleDarkModeTooltip")
                : t("Tooltip.ToggleLightModeTooltip")
            }
          >
            <StyledActionIcon
              ariaLabel={
                colorScheme === stylingConstants.COLOR_SCHEME_LIGHT
                  ? t("AriaLabel.ToggleDarkMode")
                  : t("AriaLabel.ToggleLightMode")
              }
              onClick={toggleColorScheme}
              icon={
                colorScheme === stylingConstants.COLOR_SCHEME_LIGHT
                  ? IconMoon
                  : IconSun
              }
            />
          </StyledTooltip>
          <StyledTooltip label={t("Tooltip.GameInfoModalTooltip")}>
            <StyledActionIcon
              ariaLabel={t("AriaLabel.ReadGameInfo")}
              onClick={openGameInfo}
              icon={IconInfoCircle}
            />
          </StyledTooltip>
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
