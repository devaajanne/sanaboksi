import {
  Container,
  Text,
  useMantineColorScheme,
  Stack,
  Group,
  useMantineTheme,
} from "@mantine/core";
import {
  IconSun,
  IconMoon,
  IconSettings,
  IconHelpCircle,
  IconInfoCircle,
} from "@tabler/icons-react";
import { GameInstructionsModal } from "../components/modals/GameInstructionsModal";
import { GameSettingsModal } from "../components/modals/GameSettingsModal";
import { GameInfoModal } from "../components/modals/GameInfoModal";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { colors } from "../utils/Constants";
import { useViewportContext } from "../context/ViewportContext";
import StyledActionIcon from "../components/styledComponents/StyledActionIcon";
import StyledTooltip from "../components/styledComponents/StyledTooltip";

export default function Header() {
  const theme = useMantineTheme();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const colorPalette =
    colorScheme === "light" ? theme.colors.light : theme.colors.dark;
  const { xs, sm, md, l } = useViewportContext();
  const titleFontSize = xs ? 36 : sm ? 45 : md ? 54 : l ? 73 : 72;
  const { t } = useTranslation();
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
              color: colorPalette[colors.SECONDARY_COLOR_1],
              fontSize: titleFontSize,
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
              colorScheme === "light"
                ? t("Tooltip.ToggleDarkModeTooltip")
                : t("Tooltip.ToggleLightModeTooltip")
            }
          >
            <StyledActionIcon
              ariaLabel={
                colorScheme === "light"
                  ? t("AriaLabel.ToggleDarkMode")
                  : t("AriaLabel.ToggleLightMode")
              }
              onClick={toggleColorScheme}
              icon={colorScheme === "light" ? IconMoon : IconSun}
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
