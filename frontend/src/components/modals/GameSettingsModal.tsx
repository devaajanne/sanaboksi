import { useState } from "react";
import { useTranslation } from "react-i18next";
import { colors, gameConstants } from "../../utils/Constants";
import { Group, Space, Text } from "@mantine/core";
import { useGameSettingsContext } from "../../context/gameSettingsContext/GameSettingsContext";
import StyledButton from "../styledComponents/StyledButton";
import StyledModal from "../styledComponents/StyledModal";
import StyledText from "../styledComponents/StyledText";
import StyledSegmentedControl from "../styledComponents/StyledSegmentedControl";
import StyledIconTextRow from "../styledComponents/StyledIconTextRow";
import { IconAlertCircle } from "@tabler/icons-react";
import useColorPalette from "../../hook/useColorPalette";

/**
 * Props for the GameSettingsModal component.
 * @property opened Whether the modal is open.
 * @property onClose Callback for closing the modal.
 */
interface GameSettingsModalProps {
  opened: boolean;
  onClose: () => void;
}

export function GameSettingsModal({ opened, onClose }: GameSettingsModalProps) {
  const { t } = useTranslation();
  const colorPalette = useColorPalette();
  const {
    gameDifficulty: { wordLength, setWordLength },
  } = useGameSettingsContext();
  const [tempWordLength, setTempWordLength] = useState<number>(wordLength);
  const isSettingsChanged = tempWordLength !== wordLength;
  const marginTop = 12;

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
      setTempWordLength(numValue);
    }
  };

  const handleSave = () => {
    setWordLength(tempWordLength);
    onClose();
  };

  const handleClose = () => {
    setTempWordLength(wordLength);
    onClose();
  };

  return (
    <StyledModal
      opened={opened}
      onClose={handleClose}
      title={t("GameSettingsModal.Settings")}
    >
      <StyledText text={t("GameSettingsModal.ChooseDifficulty")} />

      <StyledSegmentedControl
        ariaLabel={t("GameSettingsModal.ChooseDifficulty")}
        value={String(tempWordLength)}
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

      <Space h="xl" />

      {isSettingsChanged && (
        <StyledIconTextRow
          ariaLabel={t("AriaLabel.AlertIcon")}
          icon={IconAlertCircle}
          color={colorPalette[colors.SECONDARY_COLOR_1]}
          text={t(
            "GameSettingsModal.SavingLoadsANewGameGridAndYouLoseYourProgessInThisGameGrid",
          )}
        />
      )}

      <Group justify="flex-end">
        {isSettingsChanged && (
          <StyledButton
            ariaLabel={t("Actions.Save")}
            onClick={handleSave}
            buttonText={t("Actions.Save")}
            marginTop={marginTop}
          />
        )}
        <StyledButton
          ariaLabel={t("Actions.BackToGame")}
          onClick={handleClose}
          buttonText={t("Actions.BackToGame")}
          marginTop={marginTop}
        />
      </Group>
    </StyledModal>
  );
}
