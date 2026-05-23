import {
  Grid,
  Container,
  Title,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSunMoon, IconInfoCircle, IconSettings } from "@tabler/icons-react";
import { useColorPalette } from "../../hooks/useColorPalette";
import { GameInstructionsModal } from "../modals/GameInstructionsModal";
import { GameSettingsModal } from "../modals/GameSettingsModal";
import { useDisclosure } from "@mantine/hooks";
import { useTranslation } from "react-i18next";
import { colorPaletteConstants } from "../../utility/Constants";

export default function Header() {
  const colorPalette = useColorPalette();
  const { t } = useTranslation();
  const { toggleColorScheme } = useMantineColorScheme();
  const { headerMargin, headerGutter, iconSize, iconStrokeWidth, iconGap } = {
    headerMargin: 20,
    headerGutter: "clamp(20px, 12vw, 200px)",
    iconSize: "clamp(20px, 6vw, 35px)",
    iconStrokeWidth: 2,
    iconGap: 12,
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
      <Grid align="center" gutter={headerGutter}>
        <Grid.Col
          span={4}
          style={{ display: "flex", justifyContent: "center", gap: iconGap }}
        >
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
            <IconInfoCircle size={iconSize} strokeWidth={iconStrokeWidth} />
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
        </Grid.Col>
        <Grid.Col
          span={4}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Title c={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}>
            Sanaboksi
          </Title>
        </Grid.Col>
        <Grid.Col
          span={4}
          style={{ display: "flex", justifyContent: "center", gap: iconGap }}
        >
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
            <IconSunMoon size={iconSize} strokeWidth={iconStrokeWidth} />
          </ActionIcon>
        </Grid.Col>
      </Grid>
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
