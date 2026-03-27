import { Button, Divider, Group, Modal, Stack, Text } from "@mantine/core";
import { useColorPalette } from "../../hooks/useColorPalette";
import { IconCheck, IconX, IconCopy } from "@tabler/icons-react";
import SanaboksiGameRow from "../game/SanaboksiGameRow";
import type { FixedLetter } from "../../types/Types";
import { useTranslation } from "react-i18next";
import { colorPaletteConstants } from "../../utility/Constants";

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
  const {
    iconSize,
    iconStrokeWidth,
    textMarginTop,
    textMarginBottom,
    iconMarginTop,
    iconMarginBottom,
  } = {
    iconSize: 30,
    iconStrokeWidth: 2,
    textMarginTop: 10,
    textMarginBottom: 10,
    iconMarginTop: 5,
    iconMarginBottom: 15,
  };
  const fixedLetter: FixedLetter = { fixedIndex: 2, fixedLetter: "H" };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      title={t("GameInstructionModal.HowToPlaySanaboksi")}
      withCloseButton={false}
      styles={{
        header: {
          backgroundColor: colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
          color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
        },
        body: {
          backgroundColor: colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
          color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
        },
        title: { fontSize: 24 },
      }}
    >
      <Text styles={{ root: { marginTop: textMarginTop } }}>
        {t("GameInstructionModal.GameDescription")}
      </Text>

      <Text
        styles={{
          root: { marginTop: textMarginTop, marginBottom: textMarginBottom },
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
          root: { marginTop: textMarginTop, marginBottom: textMarginBottom },
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
          root: { marginTop: textMarginTop, marginBottom: textMarginBottom },
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

      <Text styles={{ root: { marginTop: textMarginTop } }}>
        {t(
          "GameInstructionModal.BecauseFixedLetterIsInTheCorrectPositionInBothWords",
        )}
      </Text>

      <Text styles={{ root: { marginTop: textMarginTop } }}>
        {t("GameInstructionModal.GamePlayInstructions")}
      </Text>

      <Text styles={{ root: { marginTop: textMarginTop } }}>
        {t("GameInstructionModal.AfterValidationInstructions")}
      </Text>

      <Text
        styles={{
          root: { marginTop: textMarginTop, marginBottom: textMarginBottom },
        }}
      >
        {t(
          "GameInstructionModal.OnceYouFillInTheGridWithCorrectWordsYouCanPlayANewGame",
        )}
      </Text>

      <Divider color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]} />

      <Text styles={{ root: { marginTop: textMarginTop } }}>
        {t("GameInstructionModal.BeMindfulOfTheseIconsAndColors")}:
      </Text>

      <Stack>
        <Group
          align="center"
          gap="sm"
          styles={{ root: { marginTop: iconMarginTop } }}
        >
          <IconCheck
            aria-label={t("AriaLabel.CorrectWordIcon")}
            color={colorPalette[colorPaletteConstants.CORRECT_GREEN_3]}
            size={iconSize}
            strokeWidth={2}
          />
          <Text>{t("GameInstructionModal.TheWordIsCorrect")}</Text>
        </Group>
        <Group
          align="center"
          gap="sm"
          styles={{ root: { marginTop: iconMarginTop } }}
        >
          <IconX
            aria-label={t("AriaLabel.IncorrectWordIcon")}
            color={colorPalette[colorPaletteConstants.INCORRECT_RED_4]}
            size={iconSize}
            strokeWidth={iconStrokeWidth}
          />
          <Text>{t("GameInstructionModal.TheWordIsIncorrect")}</Text>
        </Group>
        <Group
          align="center"
          gap="sm"
          styles={{
            root: { marginTop: iconMarginTop, marginBottom: iconMarginBottom },
          }}
        >
          <IconCopy
            aria-label={t("AriaLabel.DuplicateWordIcon")}
            color={colorPalette[colorPaletteConstants.DUPLICATE_BLUE_5]}
            size={iconSize}
            strokeWidth={iconStrokeWidth}
          />
          <Text>{t("GameInstructionModal.TheWordIsADuplicate")}</Text>
        </Group>
      </Stack>
      <Divider color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]} />
      <Text styles={{ root: { marginTop: textMarginTop + 5 } }}>
        {t("GameInstructionModal.HaveFunWithSanaboksi")}
      </Text>
      <Group style={{ width: "100%", justifyContent: "flex-end" }}>
        <Button
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
              borderWidth: 3,
            },
          }}
        >
          {t("Actions.Close")}
        </Button>
      </Group>
    </Modal>
  );
}
