import { useColorPalette } from "../../hooks/useColorPalette";
import { useTranslation } from "react-i18next";
import { colorPaletteConstants, gameConstants } from "../../utility/Constants";
import {
  Button,
  Divider,
  Group,
  Modal,
  SegmentedControl,
  Stack,
  Text,
} from "@mantine/core";
import { useGameContext } from "../../context/GameContext";
import { IconX } from "@tabler/icons-react";
import { stylingConstants } from "../../utility/Constants";
import { IconAlertCircle } from "@tabler/icons-react";

interface GameSettingsModalProps {
  opened: boolean;
  onClose: () => void;
}

export function GameSettingsModal({ opened, onClose }: GameSettingsModalProps) {
  const colorPalette = useColorPalette();
  const { t } = useTranslation();
  const { wordLength, setWordLength } = useGameContext();

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
      <Text
        styles={{
          root: {
            marginTop: stylingConstants.MODAL_TEXT_MARGIN_TOP,
            marginBottom: stylingConstants.MODAL_TEXT_MARGIN_BOTTOM,
          },
        }}
      >
        {t("GameSettingsModal.ChooseDifficulty")}
      </Text>
      <SegmentedControl
        value={String(wordLength)}
        onChange={handleChange}
        withItemsBorders={false}
        orientation="vertical"
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
      <Divider
        color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
        styles={{
          root: {
            marginTop: stylingConstants.MODAL_DIVIDER_MARGIN_TOP,
            marginBottom: stylingConstants.MODAL_DIVIDER_MARGIN_BOTTOM,
          },
        }}
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
          <IconAlertCircle
            aria-label={t("AriaLabel.AlertIcon")}
            color={colorPalette[colorPaletteConstants.SECONDARY_COLOR_1]}
            size={stylingConstants.MODAL_ICON_SIZE}
            strokeWidth={stylingConstants.ICON_STROKE_WIDTH}
          />
          <Text>
            {t(
              "GameSettingsModal.IfYouChangeDifficultyYouWillLoseYourProgress",
            )}
          </Text>
        </Group>
      </Stack>
      <Group justify="flex-end">
        <Button
          aria-label={t("Actions.Confirm")}
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
              marginTop: stylingConstants.MODAL_TEXT_MARGIN_TOP,
            },
          }}
        >
          <Text span>{t("Actions.Confirm")}</Text>
        </Button>
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
              marginTop: stylingConstants.MODAL_TEXT_MARGIN_TOP,
            },
          }}
        >
          <Text span>{t("Actions.BackToGame")}</Text>
        </Button>
      </Group>
    </Modal>
  );
}
