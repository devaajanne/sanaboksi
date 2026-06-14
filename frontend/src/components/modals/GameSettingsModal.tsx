import { useColorPalette } from "../../hooks/useColorPalette";
import { useTranslation } from "react-i18next";
import { colorPaletteConstants, gameConstants } from "../../utility/Constants";
import { Group, SegmentedControl, Text } from "@mantine/core";
import { useGameContext } from "../../context/GameContext";
import StyledButton from "../styledComponents/StyledButton";
import StyledModal from "../styledComponents/StyledModal";
import StyledText from "../styledComponents/StyledText";

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
    <StyledModal
      opened={opened}
      onClose={onClose}
      title={t("GameSettingsModal.Settings")}
    >
      <StyledText text={t("GameSettingsModal.ChooseDifficulty")} />

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
