import { useTranslation } from "react-i18next";
import { useColorPalette } from "../../hooks/useColorPalette";
import {
  colorPaletteConstants,
  stylingConstants,
} from "../../utility/Constants";
import {
  IconBook2,
  IconBrandGithub,
  IconHelpCircle,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import { Anchor, Group, Text } from "@mantine/core";
import StyledButton from "../styledComponents/StyledButton";
import StyledDivider from "../styledComponents/StyledDivider";
import StyledModal from "../styledComponents/StyledModal";

interface GameInfoModalProps {
  opened: boolean;
  onClose: () => void;
}

export function GameInfoModal({ opened, onClose }: GameInfoModalProps) {
  const colorPalette = useColorPalette();
  const { t } = useTranslation();

  return (
    <StyledModal
      opened={opened}
      onClose={onClose}
      title={t("GameInfoModal.WhatSanaboksi")}
    >
      <Text>{t("GameInfoModal.InfoAboutSanaboksi")}</Text>

      <Text
        styles={{
          root: {
            marginTop: stylingConstants.MODAL_TEXT_MARGIN_TOP,
          },
        }}
      >
        {t("GameInfoModal.GamePitch")}
      </Text>

      <Text
        styles={{
          root: {
            marginTop: stylingConstants.MODAL_TEXT_MARGIN_TOP,
          },
        }}
      >
        {t("GameInfoModal.YouCanReadGameInstructionsByClicking")}
        <IconHelpCircle
          aria-label={t("AriaLabel.OpenGameInstructions")}
          style={{ verticalAlign: "top" }}
        />
      </Text>

      <Text
        styles={{
          root: {
            marginTop: stylingConstants.MODAL_TEXT_MARGIN_TOP,
          },
        }}
      >
        {t("GameInfoModal.YouCanSwitchBetweenLightAndDarkModeByClicking")}
        <IconSun
          aria-label={t("AriaLabel.ToggleDarkMode")}
          style={{ verticalAlign: "top" }}
        />
        {t("GameInfoModal.And")}{" "}
        <IconMoon
          aria-label={t("AriaLabel.ToggleLightMode")}
          style={{ verticalAlign: "top" }}
        />
      </Text>

      <StyledDivider />

      <Text>{t("GameInfoModal.InfoAboutThesis")}</Text>

      <Group
        align="center"
        gap="sm"
        wrap="nowrap"
        styles={{
          root: {
            marginTop: stylingConstants.MODAL_ICON_MARGIN_TOP,
            marginBottom: stylingConstants.MODAL_ICON_MARGIN_BOTTOM,
          },
        }}
      >
        <IconBook2
          aria-hidden
          color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
          size={stylingConstants.MODAL_ICON_SIZE}
          strokeWidth={stylingConstants.ICON_STROKE_WIDTH}
        />
        <Anchor
          href="https://www.theseus.fi/handle/10024/920463"
          c={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
          underline="always"
        >
          {t("GameInfoModal.ReadThesisInTheseus")}
        </Anchor>
      </Group>

      <Text>
        Sanaboksin on luonut{" "}
        <Anchor
          href="https://github.com/devaajanne"
          c={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
          underline="always"
        >
          Janne Airaksinen
        </Anchor>{" "}
        (2026), ja se on lisensoitu{" "}
        <Anchor
          href="https://github.com/devaajanne/sanaboksi?tab=MIT-1-ov-file"
          c={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
          underline="always"
        >
          MIT-lisenssillä
        </Anchor>
        .
      </Text>

      <Group
        align="center"
        gap="sm"
        wrap="nowrap"
        styles={{
          root: {
            marginTop: stylingConstants.MODAL_ICON_MARGIN_TOP,
          },
        }}
      >
        <IconBrandGithub
          aria-hidden
          color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
          size={stylingConstants.MODAL_ICON_SIZE}
          strokeWidth={stylingConstants.ICON_STROKE_WIDTH}
        />
        <Anchor
          href="https://github.com/devaajanne/sanaboksi"
          c={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
          underline="always"
        >
          {t("GameInfoModal.SeeSourceCodeInGitHub")}
        </Anchor>
      </Group>

      <StyledDivider />

      <Text>{t("GameInfoModal.HaveFunWithSanaboksi")}</Text>

      <Group justify="flex-end">
        <StyledButton
          ariaLabel={t("Actions.BackToGame")}
          onClick={onClose}
          buttonText={t("Actions.BackToGame")}
        />
      </Group>
    </StyledModal>
  );
}
