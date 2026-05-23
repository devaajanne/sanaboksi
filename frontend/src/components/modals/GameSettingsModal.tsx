import { useColorPalette } from "../../hooks/useColorPalette";
import { useTranslation } from "react-i18next";
import { colorPaletteConstants, gameConstants } from "../../utility/Constants";
import { Button, Group, Modal, SegmentedControl, Text } from "@mantine/core";
import { useGameSettings } from "../../context/GameSettingsContext";

interface GameSettingsModalProps {
  opened: boolean;
  onClose: () => void;
}

export function GameSettingsModal({ opened, onClose }: GameSettingsModalProps) {
  const colorPalette = useColorPalette();
  const { t } = useTranslation();
  const { wordLength, setWordLength } = useGameSettings();
  const { textMarginTop, textMarginBottom } = {
    textMarginTop: 10,
    textMarginBottom: 10,
  };

  const handleChange = (val: string) => {
    const numValue = Number(val);
    if (
      !isNaN(numValue) &&
      [
        gameConstants.WORD_LENGTH_4,
        gameConstants.WORD_LENGTH_5,
        gameConstants.WORD_LENGTH_6,
        gameConstants.WORD_LENGTH_7,
      ].includes(numValue)
    ) {
      setWordLength(numValue);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      size="lg"
      title={t("GameSettingsModal.Settings")}
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
      <Text
        styles={{
          root: { marginTop: textMarginTop, marginBottom: textMarginBottom },
        }}
      >
        {t("GameSettingsModal.ChooseDifficulty")}
      </Text>
      <SegmentedControl
        value={String(wordLength)}
        onChange={handleChange}
        withItemsBorders={false}
        aria-label={t("GameSettingsModal.ChooseDifficulty")}
        data={[
          {
            label: (
              <Group justify="center">
                <Text>{t("GameSettingsModal.FourLetters")}</Text>
              </Group>
            ),
            value: String(gameConstants.WORD_LENGTH_4),
          },
          {
            label: (
              <Group justify="center">
                <Text>{t("GameSettingsModal.FiveLetters")}</Text>
              </Group>
            ),
            value: String(gameConstants.WORD_LENGTH_5),
          },
          {
            label: (
              <Group justify="center">
                <Text>{t("GameSettingsModal.SixLetters")}</Text>
              </Group>
            ),
            value: String(gameConstants.WORD_LENGTH_6),
          },
          {
            label: (
              <Group justify="center">
                <Text>{t("GameSettingsModal.SevenLetters")}</Text>
              </Group>
            ),
            value: String(gameConstants.WORD_LENGTH_7),
          },
        ]}
        fullWidth
        styles={{
          root: {
            backgroundColor:
              colorPalette[colorPaletteConstants.PRIMARY_COLOR_0],
          },
          label: {
            color: colorPalette[colorPaletteConstants.SECONDARY_COLOR_1],
          },
        }}
        color={colorPalette[colorPaletteConstants.TERTIARY_COLOR_2]}
        size={"xl"}
      />
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
              marginTop: textMarginTop,
              marginBottom: textMarginBottom,
            },
          }}
        >
          {t("Actions.Close")}
        </Button>
      </Group>
    </Modal>
  );
}
