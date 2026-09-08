import { Group, Stack } from "@mantine/core";
import {
  IconCheck,
  IconX,
  IconCopy,
  IconReload,
  IconSettings,
} from "@tabler/icons-react";
import GameRow from "../game/gameComponents/GameRow";
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

/**
 * Props for the GameInstructionsModal component.
 * @property opened Whether the modal is open.
 * @property onClose Callback for closing the modal.
 */
interface GameInstructionsModalProps {
  opened: boolean;
  onClose: () => void;
}

export function GameInstructionsModal({
  opened,
  onClose,
}: GameInstructionsModalProps) {
  const { t } = useTranslation();
  const colorPalette = useColorPalette();
  const { xs, sm, md, lg } = useViewportContext();
  const iconSize = xs ? 20 : sm ? 22 : md ? 24 : lg ? 26 : 28;
  const fixedLetter: FixedLetter = { fixedIndex: 2, fixedLetter: "H" };
  const marginTop = 12;

  return (
    <StyledModal
      opened={opened}
      onClose={onClose}
      title={t("GameInstructionsModal.HowToPlaySanaboksi")}
    >
      <StyledText text={t("GameInstructionsModal.GameDescription")} />

      <StyledText text={t("GameInstructionsModal.ForExampleIfGivenRowIs")} />

      <GameRow
        fixedLetter={fixedLetter}
        rowIndex={0}
        rowLength={5}
        isReadOnly={true}
        rowData={["", "", "H", "", ""]}
      />

      <StyledText text={t("GameInstructionsModal.FittingWordsCouldBe")} />

      <GameRow
        fixedLetter={fixedLetter}
        rowIndex={0}
        rowLength={5}
        isReadOnly={true}
        rowData={["V", "E", "H", "N", "Ä"]}
      />

      <StyledText text={t("GameInstructionsModal.And")} />

      <GameRow
        fixedLetter={fixedLetter}
        rowIndex={0}
        rowLength={5}
        isReadOnly={true}
        rowData={["K", "A", "H", "V", "I"]}
      />

      <StyledText
        text={t(
          "GameInstructionsModal.BecauseFixedLetterIsInTheCorrectPositionInBothWords",
        )}
      />

      <StyledText text={t("GameInstructionsModal.GamePlayInstructions")} />

      <StyledText
        text={t("GameInstructionsModal.YouCanLoadANewGameByClicking")}
      >
        <IconReload
          aria-label={t("AriaLabel.LoadNewGame")}
          size={iconSize}
          style={{ verticalAlign: "middle" }}
        />
      </StyledText>

      <StyledText
        text={t("GameInstructionsModal.AfterValidationInstructions")}
      />

      <StyledText
        text={t(
          "GameInstructionsModal.OnceYouFillInTheGridWithCorrectWordsYouCanPlayANewGame",
        )}
      />

      <StyledText text={t("GameInstructionsModal.DifficultySettings")}>
        <IconSettings
          aria-label={t("AriaLabel.OpenGameSettings")}
          size={iconSize}
          style={{ verticalAlign: "middle" }}
        />
      </StyledText>

      <StyledDivider />

      <StyledText
        text={t("GameInstructionsModal.BeMindfulOfTheseIconsAndColors")}
      />

      <Stack>
        <StyledIconTextRow
          ariaLabel={t("AriaLabel.CorrectWordIcon")}
          icon={IconCheck}
          color={colorPalette[colors.CORRECT_GREEN_3]}
          text={t("GameInstructionsModal.TheWordIsCorrect")}
        />
        <StyledIconTextRow
          ariaLabel={t("AriaLabel.IncorrectWordIcon")}
          icon={IconX}
          color={colorPalette[colors.INCORRECT_RED_4]}
          text={t("GameInstructionsModal.TheWordIsIncorrect")}
        />
        <StyledIconTextRow
          ariaLabel={t("AriaLabel.DuplicateWordIcon")}
          icon={IconCopy}
          color={colorPalette[colors.DUPLICATE_BLUE_5]}
          text={t("GameInstructionsModal.TheWordIsADuplicate")}
        />
      </Stack>

      <StyledDivider />

      <StyledText text={t("GameInstructionsModal.HaveFunWithSanaboksi")} />

      <Group justify="flex-end">
        <StyledButton
          ariaLabel={t("Actions.BackToGame")}
          onClick={onClose}
          buttonText={t("Actions.BackToGame")}
          marginTop={marginTop}
        />
      </Group>
    </StyledModal>
  );
}
