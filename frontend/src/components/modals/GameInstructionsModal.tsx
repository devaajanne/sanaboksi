import { Group, Stack } from "@mantine/core";
import { useColorPalette } from "../../hooks/useColorPalette";
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
import { colorPaletteConstants } from "../../utility/Constants";
import StyledButton from "../styledComponents/StyledButton";
import StyledDivider from "../styledComponents/StyledDivider";
import StyledModal from "../styledComponents/StyledModal";
import StyledText from "../styledComponents/StyledText";
import StyledIconTextRow from "../styledComponents/StyledIconTextRow";

interface GameInstructionsModalProps {
  opened: boolean;
  onClose: () => void;
}

export function GameInstructionsModal({
  opened,
  onClose,
}: GameInstructionsModalProps) {
  const colorPalette = useColorPalette();
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
      ></SanaboksiGameRow>

      <StyledText text={t("GameInstructionModal.FittingWordsCouldBe")} />

      <SanaboksiGameRow
        fixedLetter={fixedLetter}
        rowIndex={0}
        rowLength={5}
        isReadOnly={true}
        rowData={["V", "E", "H", "N", "Ä"]}
      ></SanaboksiGameRow>

      <StyledText text={t("GameInstructionModal.And")} />

      <SanaboksiGameRow
        fixedLetter={fixedLetter}
        rowIndex={0}
        rowLength={5}
        isReadOnly={true}
        rowData={["K", "A", "H", "V", "I"]}
      ></SanaboksiGameRow>

      <StyledText
        text={t(
          "GameInstructionModal.BecauseFixedLetterIsInTheCorrectPositionInBothWords",
        )}
      />

      <StyledText text={t("GameInstructionModal.GamePlayInstructions")} />

      <StyledText text={t("GameInstructionModal.YouCanLoadANewGameByClicking")}>
        <IconReload
          aria-label={t("AriaLabel.LoadNewGame")}
          style={{ verticalAlign: "top" }}
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
          style={{ verticalAlign: "top" }}
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
          color={colorPalette[colorPaletteConstants.CORRECT_GREEN_3]}
          text={t("GameInstructionModal.TheWordIsCorrect")}
        />
        <StyledIconTextRow
          ariaLabel={t("AriaLabel.IncorrectWordIcon")}
          icon={IconX}
          color={colorPalette[colorPaletteConstants.INCORRECT_RED_4]}
          text={t("GameInstructionModal.TheWordIsIncorrect")}
        />
        <StyledIconTextRow
          ariaLabel={t("AriaLabel.DuplicateWordIcon")}
          icon={IconCopy}
          color={colorPalette[colorPaletteConstants.DUPLICATE_BLUE_5]}
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
          renderLocation="modal"
        />
      </Group>
    </StyledModal>
  );
}
