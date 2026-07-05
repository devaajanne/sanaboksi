import { useTranslation } from "react-i18next";
import {
  IconBook2,
  IconBrandGithub,
  IconHelpCircle,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";
import { Group } from "@mantine/core";
import StyledButton from "../styledComponents/StyledButton";
import StyledDivider from "../styledComponents/StyledDivider";
import StyledModal from "../styledComponents/StyledModal";
import StyledText from "../styledComponents/StyledText";
import StyledIconAnchorRow from "../styledComponents/StyledIconAnchorRow";
import { useViewportContext } from "../../context/viewportContext/ViewportContext";

interface GameInfoModalProps {
  opened: boolean;
  onClose: () => void;
}

export function GameInfoModal({ opened, onClose }: GameInfoModalProps) {
  const { xs, sm, md, l } = useViewportContext();
  const iconSize = xs ? 20 : sm ? 22 : md ? 24 : l ? 26 : 28;
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
        <IconHelpCircle
          aria-label={t("AriaLabel.OpenGameInstructions")}
          size={iconSize}
          style={{ verticalAlign: "middle" }}
        />
      </StyledText>

      <StyledText
        text={t("GameInfoModal.YouCanSwitchBetweenLightAndDarkModeByClicking")}
      >
        <IconSun
          aria-label={t("AriaLabel.ToggleDarkMode")}
          size={iconSize}
          style={{ verticalAlign: "middle" }}
        />
        {t("GameInfoModal.And")}{" "}
        <IconMoon
          aria-label={t("AriaLabel.ToggleLightMode")}
          size={iconSize}
          style={{ verticalAlign: "middle" }}
        />
      </StyledText>

      <StyledDivider />

      <StyledText text={t("GameInfoModal.InfoAboutThesis")} />

      <StyledIconAnchorRow
        icon={IconBook2}
        text={t("GameInfoModal.ReadThesisInTheseus")}
        href="https://www.theseus.fi/handle/10024/920463"
      />

      <StyledText
        text={t(
          "GameInfoModal.SanaboksiHasBeenCreatedByJanneAiraksinenAndItIsLicencedWithMITLicense",
        )}
      />

      <StyledIconAnchorRow
        icon={IconBrandGithub}
        text={t("GameInfoModal.SeeSourceCodeInGitHub")}
        href="https://github.com/devaajanne/sanaboksi"
      />

      <StyledDivider />

      <StyledText text={t("GameInfoModal.HaveFunWithSanaboksi")} />

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
