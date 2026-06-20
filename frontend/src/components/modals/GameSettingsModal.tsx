import { useTranslation } from "react-i18next";
import { colors, gameConstants } from "../../utils/Constants";
import {
  Group,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useGameContext } from "../../context/GameContext";
import StyledButton from "../styledComponents/StyledButton";
import StyledModal from "../styledComponents/StyledModal";
import StyledText from "../styledComponents/StyledText";
import StyledSegmentedControl from "../styledComponents/StyledSegmentedControl";
import StyledIconTextRow from "../styledComponents/StyledIconTextRow";
import { IconAlertCircle } from "@tabler/icons-react";

interface GameSettingsModalProps {
  opened: boolean;
  onClose: () => void;
}

export function GameSettingsModal({ opened, onClose }: GameSettingsModalProps) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const colorPalette =
    colorScheme === "light" ? theme.colors.light : theme.colors.dark;
  const { t } = useTranslation();
  const { wordLength, setWordLength } = useGameContext();

  const handleDifficultyChange = (value: string) => {
    const numValue = Number(value);
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
      <StyledIconTextRow
        ariaLabel={t("AriaLabe.AlertIcon")}
        icon={IconAlertCircle}
        color={colorPalette[colors.SECONDARY_COLOR_1]}
        text={t(
          "GameSettingsModal.IfYouChangeDifficultyYouWillLoseYourProgress",
        )}
      />

      <StyledText text={t("GameSettingsModal.ChooseDifficulty")} />

      <StyledSegmentedControl
        ariaLabel={t("GameSettingsModal.ChooseDifficulty")}
        value={String(wordLength)}
        onChange={handleDifficultyChange}
        data={[
          {
            label: <Text>{t("GameSettingsModal.FourLetters")}</Text>,
            value: String(gameConstants.WORD_LENGTH_4),
          },
          {
            label: <Text>{t("GameSettingsModal.FiveLetters")}</Text>,
            value: String(gameConstants.WORD_LENGTH_5),
          },
          {
            label: <Text>{t("GameSettingsModal.SixLetters")}</Text>,
            value: String(gameConstants.WORD_LENGTH_6),
          },
          {
            label: <Text>{t("GameSettingsModal.SevenLetters")}</Text>,
            value: String(gameConstants.WORD_LENGTH_7),
          },
        ]}
        orientation="vertical"
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
