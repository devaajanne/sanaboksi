import { Group, Stack, Text } from "@mantine/core";
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
import {
  colorPaletteConstants,
  stylingConstants,
} from "../../utility/Constants";
import StyledButton from "../styledComponents/StyledButton";
import StyledDivider from "../styledComponents/StyledDivider";
import StyledModal from "../styledComponents/StyledModal";
import StyledText from "../styledComponents/StyledText";

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
        <Group
          align="center"
          gap="sm"
          wrap="nowrap"
          styles={{
            root: { marginTop: stylingConstants.MODAL_ICON_MARGIN_TOP },
          }}
        >
          <IconCheck
            aria-label={t("AriaLabel.CorrectWordIcon")}
            color={colorPalette[colorPaletteConstants.CORRECT_GREEN_3]}
            size={stylingConstants.MODAL_ICON_SIZE}
            strokeWidth={stylingConstants.ICON_STROKE_WIDTH}
          />
          <Text>{t("GameInstructionModal.TheWordIsCorrect")}</Text>
        </Group>
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
          <IconX
            aria-label={t("AriaLabel.IncorrectWordIcon")}
            color={colorPalette[colorPaletteConstants.INCORRECT_RED_4]}
            size={stylingConstants.MODAL_ICON_SIZE}
            strokeWidth={stylingConstants.ICON_STROKE_WIDTH}
          />
          <Text>{t("GameInstructionModal.TheWordIsIncorrect")}</Text>
        </Group>
        <Group
          align="center"
          gap="sm"
          wrap="nowrap"
          styles={{
            root: {
              marginBottom: stylingConstants.MODAL_ICON_MARGIN_BOTTOM,
            },
          }}
        >
          <IconCopy
            aria-label={t("AriaLabel.DuplicateWordIcon")}
            color={colorPalette[colorPaletteConstants.DUPLICATE_BLUE_5]}
            size={stylingConstants.MODAL_ICON_SIZE}
            strokeWidth={stylingConstants.ICON_STROKE_WIDTH}
          />
          <Text>{t("GameInstructionModal.TheWordIsADuplicate")}</Text>
        </Group>
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
