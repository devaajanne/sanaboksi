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
      <Text>{t("GameInstructionModal.GameDescription")}</Text>

      <Text
        styles={{
          root: {
            marginTop: stylingConstants.MODAL_TEXT_MARGIN_TOP,
            marginBottom: stylingConstants.MODAL_TEXT_MARGIN_BOTTOM,
          },
        }}
      >
        {t("GameInstructionModal.ForExampleIfGivenRowIs")}
      </Text>

      <SanaboksiGameRow
        fixedLetter={fixedLetter}
        rowIndex={0}
        rowLength={5}
        isReadOnly={true}
        rowData={["", "", "H", "", ""]}
      ></SanaboksiGameRow>

      <Text
        styles={{
          root: {
            marginTop: stylingConstants.MODAL_TEXT_MARGIN_TOP,
            marginBottom: stylingConstants.MODAL_TEXT_MARGIN_BOTTOM,
          },
        }}
      >
        {t("GameInstructionModal.FittingWordsCouldBe")}
      </Text>

      <SanaboksiGameRow
        fixedLetter={fixedLetter}
        rowIndex={0}
        rowLength={5}
        isReadOnly={true}
        rowData={["V", "E", "H", "N", "Ä"]}
      ></SanaboksiGameRow>

      <Text
        styles={{
          root: {
            marginTop: stylingConstants.MODAL_TEXT_MARGIN_TOP,
            marginBottom: stylingConstants.MODAL_TEXT_MARGIN_BOTTOM,
          },
        }}
      >
        {t("GameInstructionModal.And")}
      </Text>

      <SanaboksiGameRow
        fixedLetter={fixedLetter}
        rowIndex={0}
        rowLength={5}
        isReadOnly={true}
        rowData={["K", "A", "H", "V", "I"]}
      ></SanaboksiGameRow>

      <Text
        styles={{ root: { marginTop: stylingConstants.MODAL_TEXT_MARGIN_TOP } }}
      >
        {t(
          "GameInstructionModal.BecauseFixedLetterIsInTheCorrectPositionInBothWords",
        )}
      </Text>

      <Text
        styles={{ root: { marginTop: stylingConstants.MODAL_TEXT_MARGIN_TOP } }}
      >
        {t("GameInstructionModal.GamePlayInstructions")}
      </Text>

      <Text
        styles={{
          root: {
            marginTop: stylingConstants.MODAL_TEXT_MARGIN_TOP,
          },
        }}
      >
        {t("GameInstructionModal.YouCanLoadANewGameByClicking")}
        <IconReload
          aria-label={t("AriaLabel.LoadNewGame")}
          style={{ verticalAlign: "top" }}
        />
      </Text>

      <Text
        styles={{ root: { marginTop: stylingConstants.MODAL_TEXT_MARGIN_TOP } }}
      >
        {t("GameInstructionModal.AfterValidationInstructions")}
      </Text>

      <Text
        styles={{
          root: {
            marginTop: stylingConstants.MODAL_TEXT_MARGIN_TOP,
          },
        }}
      >
        {t(
          "GameInstructionModal.OnceYouFillInTheGridWithCorrectWordsYouCanPlayANewGame",
        )}
      </Text>
      <Text
        styles={{
          root: {
            marginTop: stylingConstants.MODAL_TEXT_MARGIN_TOP,
          },
        }}
      >
        {t("GameInstructionModal.DifficultySettings")}
        <IconSettings
          aria-label={t("AriaLabel.OpenGameSettings")}
          style={{ verticalAlign: "top" }}
        />
      </Text>

      <StyledDivider />

      <Text>{t("GameInstructionModal.BeMindfulOfTheseIconsAndColors")}:</Text>

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

      <Text>{t("GameInstructionModal.HaveFunWithSanaboksi")}</Text>

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
