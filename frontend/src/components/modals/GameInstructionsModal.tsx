import { Group, Stack } from "@mantine/core";
import {
  IconCheck,
  IconX,
  IconCopy,
  IconReload,
  IconSettings,
} from "@tabler/icons-react";
import SanaboksiGameRow from "../game/SanaboksiGameRow";
import type { FixedLetter } from "../../types/Types";
import { useTranslation } from "react-i18next";
import { colors } from "../../utils/Constants";
import StyledButton from "../styledComponents/StyledButton";
import StyledDivider from "../styledComponents/StyledDivider";
import StyledModal from "../styledComponents/StyledModal";
import StyledText from "../styledComponents/StyledText";
import StyledIconTextRow from "../styledComponents/StyledIconTextRow";
import { useViewportContext } from "../../context/viewportContext/ViewportContext";
import useColorPalette from "../../hook/useColorPalette";

interface GameInstructionsModalProps {
  opened: boolean;
  onClose: () => void;
}

export function GameInstructionsModal({
  opened,
  onClose,
}: GameInstructionsModalProps) {
  const colorPalette = useColorPalette();
  const { xs, sm, md, l } = useViewportContext();
  const iconSize = xs ? 20 : sm ? 22 : md ? 24 : l ? 26 : 28;
  const { t } = useTranslation();
  const fixedLetter: FixedLetter = { fixedIndex: 2, fixedLetter: "H" };

  return (
    <StyledModal
      opened={opened}
      onClose={onClose}
      title={t("GameInstructionModal.HowToPlaySanaboksi")}
    >
      <StyledText text={t("GameInstructionModal.GameDescription")} />

      <StyledText text={t("GameInstructionModal.ForExampleIfGivenRowIs")} />

      <SanaboksiGameRow
        fixedLetter={fixedLetter}
        rowIndex={0}
        rowLength={5}
        isReadOnly={true}
        rowData={["", "", "H", "", ""]}
      />

      <StyledText text={t("GameInstructionModal.FittingWordsCouldBe")} />

      <SanaboksiGameRow
        fixedLetter={fixedLetter}
        rowIndex={0}
        rowLength={5}
        isReadOnly={true}
        rowData={["V", "E", "H", "N", "Ä"]}
      />

      <StyledText text={t("GameInstructionModal.And")} />

      <SanaboksiGameRow
        fixedLetter={fixedLetter}
        rowIndex={0}
        rowLength={5}
        isReadOnly={true}
        rowData={["K", "A", "H", "V", "I"]}
      />

      <StyledText
        text={t(
          "GameInstructionModal.BecauseFixedLetterIsInTheCorrectPositionInBothWords",
        )}
      />

      <StyledText text={t("GameInstructionModal.GamePlayInstructions")} />

      <StyledText text={t("GameInstructionModal.YouCanLoadANewGameByClicking")}>
        <IconReload
          aria-label={t("AriaLabel.LoadNewGame")}
          size={iconSize}
          style={{ verticalAlign: "middle" }}
        />
      </StyledText>

      <StyledText
        text={t("GameInstructionModal.AfterValidationInstructions")}
      />

      <StyledText
        text={t(
          "GameInstructionModal.OnceYouFillInTheGridWithCorrectWordsYouCanPlayANewGame",
        )}
      />

      <StyledText text={t("GameInstructionModal.DifficultySettings")}>
        <IconSettings
          aria-label={t("AriaLabel.OpenGameSettings")}
          size={iconSize}
          style={{ verticalAlign: "middle" }}
        />
      </StyledText>

      <StyledDivider />

      <StyledText
        text={t("GameInstructionModal.BeMindfulOfTheseIconsAndColors")}
      />

      <Stack>
        <StyledIconTextRow
          ariaLabel={t("AriaLabel.CorrectWordIcon")}
          icon={IconCheck}
          color={colorPalette[colors.CORRECT_GREEN_3]}
          text={t("GameInstructionModal.TheWordIsCorrect")}
        />
        <StyledIconTextRow
          ariaLabel={t("AriaLabel.IncorrectWordIcon")}
          icon={IconX}
          color={colorPalette[colors.INCORRECT_RED_4]}
          text={t("GameInstructionModal.TheWordIsIncorrect")}
        />
        <StyledIconTextRow
          ariaLabel={t("AriaLabel.DuplicateWordIcon")}
          icon={IconCopy}
          color={colorPalette[colors.DUPLICATE_BLUE_5]}
          text={t("GameInstructionModal.TheWordIsADuplicate")}
        />
      </Stack>

      <StyledDivider />

      <StyledText text={t("GameInstructionModal.HaveFunWithSanaboksi")} />

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
