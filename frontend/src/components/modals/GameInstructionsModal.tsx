import { Button, Divider, Group, Modal, Stack, Text } from "@mantine/core";
import { useColorPalette } from "../../hooks/useColorPalette";
import { IconCheck, IconX, IconCopy } from "@tabler/icons-react";
import SanaboksiGameRow from "../game/SanaboksiGameRow";
import type { FixedLetter } from "../../types/Types";
import { useTranslation } from "react-i18next";
import {
  colorPaletteConstants,
  stylingConstants,
} from "../../utility/Constants";

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
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      title={t("GameInstructionModal.HowToPlaySanaboksi")}
      closeButtonProps={{
        "aria-label": t("Actions.Close"),
        icon: (
          <IconX
            aria-hidden
            stroke={stylingConstants.ICON_STROKE_WIDTH}
            color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
          />
        ),
      }}
      styles={{
        header: {
          backgroundColor: colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
          color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
        },
        body: {
          backgroundColor: colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
          color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
        },
        title: { fontSize: stylingConstants.MODAL_TITLE_FONT_SIZE },
      }}
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

      <Divider
        color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
        styles={{
          root: {
            marginTop: stylingConstants.MODAL_DIVIDER_MARGIN_TOP,
            marginBottom: stylingConstants.MODAL_DIVIDER_MARGIN_BOTTOM,
          },
        }}
      />

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
        <Group align="center" gap="sm" wrap="nowrap">
          <IconCopy
            aria-label={t("AriaLabel.DuplicateWordIcon")}
            color={colorPalette[colorPaletteConstants.DUPLICATE_BLUE_5]}
            size={stylingConstants.MODAL_ICON_SIZE}
            strokeWidth={stylingConstants.ICON_STROKE_WIDTH}
          />
          <Text>{t("GameInstructionModal.TheWordIsADuplicate")}</Text>
        </Group>
      </Stack>

      <Divider
        color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
        styles={{
          root: {
            marginTop: stylingConstants.MODAL_DIVIDER_MARGIN_TOP,
            marginBottom: stylingConstants.MODAL_DIVIDER_MARGIN_BOTTOM,
          },
        }}
      />

      <Text>{t("GameInstructionModal.HaveFunWithSanaboksi")}</Text>

      <Group justify="flex-end">
        <Button
          aria-label={t("Actions.BackToGame")}
          onClick={onClose}
          color={colorPalette[colorPaletteConstants.PRIMARY_COLOR_0]}
          styles={{
            label: {
              color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
            },
            root: {
              backgroundColor:
                colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
              borderColor:
                colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
              borderWidth: stylingConstants.BORDER_WIDTH,
              marginTop: stylingConstants.MODAL_BUTTON_MARGN_TOP,
            },
          }}
        >
          <Text span>{t("Actions.BackToGame")}</Text>
        </Button>
      </Group>
    </Modal>
  );
}
