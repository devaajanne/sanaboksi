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
import { Anchor, Group } from "@mantine/core";
import StyledButton from "../styledComponents/StyledButton";
import StyledDivider from "../styledComponents/StyledDivider";
import StyledModal from "../styledComponents/StyledModal";
import StyledText from "../styledComponents/StyledText";

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
      <StyledText text={t("GameInfoModal.InfoAboutSanaboksi")} />

      <StyledText text={t("GameInfoModal.GamePitch")} />

      <StyledText
        text={t("GameInfoModal.YouCanReadGameInstructionsByClicking")}
      >
        {t("GameInfoModal.YouCanReadGameInstructionsByClicking")}
        <IconHelpCircle
          aria-label={t("AriaLabel.OpenGameInstructions")}
          style={{ verticalAlign: "top" }}
        />
      </StyledText>

      <StyledText
        text={t("GameInfoModal.YouCanSwitchBetweenLightAndDarkModeByClicking")}
      >
        <IconSun
          aria-label={t("AriaLabel.ToggleDarkMode")}
          style={{ verticalAlign: "top" }}
        />
        {t("GameInfoModal.And")}{" "}
        <IconMoon
          aria-label={t("AriaLabel.ToggleLightMode")}
          style={{ verticalAlign: "top" }}
        />
      </StyledText>

      <StyledDivider />

      <StyledText text={t("GameInfoModal.InfoAboutThesis")} />

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

      <StyledText
        text={t(
          "GameInfoModal.SanaboksiHasBeenCreatedByJanneAiraksinenAndItIsLicencedWithMITLicense",
        )}
      />

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

      <StyledText text={t("GameInfoModal.HaveFunWithSanaboksi")} />

      <Group justify="flex-end">
        <StyledButton
          ariaLabel={t("Actions.BackToGame")}
          onClick={onClose}
          buttonText={t("Actions.BackToGame")}
          renderLocation="modal"
        />
      </Group>
    </StyledModal>
  );
}
